// src/components/LandingPage.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck, Zap, Users, MessageSquare, GitBranch,
  BarChart3, Eye, Tag,
  CheckCircle,
  ArrowRight, Play
} from 'lucide-react'
import { Spotlight } from './Spotlight'
import { AnimatedSection } from './AnimatedSection'
import { PremiumCard } from './PremiumCard'

interface Props {
  onLogin: () => void
  onSignup: () => void
}

const ROLES = [
  {
    name: 'Attorney',
    color: 'bg-violet-50 border-violet-200 text-violet-700',
    dot: 'bg-violet-500',
    badge: 'bg-violet-100 text-violet-700',
    powers: [
      'Full access to all scripts and risk flags',
      'Change clearance status on any issue',
      'Add comments, notes, and restrictions',
      'Manage project members and roles',
      'Export redacted clearance reports',
      'Delete scripts and soft-delete projects',
    ],
    description: 'The project owner with full control. Typically the supervising clearance attorney.',
  },
  {
    name: 'Analyst',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    dot: 'bg-blue-500',
    badge: 'bg-blue-100 text-blue-700',
    powers: [
      'Upload new script versions',
      'View and comment on all risk flags',
      'Update clearance status',
      'Add restrictions and legal notes',
      'Manage project members',
    ],
    description: 'The clearance researcher who works flags daily. Can upload and annotate.',
  },
  {
    name: 'Main Production Contact',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    dot: 'bg-amber-500',
    badge: 'bg-amber-100 text-amber-700',
    powers: [
      'View timeline of all script versions',
      'Monitor progress across all flags',
      'Read comments and notes from team',
      'Track how much work analysts have done',
      'Cannot upload or change statuses',
    ],
    description: 'Production oversight role — they see everything but never touch the clearance workflow.',
  },
  {
    name: 'Production Assistant',
    color: 'bg-slate-50 border-slate-200 text-slate-600',
    dot: 'bg-slate-400',
    badge: 'bg-slate-100 text-slate-600',
    powers: [
      'View all flagged risks',
      'Add comments and notes on issues',
      'Read restriction conditions',
      'Cannot upload or change statuses',
    ],
    description: 'Day-to-day support role. Can read and comment but not make clearance decisions.',
  },
  {
    name: 'Viewer',
    color: 'bg-zinc-50 border-zinc-200 text-zinc-500',
    dot: 'bg-zinc-400',
    badge: 'bg-zinc-100 text-zinc-500',
    powers: [
      'Read-only access to risk flags',
      'View clearance statuses',
      'No editing or upload permissions',
    ],
    description: 'Stakeholders who need visibility — executives, clients, external reviewers.',
  },
]

const FEATURES = [
  {
    icon: Zap,
    title: 'AI Risk Detection',
    color: 'text-amber-500',
    bg: 'bg-amber-50 border-amber-100',
    desc: 'Upload any script PDF and our AI reads every page, flagging copyright issues, likeness rights, trademarked products, music references, real locations, and 14 other risk categories — automatically, in minutes.',
  },
  {
    icon: Tag,
    title: 'Smart Categorization',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-100',
    desc: 'Every flag is sorted by severity (HIGH / MEDIUM / LOW) and category so your team knows exactly what to tackle first. Filter by category, severity, or status to focus on what matters.',
  },
  {
    icon: MessageSquare,
    title: 'Team Comments & Notes',
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-100',
    desc: 'Click any risk flag to open a detail drawer. Leave comments, add legal restrictions, tag teammates with @mentions, and track who said what. All notes are saved alongside the flag forever.',
  },
  {
    icon: GitBranch,
    title: 'Script Version Timeline',
    color: 'text-violet-600',
    bg: 'bg-violet-50 border-violet-100',
    desc: 'Every uploaded script version appears on a timeline with risk counts and status. Production contacts can see at a glance how many issues were resolved between Draft 1 and the Final, measuring analyst progress over time.',
  },
  {
    icon: Users,
    title: 'Role-Based Access',
    color: 'text-rose-600',
    bg: 'bg-rose-50 border-rose-100',
    desc: 'Attorneys, analysts, production contacts, assistants, and viewers all get exactly the access they need. Invite team members to specific projects with their appropriate role — no more sharing spreadsheets by email.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Data Retention',
    color: 'text-slate-700',
    bg: 'bg-slate-50 border-slate-200',
    desc: 'Script PDFs are analyzed and immediately deleted from our servers. We store only the extracted risk data — not your screenplay. Your confidential content stays confidential.',
  },
]

