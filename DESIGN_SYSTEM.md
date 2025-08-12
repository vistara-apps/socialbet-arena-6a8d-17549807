# SocialBet Arena Design System

## Overview

This design system provides a comprehensive set of components, styles, and guidelines for the SocialBet Arena application. It ensures consistency, accessibility, and maintainability across the entire user interface.

## Color Palette

### Primary Colors
- **Primary**: `hsl(204 94% 36%)` - Main brand color (blue)
- **Accent**: `hsl(10, 95%, 55%)` - Action color (red/orange)
- **Background**: `hsl(210 40% 98%)` - Main background
- **Surface**: `hsl(0 0% 100%)` - Card backgrounds

### Text Colors
- **Text**: `hsl(210 11% 15%)` - Primary text
- **Muted**: `hsl(210 9% 31%)` - Secondary text
- **Border**: `hsl(210 18% 87%)` - Borders and dividers

### Status Colors
- **Success**: `#10B981` (green-500)
- **Warning**: `#F59E0B` (yellow-500)
- **Error**: `#EF4444` (red-500)

## Typography

### Font Family
- **Primary**: Inter, system-ui, sans-serif
- **Fallback**: System fonts for optimal performance

### Text Scales
- **Display**: `text-4xl font-bold leading-tight` - Hero text
- **Heading**: `text-lg font-bold` - Section headings
- **Body**: `text-base font-medium leading-6` - Regular text
- **Caption**: `text-sm` - Secondary information
- **Small**: `text-xs` - Labels and metadata

## Spacing System

### Custom Spacing
- **sm**: `8px`
- **md**: `12px`
- **lg**: `20px`

### Standard Tailwind Spacing
- Uses Tailwind's default spacing scale (4px increments)

## Border Radius

### Custom Radius
- **sm**: `6px`
- **md**: `10px`
- **lg**: `16px`

## Shadows

### Card Shadow
```css
box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 
            0 4px 6px hsla(0, 0%, 0%, 0.1), 
            0 0 0 1px hsla(0, 0%, 0%, 0.03);
```

### Glow Effect
```css
box-shadow: 0 0 20px hsla(204, 94%, 36%, 0.3);
```

## Component Library

### Buttons

#### Primary Button
```tsx
<button className="btn-primary">
  Primary Action
</button>
```
- Used for main actions
- High contrast and prominence
- Includes focus states and active scaling

#### Secondary Button
```tsx
<button className="btn-secondary">
  Secondary Action
</button>
```
- Used for secondary actions
- Outlined style with primary color
- Maintains accessibility standards

#### Accent Button
```tsx
<button className="btn-accent">
  Accent Action
</button>
```
- Used for special actions (create, join)
- Eye-catching accent color
- Reserved for important CTAs

### Cards

#### Basic Card
```tsx
<div className="card">
  Card content
</div>
```

#### Interactive Card
```tsx
<div className="card-hover">
  Interactive card content
</div>
```
- Includes hover effects and focus states
- Subtle animations for better UX

### Form Elements

#### Input Field
```tsx
<input className="input-field" placeholder="Enter text..." />
```
- Consistent styling across all inputs
- Proper focus states and transitions
- Accessible color contrast

### Status Indicators

#### Active Status
```tsx
<div className="status-active">Active</div>
```

#### Warning Status
```tsx
<div className="status-warning">Warning</div>
```

#### Error Status
```tsx
<div className="status-error">Error</div>
```

## Animations

### Keyframe Animations

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Slide Up
```css
@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

#### Pulse Glow
```css
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px hsla(204, 94%, 36%, 0.3); }
  50% { box-shadow: 0 0 30px hsla(204, 94%, 36%, 0.5); }
}
```

### Animation Classes
- `animate-fade-in`: Quick fade in effect
- `animate-slide-up`: Slide up with fade
- `animate-pulse-glow`: Pulsing glow effect
- `animate-bounce-subtle`: Gentle bounce
- `animate-wiggle`: Subtle shake effect
- `animate-heartbeat`: Scaling pulse
- `animate-skeleton`: Loading shimmer

## Accessibility Guidelines

### Focus States
- All interactive elements have visible focus indicators
- Focus rings use primary color with appropriate opacity
- Keyboard navigation is fully supported

### Color Contrast
- All text meets WCAG AA standards (4.5:1 ratio minimum)
- Interactive elements maintain proper contrast
- Status colors are distinguishable for colorblind users

### Screen Reader Support
- Semantic HTML structure
- ARIA labels where appropriate
- Screen reader only text using `.sr-only` class

### Keyboard Navigation
- Tab order follows logical flow
- All interactive elements are keyboard accessible
- Focus visible indicators for keyboard users

## Component Patterns

### Trust Indicators
- Verification badges with different types (user, creator, expert)
- Reputation scores with color coding
- Social proof elements (participant avatars, trending indicators)

### Loading States
- Skeleton screens for content loading
- Spinner components in multiple sizes
- Progressive loading with staggered animations

### Empty States
- Engaging illustrations and clear messaging
- Actionable CTAs to guide user behavior
- Context-specific empty states for different scenarios

### Gamification Elements
- Achievement badges with rarity indicators
- Progress bars with smooth animations
- Streak counters with visual feedback
- Leaderboards with ranking indicators

## Usage Guidelines

### Do's
- Use consistent spacing throughout the application
- Maintain proper color contrast ratios
- Implement proper focus states for all interactive elements
- Use semantic HTML elements
- Follow the established animation timing and easing

### Don'ts
- Don't use colors outside the defined palette
- Don't create custom shadows that don't match the system
- Don't skip accessibility considerations
- Don't use animations that could trigger motion sensitivity
- Don't override focus styles without providing alternatives

## Mobile Considerations

### Touch Targets
- Minimum 44px touch targets for mobile
- Adequate spacing between interactive elements
- Gesture support where appropriate

### Responsive Design
- Mobile-first approach
- Container max-width: 576px (xl breakpoint)
- Flexible layouts that work across screen sizes

### Performance
- Optimized animations for mobile devices
- Efficient CSS with minimal repaints
- Progressive enhancement approach

## Implementation Notes

### CSS Architecture
- Uses Tailwind CSS utility classes
- Custom components defined in `@layer components`
- CSS custom properties for consistent theming

### Component Structure
- Reusable components with TypeScript interfaces
- Consistent prop naming conventions
- Proper error handling and fallbacks

### Testing Considerations
- Components should be testable in isolation
- Accessibility testing with screen readers
- Cross-browser compatibility testing
- Mobile device testing on various screen sizes

## Future Enhancements

### Planned Additions
- Dark mode support with CSS custom properties
- Additional animation presets
- Extended color palette for specialized use cases
- Component variants for different contexts

### Maintenance
- Regular accessibility audits
- Performance monitoring and optimization
- User feedback integration for UX improvements
- Design system documentation updates

---

This design system is a living document that evolves with the application. Regular reviews and updates ensure it continues to serve the needs of users and developers effectively.
