// src/components/README.md
# Premium UI Components Guide

This directory contains reusable, animation-rich components for building a premium SaaS experience. All components use Framer Motion for smooth, performant animations.

## Core Animation Components

### `AnimatedSection`
Scroll-triggered fade-in animation perfect for landing page sections.

```tsx
import { AnimatedSection } from './AnimatedSection'

export function MyComponent() {
  return (
    <AnimatedSection delay={0.2}>
      <h2>This fades in when scrolled into view</h2>
    </AnimatedSection>
  )
}
```

**Props:**
- `children`: React content to animate
- `delay`: Initial delay before animation (default: 0)
- `className`: Additional Tailwind classes

---

### `Spotlight`
Dynamic hover spotlight effect that tracks cursor movement. Creates a subtle radial gradient that follows your mouse.

```tsx
import { Spotlight } from './Spotlight'

export function FeatureSection() {
  return (
    <Spotlight className="rounded-2xl p-8">
      <h2>Content with hover spotlight effect</h2>
    </Spotlight>
  )
}
```

**Props:**
- `children`: Components to spotlight
- `className`: Wrapper classes

---

### `PremiumCard`
Feature card with hover effects, icon animations, and gradient borders.

```tsx
import { PremiumCard } from './PremiumCard'
import { Zap } from 'lucide-react'

<PremiumCard
  icon={<Zap size={18} className="text-amber-500" />}
  title="Fast Processing"
  description="Analyze scripts in minutes"
  color="text-amber-500"
  bgColor="bg-amber-50"
  borderColor="border-amber-200"
/>
```

**Props:**
- `icon`: React node (e.g., lucide-react icon)
- `title`: Card heading
- `description`: Card description
- `color`: Icon color class
- `bgColor`: Background color class
- `borderColor`: Border color class

---

### `AnimatedGradientOrb`
Full-page animated gradient background. Place in a parent layout.

```tsx
import { AnimatedGradientOrb } from './AnimatedGradientOrb'

export function Layout() {
  return (
    <div>
      <AnimatedGradientOrb />
      {/* Your content here */}
    </div>
  )
}
```

---

### `PremiumButton`
Elevated button with scale animations and shimmer effects.

```tsx
import { PremiumButton } from './PremiumButton'
import { ArrowRight } from 'lucide-react'

<PremiumButton
  variant="primary"
  size="lg"
  icon={<ArrowRight size={15} />}
  onClick={() => console.log('clicked')}
>
  Get Started
</PremiumButton>
```

**Props:**
- `children`: Button label
- `onClick`: Click handler
- `variant`: 'primary' | 'secondary'
- `size`: 'sm' | 'md' | 'lg'
- `className`: Additional classes
- `icon`: Optional icon node

---

## Utility Components

### `StaggerContainer`
Container that staggers animation of children items on scroll.

```tsx
import { StaggerContainer } from './StaggerContainer'

<StaggerContainer staggerDelay={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerContainer>
```

---

### `CountUpNumber`
Animates number counting from one value to another when scrolled into view.

```tsx
import { CountUpNumber } from './CountUpNumber'

<CountUpNumber
  from={0}
  to={14}
  duration={2}
  suffix=" risk categories"
  className="text-4xl font-bold text-emerald-400"
/>
```

---

### `GradientText`
Animates text words with staggered entrance effect. Perfect for headings.

```tsx
import { GradientText } from './GradientText'

<GradientText className="text-3xl font-bold">
  Clear scripts faster
</GradientText>
```

---

### `ParallaxScroll`
Creates parallax scroll effect (content moves slower than scroll).

```tsx
import { ParallaxScroll } from './ParallaxScroll'

<ParallaxScroll offset={50}>
  <img src="background.jpg" />
</ParallaxScroll>
```

---

## Color Scheme (Dark Mode)

The landing page uses a sophisticated dark theme:

- **Background**: `bg-slate-950` (darkest)
- **Cards**: `bg-slate-800/50` with `border-slate-700/50`
- **Accents**: `emerald-400`, `emerald-500`, `emerald-600`
- **Text**: `text-white`, `text-slate-400`, `text-slate-300`

### Color Palette for Roles

```
Attorney:         bg-violet-500, violet-400
Analyst:          bg-blue-500, blue-400
Production:       bg-amber-500, amber-400
Assistant:        bg-slate-500, slate-400
Viewer:           bg-zinc-500, zinc-400
```

---

## Animation Best Practices

1. **Stagger animations** for multiple elements to avoid overwhelming the user
2. **Use `once: true`** in viewport triggers to avoid repeated animations during scrolling
3. **Keep durations between 0.4-0.8s** for snappy feel without feeling rushed
4. **Use `ease: [0.21, 0.47, 0.32, 0.98]`** for natural, bouncy motion
5. **Limit parallax offset** to 50-100px to avoid motion sickness
6. **Test on lower-end devices** to ensure performance

---

## Integration Examples

### Hero Section with Multiple Animations
```tsx
<Spotlight className="relative">
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
  >
    Clear scripts faster
  </motion.h1>
  
  <AnimatedSection delay={0.5}>
    <p>Supporting text with scroll trigger</p>
  </AnimatedSection>
</Spotlight>
```

### Feature Grid with Staggered Cards
```tsx
<div className="grid gap-5 md:grid-cols-3">
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
</div>
```

### Animated List with Checkmarks
```tsx
<ul className="space-y-3">
  {items.map((item, i) => (
    <motion.li
      key={item}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1 }}
      viewport={{ once: true }}
      className="flex items-start gap-2.5"
    >
      <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
      {item}
    </motion.li>
  ))}
</ul>
```

---

## Performance Optimization

- All animations use GPU-accelerated `transform` and `opacity`
- `useInView` triggers prevent animations on invisible content
- Gradient orbs use fixed positioning and `pointer-events-none`
- Stagger delays prevent animation pile-ups
- Consider reducing animations on mobile with media queries

---

## Tailwind Dark Mode

These components assume Tailwind is configured for dark mode. Verify your `tailwind.config.js`:

```js
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
```

---

## Future Enhancements

- [ ] Page transition animations
- [ ] Scroll-progress indicator
- [ ] Infinite scroll animations
- [ ] 3D card flip animations
- [ ] Shape morphing animations
- [ ] Cursor-tracking components
