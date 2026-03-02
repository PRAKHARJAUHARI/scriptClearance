# 🚀 Quick Start: New Premium UI Components

## TL;DR - Copy & Paste Examples

### Hero Section with Animations
```tsx
import { Spotlight } from './components/Spotlight'
import { AnimatedSection } from './components/AnimatedSection'
import { motion } from 'framer-motion'

<Spotlight className="relative">
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
  >
    Your headline
  </motion.h1>
</Spotlight>
```

### Feature Grid
```tsx
import { PremiumCard } from './components/PremiumCard'
import { motion } from 'framer-motion'

{features.map((f, i) => (
  <motion.div
    key={f.title}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <PremiumCard {...f} />
  </motion.div>
))}
```

### Animated List
```tsx
<ul className="space-y-3">
  {items.map((item, i) => (
    <motion.li
      key={item}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1 }}
      viewport={{ once: true }}
    >
      <CheckCircle className="text-emerald-400" />
      {item}
    </motion.li>
  ))}
</ul>
```

---

## Component Quick Reference

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| **AnimatedSection** | Scroll fade-in | `delay`, `className` |
| **PremiumCard** | Feature card | `icon`, `title`, `desc`, colors |
| **Spotlight** | Hover glow | `className`, `children` |
| **PremiumButton** | Enhanced button | `variant`, `size`, `onClick` |
| **AnimatedGradientOrb** | Background effect | (Use in parent layout) |
| **StaggerContainer** | Cascade animations | `staggerDelay` |
| **CountUpNumber** | Number counter | `to`, `prefix`, `suffix` |
| **ParallaxScroll** | Depth effect | `offset`, `children` |

---

## Color Reference

```
Dark theme colors:
- Background: bg-slate-950
- Cards: bg-slate-800/50
- Borders: border-slate-700/50
- Text: text-white, text-slate-400, text-slate-300

Accent colors:
- Primary: text-emerald-400, bg-emerald-600
- Secondary: text-cyan-400
```

---

## Common Animations

### Fade In (scroll trigger)
```tsx
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: 0.6 }}
viewport={{ once: true, amount: 0.3 }}
```

### Slide Up (scroll trigger)
```tsx
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
viewport={{ once: true, amount: 0.3 }}
```

### Hover Scale
```tsx
whileHover={{ scale: 1.05 }}
transition={{ duration: 0.3 }}
```

### Tap Scale
```tsx
whileTap={{ scale: 0.95 }}
```

---

## Files Reference

| File | Purpose |
|------|---------|
| `LandingPage.tsx` | Main landing page (fully animated) |
| `Spotlight.tsx` | Hover spotlight effect |
| `AnimatedGradientOrb.tsx` | Background animation |
| `AnimatedSection.tsx` | Scroll trigger fade-in |
| `PremiumCard.tsx` | Feature card component |
| `PremiumButton.tsx` | Enhanced button |
| `components/README.md` | Full documentation |
| `LANDING_PAGE_UPGRADE.md` | Upgrade summary |

---

## Performance Tips

1. Use `once: true` in viewport to prevent repeated animations
2. Keep durations 0.4-0.8s for snappy feel
3. Use `opacity` and `transform` for best performance
4. Avoid animating layout properties (width, height)
5. Test on low-end devices

---

## Import All At Once

```typescript
import { Spotlight } from './components/Spotlight'
import { AnimatedSection } from './components/AnimatedSection'
import { AnimatedGradientOrb } from './components/AnimatedGradientOrb'
import { PremiumCard } from './components/PremiumCard'
import { PremiumButton } from './components/PremiumButton'
import { StaggerContainer } from './components/StaggerContainer'
import { CountUpNumber } from './components/CountUpNumber'
import { ParallaxScroll } from './components/ParallaxScroll'
import { motion } from 'framer-motion'
```

---

## Easing Functions Used

```typescript
// Default Framer Motion easing (natural)
ease: "easeInOut"

// Custom cubic-bezier (used in project)
[0.21, 0.47, 0.32, 0.98] // Natural, bouncy
```

---

## Common Issues & Fixes

### Animations don't show on scroll
- ✅ Check `viewport={{ once: true }}` is set
- ✅ Check `whileInView` is on the motion.div
- ✅ Inspect with DevTools to verify viewport is visible

### Button animation not working
- ✅ Use `motion.button` from framer-motion
- ✅ Check `whileHover` and `whileTap` props

### Performance lag
- ✅ Reduce number of animated elements
- ✅ Use `opacity` and `transform` only
- ✅ Check DevTools Performance tab

---

## Production Checklist

- [ ] Build passes (`npm run build`)
- [ ] All components compile without errors
- [ ] Animations smooth on 60Hz displays
- [ ] Works on mobile (test Chrome DevTools)
- [ ] Accessibility okay (keyboard nav works)
- [ ] Lighthouse score good (>85)
- [ ] No console errors
- [ ] Git committed

---

**Questions? Check `components/README.md` for full documentation!**
