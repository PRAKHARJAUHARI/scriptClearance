// src/components/ProjectDetailsTab.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Film, Building2, Mail, Phone, Tag, FileText,
  Calendar, ExternalLink, StickyNote, Pencil, Check, X, Loader2
} from 'lucide-react'
import { updateProject, type ProjectResponse, type UpdateProjectPayload } from '../api/projectApi'
import { useAuth, canEdit } from '../context/AuthContext'

interface Props {
  project: ProjectResponse
  onUpdated: (updated: ProjectResponse) => void
}

interface FieldProps {
  icon: React.ReactNode
  label: string
  value: string | null | undefined
  editing: boolean
  inputKey: keyof UpdateProjectPayload
  draft: UpdateProjectPayload
  onDraftChange: (key: keyof UpdateProjectPayload, val: string) => void
  multiline?: boolean
  type?: string
  // No `placeholder` here — the component auto-generates it from `label`
}

function DetailField({ icon, label, value, editing, inputKey, draft, onDraftChange, multiline, type = 'text' }: FieldProps) {
  const displayVal = draft[inputKey] !== undefined ? draft[inputKey] : value

  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
        {icon} {label}
      </label>
      {editing ? (
        multiline ? (
          <textarea
            value={(displayVal as string) ?? ''}
            onChange={e => onDraftChange(inputKey, e.target.value)}
            rows={3}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm
                       rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-400
                       focus:ring-2 focus:ring-emerald-100 placeholder-slate-300
                       resize-none transition-all"
            placeholder={`Enter ${label.toLowerCase()}…`}
          />
        ) : (
          <input
            type={type}
            value={(displayVal as string) ?? ''}
            onChange={e => onDraftChange(inputKey, e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm
                       rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-400
                       focus:ring-2 focus:ring-emerald-100 placeholder-slate-300 transition-all"
            placeholder={`Enter ${label.toLowerCase()}…`}
          />
        )
      ) : (
        <div className={`text-sm rounded-xl px-4 py-2.5 min-h-[40px] border ${
          displayVal
            ? 'text-slate-700 bg-slate-50 border-slate-100'
            : 'text-slate-300 italic bg-slate-50/50 border-slate-100'
        }`}>
          {displayVal || `No ${label.toLowerCase()} set`}
        </div>
      )}
    </div>
  )
}

export function ProjectDetailsTab({ project, onUpdated }: Props) {
  const { user }         = useAuth()
  const userCanEdit      = user ? canEdit(user.role) : false
  const [editing, setEditing] = useState(false)
  const [draft,   setDraft]   = useState<UpdateProjectPayload>({})
  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const handleDraftChange = (key: keyof UpdateProjectPayload, val: string) => {
    setDraft((prev: UpdateProjectPayload) => ({ ...prev, [key]: val }))
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    setError(null)
    try {
      const updated = await updateProject(project.id, draft, user.userId)
      onUpdated(updated)
      setEditing(false)
      setDraft({})
    } catch (e: unknown) {
      setError((e as { response?: { data?: { error?: string } } })?.response?.data?.error ?? 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => { setEditing(false); setDraft({}); setError(null) }

  const fieldProps = { editing, draft, onDraftChange: handleDraftChange }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6">

      {/* Action bar */}
      {userCanEdit && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            {editing ? 'Edit production details below' : 'View and edit project production information'}
          </p>
          {editing ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave} disabled={saving}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500
                           text-white text-xs font-medium rounded-xl transition-all disabled:opacity-50">
                {saving ? <><Loader2 size={12} className="animate-spin" /> Saving…</> : <><Check size={12} /> Save</>}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200
                           text-slate-500 text-xs rounded-xl hover:bg-slate-50 transition-all">
                <X size={12} /> Cancel
              </motion.button>
            </motion.div>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200
                         text-slate-500 text-xs rounded-xl hover:bg-slate-50 transition-all">
              <Pencil size={11} /> Edit Details
            </motion.button>
          )}
        </motion.div>
      )}

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </motion.div>
      )}

      {/* Production Info */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-2">
          <Film size={11} /> Production Information
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <DetailField icon={<Film size={10} />}         label="Project Name"        value={project.name}            inputKey="name"            {...fieldProps} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <DetailField icon={<Building2 size={10} />}    label="Studio / Production" value={project.studioName}      inputKey="studioName"      {...fieldProps} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <DetailField icon={<Tag size={10} />}          label="Director"            value={project.director}         inputKey="director"        {...fieldProps} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <DetailField icon={<Tag size={10} />}          label="Producer"            value={project.producer}         inputKey="producer"        {...fieldProps} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <DetailField icon={<Tag size={10} />}          label="Genre"               value={project.genre}            inputKey="genre"           {...fieldProps} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            <DetailField icon={<Calendar size={10} />}     label="Expected Release"    value={project.expectedRelease}  inputKey="expectedRelease" {...fieldProps} />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <DetailField icon={<FileText size={10} />} label="Logline" value={project.logline} inputKey="logline" {...fieldProps} multiline />
        </motion.div>
      </motion.div>

      {/* Contact Details */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-2">
          <Phone size={11} /> Contact Details
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <DetailField icon={<Mail size={10} />}         label="Production Email" value={project.productionEmail} inputKey="productionEmail" type="email" {...fieldProps} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <DetailField icon={<Phone size={10} />}        label="Production Phone" value={project.productionPhone} inputKey="productionPhone" type="tel"   {...fieldProps} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <DetailField icon={<ExternalLink size={10} />} label="IMDb Link"        value={project.imdbLink}        inputKey="imdbLink"        type="url"   {...fieldProps} />
          </motion.div>
        </div>
      </motion.div>

      {/* Notes */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-2">
          <StickyNote size={11} /> Internal Notes
        </h3>
        <DetailField icon={<StickyNote size={10} />} label="Notes" value={project.notes} inputKey="notes" {...fieldProps} multiline />
      </motion.div>

      {/* Meta */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[11px] text-slate-400 border-t border-slate-100 pt-4 flex items-center gap-4 flex-wrap">
        <span>Created {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        {project.createdBy && <><span>·</span><span>by @{project.createdBy.username}</span></>}
        <span>·</span>
        <span>{project.totalScripts} script{project.totalScripts !== 1 ? 's' : ''}</span>
      </motion.div>
    </motion.div>
  )
}