const WORKFLOW = [
  { step: '01', title: 'Create a Project', desc: 'Set up a project for your production — add the studio name, director, genre, and invite your clearance team.' },
  { step: '02', title: 'Upload a Script Version', desc: 'Drag in the PDF. The AI reads every page and flags issues by category and severity within minutes.' },
  { step: '03', title: 'Review & Annotate', desc: 'Click each flag to see the exact script excerpt, AI reasoning, and suggested fix. Add your legal notes and set the clearance status.' },
  { step: '04', title: 'Track Progress', desc: 'Upload subsequent drafts to build a timeline. Production contacts can see risk counts drop across versions, confirming work is being done.' },
  { step: '05', title: 'Export the Report', desc: 'Generate a formatted Excel clearance report. Sensitive items can be redacted from the export for external distribution.' },
]

export function LandingPage({ onLogin, onSignup }: Props) {
  const [activeRole, setActiveRole] = useState(0)

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-hidden">
      {/* Animated gradient background - removed for light mode */}

      {/* ── Nav ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200
                          flex items-center justify-center"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <ShieldCheck size={16} className="text-emerald-600" />
            </motion.div>
            <span className="font-display text-lg text-slate-900 tracking-tight">
              Script<span className="text-emerald-600">Sentries</span>
            </span>
          </motion.div>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={onLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-slate-600 hover:text-slate-900 px-3 py-1.5 transition-colors"
            >
              Sign in
            </motion.button>
            <motion.button
              onClick={onSignup}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 text-sm bg-emerald-600 hover:bg-emerald-500
                         text-white px-4 py-2 rounded-lg font-medium transition-all"
            >
              Get started <ArrowRight size={13} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <Spotlight className="relative">
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                        bg-emerald-50 border border-emerald-200 text-emerald-700
                        text-xs font-medium mb-6"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            AI-powered film &amp; TV clearance
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-5xl md:text-6xl text-slate-900 mb-6 leading-tight"
          >
            Clear scripts faster.<br />
            <span className="text-emerald-600">
              Miss nothing.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            ScriptSentries reads your screenplay and flags every legal risk — copyright, likeness,
            trademark, music, real locations — organized by severity, assigned to your team,
            and tracked across every draft revision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <motion.button
              onClick={onSignup}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500
                         text-white px-6 py-3 rounded-xl font-medium text-sm shadow-lg transition-all"
            >
              Start your first project <ArrowRight size={15} />
            </motion.button>
            <motion.button
              onClick={onLogin}
              whileHover={{ scale: 1.05, borderColor: 'rgb(16, 185, 129)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-slate-600 border border-slate-200
                         hover:border-emerald-500 bg-white hover:bg-slate-50
                         px-6 py-3 rounded-xl font-medium text-sm transition-all"
            >
              <Play size={14} /> Sign in to existing project
            </motion.button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto border-t border-slate-100 pt-8"
          >
            {[
              { val: '14', label: 'Risk categories' },
              { val: '5', label: 'Access roles' },
              { val: '0', label: 'Data retained' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <p className="font-display text-3xl text-slate-900 mb-1">{s.val}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </Spotlight>

      {/* ── How it works ── */}
      <section className="relative bg-slate-50 border-y border-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-2"
              >
                Workflow
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="font-display text-3xl text-slate-900"
              >
                From script to clearance in 5 steps
              </motion.h2>
            </div>
          </AnimatedSection>

          <div className="grid gap-4 md:grid-cols-5">
            {WORKFLOW.map((w, i) => (
              <motion.div
                key={w.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative"
              >
                {i < WORKFLOW.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[calc(100%-8px)] w-full h-px bg-slate-200 z-0" />
                )}
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.15)' }}
                  className="relative z-10 bg-white border border-slate-200 hover:border-emerald-300
                             rounded-2xl p-4 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600
                                  text-white text-xs font-bold flex items-center justify-center mb-3">
                    {w.step}
                  </div>
                  <p className="font-semibold text-slate-800 text-sm mb-1.5">{w.title}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{w.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative max-w-6xl mx-auto px-6 py-20">
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-2">
            Features
          </p>
          <h2 className="font-display text-3xl text-slate-900">
            Everything your clearance team needs
          </h2>
        </AnimatedSection>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <PremiumCard
                icon={<f.icon size={18} className={f.color} />}
                title={f.title}
                description={f.desc}
                color={f.color}
                bgColor={f.bg.split(' ')[0]}
                borderColor={f.bg.split(' ')[1]}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── AI risk categories ── */}
      <section className="bg-slate-50 border-y border-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-2">
              AI Detection
            </p>
            <h2 className="font-display text-3xl text-slate-900 mb-3">
              14 risk categories, analyzed page by page
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              The AI doesn't just scan for keywords. It reads context — understanding
              whether a brand mention is incidental or a potential trademark issue.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
            {[
              { name: 'Fact-Based Issues', sev: 'HIGH' },
              { name: 'Government', sev: 'MED' },
              { name: 'Likeness Rights', sev: 'HIGH' },
              { name: 'Locations', sev: 'LOW' },
              { name: 'Music & Choreography', sev: 'HIGH' },
              { name: 'Names & Numbers', sev: 'MED' },
              { name: 'Playback', sev: 'LOW' },
              { name: 'Product Misuse', sev: 'MED' },
              { name: 'Props & Set Dressing', sev: 'LOW' },
              { name: 'References', sev: 'MED' },
              { name: 'Vehicles', sev: 'LOW' },
              { name: 'Wardrobe', sev: 'LOW' },
              { name: 'Marketing & Added Value', sev: 'MED' },
              { name: 'Other', sev: 'LOW' },
            ].map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(16, 185, 129, 0.1)' }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white border border-slate-200 hover:border-emerald-300
                           rounded-xl p-3 text-center transition-all duration-300"
              >
                <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded mb-2 inline-block ${
                  cat.sev === 'HIGH' ? 'bg-red-50 text-red-600' :
                  cat.sev === 'MED'  ? 'bg-amber-50 text-amber-600' :
                  'bg-emerald-50 text-emerald-600'
                }`}>{cat.sev}</div>
                <p className="text-xs text-slate-700 leading-snug">{cat.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comments & tagging ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-3">
              Collaboration
            </p>
            <h2 className="font-display text-3xl text-slate-900 mb-4">
              Your team talks inside the flag, not in a separate email thread
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              Every risk flag has a comments field and a restrictions field. Type
              <span className="font-mono bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-sm mx-1 text-emerald-600">
                @username
              </span>
              to tag a teammate — they'll see it the next time they open the flag.
              Leave legal conditions, negotiation status, or jurisdiction notes right
              where the context lives.
            </p>
            <ul className="space-y-3">
              {[
                'Comments stay attached to the specific flag forever',
                'Restrictions field tracks legal conditions (e.g. "US only")',
                '@tag teammates directly in comments or restrictions',
                'All edits saved immediately — no lost work',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-2.5 text-sm text-slate-600"
                >
                  <CheckCircle size={15} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Mock comment UI */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3"
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={14} className="text-slate-400" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Flag #47 — Likeness Rights
              </span>
            </div>
            {[
              { user: 'sarah_attorney', role: 'ATTORNEY', color: 'bg-violet-100 text-violet-700 border-violet-200', msg: 'This is a real person — need written consent. @james_analyst can you reach their rep?', time: '2h ago' },
              { user: 'james_analyst', role: 'ANALYST', color: 'bg-blue-100 text-blue-700 border-blue-200', msg: 'On it. Reached out to CAA. Expecting response by Friday. Marking as NOT CLEAR for now.', time: '1h ago' },
              { user: 'priya_pc', role: 'PROD CONTACT', color: 'bg-amber-100 text-amber-700 border-amber-200', msg: 'Thanks for the update. Will flag for director on Monday call.', time: '30m ago' },
            ].map((c, i) => (
              <motion.div
                key={c.user}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-100 rounded-xl p-3"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-slate-600">{c.user[0].toUpperCase()}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">@{c.user}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium border ${c.color}`}>
                    {c.role}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-auto">{c.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{c.msg}</p>
              </motion.div>
            ))}
            <div className="border border-emerald-200 bg-emerald-50 rounded-xl px-3 py-2 text-xs text-slate-500">
              Add a comment… (@mention to tag)
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline feature ── */}
      <section className="bg-slate-50 border-y border-slate-100 py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Mock timeline */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-3"
            >
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-5 flex items-center gap-2">
                <GitBranch size={12} /> Script Version Timeline — Untitled Feature Film
              </div>
              {[
                { v: 'Draft 1', date: 'Feb 3', high: 24, med: 18, low: 31, status: 'COMPLETE', active: false },
                { v: 'Draft 2', date: 'Feb 10', high: 18, med: 14, low: 28, status: 'COMPLETE', active: false },
                { v: 'Revised Draft', date: 'Feb 17', high: 9, med: 10, low: 22, status: 'COMPLETE', active: false },
                { v: 'Final', date: 'Feb 24', high: 3, med: 5, low: 14, status: 'COMPLETE', active: true },
              ].map((entry, i, arr) => (
                <motion.div
                  key={entry.v}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className={`w-3 h-3 rounded-full border-2 border-white shadow mt-1 flex-shrink-0 ${
                        entry.active ? 'bg-emerald-500 ring-2 ring-emerald-200' : 'bg-slate-300'
                      }`}
                    />
                    {i < arr.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
                  </div>
                  <motion.div
                    whileHover={{ x: 4, boxShadow: '0 10px 30px rgba(16, 185, 129, 0.1)' }}
                    className={`flex-1 rounded-xl border p-3 mb-2 transition-all duration-300 ${
                      entry.active
                        ? 'bg-white border-emerald-200 shadow-sm'
                        : 'bg-white border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-slate-800">{entry.v}</span>
                      <span className="text-[10px] text-slate-400">{entry.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-red-50 text-red-600 border border-red-100 px-1.5 py-0.5 rounded font-medium">
                        {entry.high} HIGH
                      </span>
                      <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-100 px-1.5 py-0.5 rounded font-medium">
                        {entry.med} MED
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded font-medium">
                        {entry.low} LOW
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <AnimatedSection>
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-3">
                Timeline Feature
              </p>
              <h2 className="font-display text-3xl text-slate-900 mb-4">
                Production contacts can measure progress at a glance
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                Every script upload creates a new entry on the project timeline — labeled,
                date-stamped, and showing a live risk count breakdown. Production contacts
                don't need to read legal notes to understand if clearance is moving forward.
                Watching HIGH risks drop from 24 → 3 across four drafts tells the whole story.
              </p>
              <ul className="space-y-3">
                {[
                  'Each draft is a separate timeline entry — nothing is overwritten',
                  'Risk counts update in real time as analysts clear flags',
                  'Production contacts get oversight without touching the workflow',
                  'Click any version to open its full risk workbench',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2.5 text-sm text-slate-600"
                  >
                    <BarChart3 size={15} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Roles breakdown ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <AnimatedSection className="text-center mb-10">
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-2">
            Access Roles
          </p>
          <h2 className="font-display text-3xl text-slate-900 mb-3">
            The right access for every team member
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm">
            Invite anyone to a project with a role that matches their responsibilities.
            Roles are per-project — the same person can be an Attorney on one project
            and a Viewer on another.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-5 gap-2 mb-6">
          {ROLES.map((role, i) => (
            <motion.button
              key={role.name}
              onClick={() => setActiveRole(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`text-left p-3 rounded-xl border transition-all ${
                activeRole === i
                  ? `${role.color} shadow-sm`
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${role.dot} mb-2`} />
              <p className="text-xs font-semibold text-slate-800 leading-tight">{role.name}</p>
            </motion.button>
          ))}
        </div>

        {/* Active role detail */}
        <motion.div
          key={activeRole}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`rounded-2xl border p-6 ${ROLES[activeRole].color}`}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${ROLES[activeRole].badge} mb-3 inline-block`}>
                {ROLES[activeRole].name.toUpperCase()}
              </span>
              <p className="text-slate-600 text-sm leading-relaxed">{ROLES[activeRole].description}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Permissions</p>
              <ul className="space-y-2">
                {ROLES[activeRole].powers.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    {p}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Inviting members ── */}
      <section className="bg-slate-50 border-y border-slate-100 py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-3">
                Project Management
              </p>
              <h2 className="font-display text-3xl text-slate-900 mb-4">
                Invite, manage, and remove team members without IT
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Attorneys and Analysts can add or remove project members at any time.
                Just enter the username, choose their role, and they're in.
                Remove someone when they roll off the project — they immediately lose access.
              </p>
              <ul className="space-y-3">
                {[
                  'Add members by username from within the project',
                  'Each member gets a role specific to that project',
                  'Remove members instantly — access revoked immediately',
                  'Project creator cannot be removed',
                  'Members see only the projects they\'re invited to',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2.5 text-sm text-slate-700"
                  >
                    <Users size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            {/* Mock members UI */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-900">Project Team</span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700
                             text-white px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all"
                >
                  <Users size={12} /> Add member
                </motion.div>
              </div>
              <div className="space-y-2">
                {[
                  { u: 'sarah_j', role: 'ATTORNEY', color: 'bg-violet-100 text-violet-700 border-violet-200' },
                  { u: 'james_r', role: 'ANALYST', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                  { u: 'priya_k', role: 'MAIN PRODUCTION', color: 'bg-amber-100 text-amber-700 border-amber-200' },
                  { u: 'tom_w', role: 'PROD ASSISTANT', color: 'bg-slate-100 text-slate-700 border-slate-200' },
                  { u: 'exec_view', role: 'VIEWER', color: 'bg-zinc-100 text-zinc-700 border-zinc-200' },
                ].map((m, i) => (
                  <motion.div
                    key={m.u}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200
                                    flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-emerald-600">{m.u[0].toUpperCase()}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-700 flex-1">@{m.u}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium ${m.color}`}>
                      {m.role}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.2, color: '#ef4444' }}
                      className="text-slate-400 hover:text-red-500 transition-colors ml-1"
                    >
                      <Eye size={12} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Issue management ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-2">
            Issue Management
          </p>
          <h2 className="font-display text-3xl text-slate-900 mb-3">Turn flags into cleared items</h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed">
            Each flagged risk moves through a clearance lifecycle. Filter and sort to
            prioritize what needs attention today.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { status: 'PENDING', color: 'border-amber-200 bg-amber-50', dot: 'bg-amber-500', desc: 'Newly flagged by AI. Needs attorney or analyst review.' },
            { status: 'NOT CLEAR', color: 'border-red-200 bg-red-50', dot: 'bg-red-500', desc: 'Active issue. Clearance not yet obtained. Team is working it.' },
            { status: 'NEGOTIATED', color: 'border-blue-200 bg-blue-50', dot: 'bg-blue-500', desc: 'In negotiation with rights holder or legal contact.' },
            { status: 'CLEARED', color: 'border-emerald-200 bg-emerald-50', dot: 'bg-emerald-500', desc: 'Rights confirmed. Issue resolved. Nothing further needed.' },
            { status: 'PERMISSIBLE', color: 'border-violet-200 bg-violet-50', dot: 'bg-violet-500', desc: 'AI flagged it but legal review confirmed it\'s fine as-is.' },
            { status: 'NO CLEARANCE NECESSARY', color: 'border-slate-200 bg-slate-50', dot: 'bg-slate-400', desc: 'Confirmed not a real risk for this production context.' },
          ].map((s, i) => (
            <motion.div
              key={s.status}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(16, 185, 129, 0.1)' }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              className={`rounded-xl border p-4 transition-all duration-300 ${s.color}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{s.status}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-20 relative z-10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-display text-4xl text-slate-900 mb-4"
          >
            Ready to clear your first script?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-slate-600 mb-8 leading-relaxed"
          >
            Create a project, upload a draft, and have AI flag your risks in minutes.
            No spreadsheets. No email threads. Just your whole clearance team in one place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <motion.button
              onClick={onSignup}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700
                         px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg"
            >
              Create free account <ArrowRight size={15} />
            </motion.button>
            <motion.button
              onClick={onLogin}
              whileHover={{ scale: 1.05, borderColor: 'rgba(16, 185, 129, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900
                         border border-slate-300 hover:border-emerald-600 px-6 py-3 rounded-xl
                         font-medium text-sm transition-all"
            >
              Sign in
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-slate-100 py-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span className="text-sm font-medium text-slate-600">ScriptSentries</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Zero data retention — scripts deleted after analysis
          </div>
        </div>
      </motion.footer>
    </div>
  )
}