package com.scriptsentries.service;

import com.scriptsentries.model.Comment;
import com.scriptsentries.model.RiskFlag;
import com.scriptsentries.model.Script;
import com.scriptsentries.model.enums.ClearanceStatus;
import com.scriptsentries.model.enums.RiskSeverity;
import com.scriptsentries.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Generates a sanitized Excel clearance report.
 * Rows with isRedacted=true have sensitive columns replaced with [REDACTED].
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ExcelExportService {

    private static final String REDACTED = "[REDACTED]";
    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    private final CommentRepository commentRepository;

    public byte[] generateReport(Script script, List<RiskFlag> risks) throws IOException {
        // Sort risks: HIGH → MEDIUM → LOW, then by page number
        List<RiskFlag> sortedRisks = risks.stream()
                .sorted((a, b) -> {
                    int severityOrder = getSeverityOrder(b.getSeverity()) - getSeverityOrder(a.getSeverity());
                    if (severityOrder != 0) return severityOrder;
                    return Integer.compare(a.getPageNumber(), b.getPageNumber());
                })
                .toList();
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            XSSFSheet sheet = workbook.createSheet("Clearance Report");

            // Styles
            CellStyle headerStyle = createHeaderStyle(workbook);
            CellStyle titleStyle = createTitleStyle(workbook);
            CellStyle highStyle = createSeverityStyle(workbook, new XSSFColor(new byte[]{(byte)220, (byte)53, (byte)69}, null));
            CellStyle medStyle = createSeverityStyle(workbook, new XSSFColor(new byte[]{(byte)255, (byte)193, (byte)7}, null));
            CellStyle lowStyle = createSeverityStyle(workbook, new XSSFColor(new byte[]{(byte)25, (byte)135, (byte)84}, null));
            CellStyle redactedStyle = createRedactedStyle(workbook);
            CellStyle dataStyle = createDataStyle(workbook);

            int rowIdx = 0;

            // Title block
            Row titleRow = sheet.createRow(rowIdx++);
            Cell titleCell = titleRow.createCell(0);
            titleCell.setCellValue("SCRIPTSENTRIES — LEGAL CLEARANCE REPORT");
            titleCell.setCellStyle(titleStyle);
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 11));

            Row metaRow = sheet.createRow(rowIdx++);
            metaRow.createCell(0).setCellValue("Script: " + script.getFilename());
            metaRow.createCell(4).setCellValue("Pages: " + script.getTotalPages());
            metaRow.createCell(6).setCellValue("Risks: " + risks.size());
            metaRow.createCell(8).setCellValue("Generated: " +
                    (script.getUploadedAt() != null ? script.getUploadedAt().format(DATE_FMT) : "N/A"));

            rowIdx++; // spacer

            // Column headers
            String[] headers = {
                "Page", "Severity", "Category", "Sub-Category",
                "Entity Name", "Snippet", "Reason", "Suggestion",
                "Status", "Comments (Type : Text)", "Restrictions", "Redacted"
            };
            Row headerRow = sheet.createRow(rowIdx++);
            for (int col = 0; col < headers.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(headers[col]);
                cell.setCellStyle(headerStyle);
            }

            // Data rows
            for (RiskFlag risk : sortedRisks) {
                Row row = sheet.createRow(rowIdx++);

                CellStyle severityStyle = switch (risk.getSeverity()) {
                    case HIGH -> highStyle;
                    case MEDIUM -> medStyle;
                    case LOW -> lowStyle;
                };

                CellStyle statusStyle = createStatusStyle(workbook, risk.getStatus());

                setCell(row, 0, String.valueOf(risk.getPageNumber()), dataStyle);
                setCell(row, 1, risk.getSeverity().name(), severityStyle);
                setCell(row, 2, risk.getCategory().name(), dataStyle);
                setCell(row, 3, risk.getSubCategory().name(), dataStyle);

                if (risk.isRedacted()) {
                    // SECURITY: Replace sensitive fields with [REDACTED]
                    setCell(row, 4, REDACTED, redactedStyle);
                    setCell(row, 5, REDACTED, redactedStyle);
                    setCell(row, 6, risk.getReason(), dataStyle);       // reason stays
                    setCell(row, 7, risk.getSuggestion(), dataStyle);   // suggestion stays
                    setCell(row, 8, risk.getStatus().name(), statusStyle);
                    setCell(row, 9, REDACTED, redactedStyle);
                    setCell(row, 10, REDACTED, redactedStyle);
                    setCell(row, 11, "YES", redactedStyle);
                } else {
                    setCell(row, 4, risk.getEntityName(), dataStyle);
                    setCell(row, 5, risk.getSnippet(), dataStyle);
                    setCell(row, 6, risk.getReason(), dataStyle);
                    setCell(row, 7, risk.getSuggestion(), dataStyle);
                    setCell(row, 8, risk.getStatus().name(), statusStyle);
                    setCell(row, 9, formatComments(risk.getId()), dataStyle);
                    setCell(row, 10, risk.getRestrictions(), dataStyle);
                    setCell(row, 11, "NO", dataStyle);
                }
            }

            // Auto-size columns
            int[] colWidths = {8, 12, 22, 28, 25, 40, 45, 45, 25, 35, 35, 12};
            for (int i = 0; i < colWidths.length; i++) {
                sheet.setColumnWidth(i, colWidths[i] * 256);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            log.info("Excel report generated: {} rows for script '{}'", risks.size(), script.getFilename());
            return out.toByteArray();
        }
    }

    private void setCell(Row row, int col, String value, CellStyle style) {
        Cell cell = row.createCell(col);
        cell.setCellValue(value != null ? value : "");
        cell.setCellStyle(style);
    }

    private CellStyle createHeaderStyle(XSSFWorkbook wb) {
        XSSFCellStyle style = wb.createCellStyle();
        style.setFillForegroundColor(new XSSFColor(new byte[]{(byte)15, (byte)23, (byte)42}, null));
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setBorderBottom(BorderStyle.THIN);
        style.setAlignment(HorizontalAlignment.CENTER);
        XSSFFont font = wb.createFont();
        font.setBold(true);
        font.setColor(new XSSFColor(new byte[]{(byte)255, (byte)255, (byte)255}, null));
        font.setFontHeightInPoints((short)10);
        style.setFont(font);
        return style;
    }

    private CellStyle createTitleStyle(XSSFWorkbook wb) {
        XSSFCellStyle style = wb.createCellStyle();
        style.setFillForegroundColor(new XSSFColor(new byte[]{(byte)6, (byte)95, (byte)70}, null));
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        XSSFFont font = wb.createFont();
        font.setBold(true);
        font.setColor(new XSSFColor(new byte[]{(byte)255, (byte)255, (byte)255}, null));
        font.setFontHeightInPoints((short)14);
        style.setFont(font);
        return style;
    }

    private CellStyle createSeverityStyle(XSSFWorkbook wb, XSSFColor color) {
        XSSFCellStyle style = wb.createCellStyle();
        style.setFillForegroundColor(color);
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        XSSFFont font = wb.createFont();
        font.setBold(true);
        font.setColor(new XSSFColor(new byte[]{(byte)255, (byte)255, (byte)255}, null));
        style.setFont(font);
        return style;
    }

    private CellStyle createRedactedStyle(XSSFWorkbook wb) {
        XSSFCellStyle style = wb.createCellStyle();
        style.setFillForegroundColor(new XSSFColor(new byte[]{(byte)30, (byte)30, (byte)30}, null));
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        XSSFFont font = wb.createFont();
        font.setBold(true);
        font.setColor(new XSSFColor(new byte[]{(byte)255, (byte)80, (byte)80}, null));
        style.setFont(font);
        return style;
    }

    private CellStyle createDataStyle(XSSFWorkbook wb) {
        XSSFCellStyle style = wb.createCellStyle();
        style.setWrapText(true);
        style.setVerticalAlignment(VerticalAlignment.TOP);
        style.setBorderBottom(BorderStyle.HAIR);
        style.setBorderRight(BorderStyle.HAIR);
        return style;
    }

    private String formatComments(Long riskFlagId) {
        List<Comment> comments = commentRepository.findByRiskFlagIdOrderByCreatedAtAsc(riskFlagId);
        if (comments.isEmpty()) return "";
        
        return comments.stream()
                .map(c -> {
                    String type = c.getType() != null ? c.getType() : "Main";
                    return type + " : " + c.getText();
                })
                .collect(Collectors.joining("\n"));
    }

    private int getSeverityOrder(RiskSeverity severity) {
        return switch (severity) {
            case HIGH -> 3;
            case MEDIUM -> 2;
            case LOW -> 1;
        };
    }

    private CellStyle createStatusStyle(XSSFWorkbook wb, ClearanceStatus status) {
        XSSFColor bgColor = switch (status) {
            case PENDING -> new XSSFColor(new byte[]{(byte)254, (byte)243, (byte)199}, null);           // Amber
            case CLEARED -> new XSSFColor(new byte[]{(byte)240, (byte)253, (byte)244}, null);          // Green
            case NOT_CLEAR -> new XSSFColor(new byte[]{(byte)254, (byte)226, (byte)226}, null);       // Red
            case NEGOTIATED_BY_ATTORNEY -> new XSSFColor(new byte[]{(byte)219, (byte)234, (byte)254}, null); // Blue
            case BRANDED_INTEGRATION -> new XSSFColor(new byte[]{(byte)240, (byte)253, (byte)244}, null);    // Green
            case NO_CLEARANCE_NECESSARY -> new XSSFColor(new byte[]{(byte)240, (byte)253, (byte)244}, null); // Green
            case PERMISSIBLE -> new XSSFColor(new byte[]{(byte)240, (byte)253, (byte)244}, null);            // Green
        };

        XSSFColor fgColor = switch (status) {
            case PENDING -> new XSSFColor(new byte[]{(byte)120, (byte)53, (byte)15}, null);                   // Brown
            case CLEARED -> new XSSFColor(new byte[]{(byte)21, (byte)128, (byte)61}, null);                   // Green
            case NOT_CLEAR -> new XSSFColor(new byte[]{(byte)185, (byte)28, (byte)28}, null);                 // Red
            case NEGOTIATED_BY_ATTORNEY -> new XSSFColor(new byte[]{(byte)30, (byte)58, (byte)138}, null);    // Blue
            case BRANDED_INTEGRATION -> new XSSFColor(new byte[]{(byte)21, (byte)128, (byte)61}, null);       // Green
            case NO_CLEARANCE_NECESSARY -> new XSSFColor(new byte[]{(byte)21, (byte)128, (byte)61}, null);    // Green
            case PERMISSIBLE -> new XSSFColor(new byte[]{(byte)21, (byte)128, (byte)61}, null);               // Green
        };

        XSSFCellStyle style = wb.createCellStyle();
        style.setFillForegroundColor(bgColor);
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setBorderBottom(BorderStyle.HAIR);
        style.setBorderRight(BorderStyle.HAIR);
        
        XSSFFont font = wb.createFont();
        font.setColor(fgColor);
        font.setFontHeightInPoints((short)9);
        font.setBold(false);
        style.setFont(font);
        return style;
    }
}
