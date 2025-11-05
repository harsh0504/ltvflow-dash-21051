# Animation Guidelines

## Motion Library Setup

This project uses Motion (formerly Framer Motion) for animations. Import features from the new package structure:

```tsx
import { motion } from "motion/react"
```

## Keep Your Animations Fast

- Default to use `ease-out` for most animations.
- Animations should never be longer than 1s (unless it's illustrative), most of them should be around 0.2s to 0.3s.

## Easing Rules

Don't use built-in CSS easings unless it's `ease` or `linear`. Use the following easings for their described use case:

### `ease-in` (Starts slow, speeds up)
Should generally be avoided as it makes the UI feel slow.

- `ease-in-quad`: `cubic-bezier(.55, .085, .68, .53)`
- `ease-in-cubic`: `cubic-bezier(.550, .055, .675, .19)`
- `ease-in-quart`: `cubic-bezier(.895, .03, .685, .22)`
- `ease-in-quint`: `cubic-bezier(.755, .05, .855, .06)`
- `ease-in-expo`: `cubic-bezier(.95, .05, .795, .035)`
- `ease-in-circ`: `cubic-bezier(.6, .04, .98, .335)`

### `ease-out` (Starts fast, slows down)
Best for elements entering the screen or user-initiated interactions.

- `ease-out-quad`: `cubic-bezier(.25, .46, .45, .94)`
- `ease-out-cubic`: `cubic-bezier(.215, .61, .355, 1)`
- `ease-out-quart`: `cubic-bezier(.165, .84, .44, 1)`
- `ease-out-quint`: `cubic-bezier(.23, 1, .32, 1)`
- `ease-out-expo`: `cubic-bezier(.19, 1, .22, 1)`
- `ease-out-circ`: `cubic-bezier(.075, .82, .165, 1)`

### `ease-in-out` (Smooth acceleration and deceleration)
Perfect for elements moving within the screen.

- `ease-in-out-quad`: `cubic-bezier(.455, .03, .515, .955)`
- `ease-in-out-cubic`: `cubic-bezier(.645, .045, .355, 1)`
- `ease-in-out-quart`: `cubic-bezier(.77, 0, .175, 1)`
- `ease-in-out-quint`: `cubic-bezier(.86, 0, .07, 1)`
- `ease-in-out-expo`: `cubic-bezier(1, 0, 0, 1)`
- `ease-in-out-circ`: `cubic-bezier(.785, .135, .15, .86)`

## Hover Transitions

- Use the built-in CSS `ease` with a duration of `200ms` for simple hover transitions like `color`, `background-color`, `opacity`.
- Fall back to easing rules for more complex hover transitions.
- Disable hover transitions on touch devices with the `@media (hover: hover) and (pointer: fine)` media query.

Example:
```css
.button {
  transition: background-color 200ms ease;
}

@media (hover: hover) and (pointer: fine) {
  .button:hover {
    background-color: blue;
  }
}
```

## Accessibility

- If `transform` is used in the animation, disable it in the `prefers-reduced-motion` media query.

Example:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

With Motion:
```tsx
import { motion, useReducedMotion } from "motion/react"

const Component = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
    />
  )
}
```

## Origin-Aware Animations

Elements should animate from the trigger. If you open a dropdown or a popover it should animate from the button. Change `transform-origin` according to the trigger position.

Example:
```tsx
// Dropdown opening from top-left
<motion.div
  style={{ transformOrigin: "top left" }}
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
/>

// Dropdown opening from bottom-right
<motion.div
  style={{ transformOrigin: "bottom right" }}
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
/>
```

## Performance

- **Stick to opacity and transforms when possible.** Animate using `transform` instead of `top`, `left`, etc. when trying to move an element.
- **Do not animate drag gestures using CSS variables.**
- **Do not animate blur values higher than 20px.**
- **Use `will-change` to optimize your animation**, but use it only for: `transform`, `opacity`, `clipPath`, `filter`.
- **When using Motion** use `transform` instead of `x` or `y` if you need animations to be hardware accelerated.

Good:
```tsx
<motion.div
  animate={{ transform: "translateX(100px)" }}
/>
```

Acceptable (Motion optimizes this automatically):
```tsx
<motion.div
  animate={{ x: 100 }}
/>
```

Bad:
```tsx
<motion.div
  animate={{ left: "100px" }}
/>
```

## Spring Animations

- **Default to spring animations when using Motion.**
- **Avoid using bouncy spring animations** unless you are working with drag gestures.

Default spring (recommended for most use cases):
```tsx
<motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
/>
```

Gentle spring (for subtle animations):
```tsx
<motion.div
  animate={{ opacity: 1 }}
  transition={{ type: "spring", stiffness: 100, damping: 20 }}
/>
```

Bouncy spring (only for drag/interactive elements):
```tsx
<motion.div
  drag
  dragElastic={0.2}
  transition={{ type: "spring", stiffness: 400, damping: 15 }}
/>
```

## Common Animation Patterns

### Fade In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3, ease: [.215, .61, .355, 1] }}
/>
```

### Slide In From Bottom
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: [.215, .61, .355, 1] }}
/>
```

### Scale In
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.2, ease: [.215, .61, .355, 1] }}
/>
```

### Stagger Children
```tsx
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  }}
>
  <motion.li
    variants={{
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 }
    }}
  />
</motion.ul>
```

### Exit Animations
```tsx
import { AnimatePresence } from "motion/react"

<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    />
  )}
</AnimatePresence>
```

## Quick Reference

| Use Case | Animation Type | Duration | Easing |
|----------|---------------|----------|--------|
| Button hover | CSS transition | 200ms | ease |
| Modal open | Spring | - | default spring |
| Dropdown open | Tween | 200ms | ease-out-cubic |
| Page transition | Tween | 300ms | ease-out-cubic |
| Drag interaction | Spring | - | bouncy spring |
| Loading spinner | CSS animation | infinite | linear |
| Notification toast | Slide + Fade | 300ms | ease-out-quart |
| Card hover | CSS transition | 200ms | ease |

## Best Practices Summary

1. ✅ Use spring animations by default with Motion
2. ✅ Keep durations between 200-300ms for tweens
3. ✅ Use ease-out for entering elements
4. ✅ Animate only `opacity` and `transform` when possible
5. ✅ Respect `prefers-reduced-motion`
6. ✅ Set correct `transform-origin` for contextual animations
7. ❌ Avoid bouncy springs except for drag interactions
8. ❌ Don't use ease-in (makes UI feel slow)
9. ❌ Don't animate `left`, `top`, `width`, `height` (use transforms)
10. ❌ Don't animate blur values > 20px
