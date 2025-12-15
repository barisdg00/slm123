# Design Guidelines - Birthday Surprise Website

## Design Approach
**Custom Romantic Experience**: A personalized, emotion-driven interface inspired by Spotify Wrapped's storytelling flow, with dark romantic aesthetics and intimate photo presentations.

## Core Visual Identity

### Color Philosophy
- **Base**: Deep burgundy to black gradients (#5d0012 → #2b0008 → #000000)
- **Accents**: Soft pinks and rose tones (#ffdcdc, #ff8fb1, #ffccd1)
- **Page-specific gradients**: Each person gets subtle gradient variation for uniqueness
- **Glow effects**: Soft pink/red glows for emphasis (rgba(255,80,120,0.08))

### Typography System
- **Primary Font**: Poppins (modern, friendly, legible)
- **Name Cards**: 20-24px, semibold, letter-spacing 0.6px
- **Messages**: 18-20px, line-height 1.45
- **Welcome Text**: Large display size (scale appropriately for mobile)

## Layout Architecture

### Spacing Primitives
Use Tailwind units: **4, 8, 12, 16, 20, 24, 32** (p-4, m-8, py-20, etc.)
- Consistent padding: 20-32px on sections
- Photo margins: 16-24px between elements
- Button positioning: 28px from edges

### Page Structure (Portrait Photos)
```
[Name Card - 60-80px height, full width of photo]
[Vertical Photo - 320x420px desktop / 260x340px mobile]
[Message Box - 78% width, max 820px]
[Continue Button - Fixed bottom-right]
```

## Component Library

### Loading Screen
- Centered animated heart logo (pulsing/breathing)
- Progress message: "Sürprizin Hazırlanıyor..."
- Subtle progress indicator
- Same dark gradient background
- Auto-transition when assets loaded

### Name Cards (Above Photos)
- **Placement**: Directly above photo-box, slight overlap (-10px margin)
- **Design**: Frosted glass effect (rgba backdrop blur)
- **Content**: Person name, subtle decorative element (small hearts/stars)
- **Animation**: Slide down and fade in (0.6s delay after photo)
- **Dimensions**: Match photo width, 60-80px height

### Photo Containers
- **Aspect**: Vertical portrait (4:5 ratio)
- **Border**: 18px radius, subtle inner glow
- **Shadow**: Multi-layer: dark outer + colored inner
- **Background**: Frosted gradient overlay
- **Special (6th person)**: Enhanced glow (rgba(255,40,90,0.12))

### Message Boxes
- **Width**: 78% of viewport, max 820px
- **Text color**: Light rose (#ffdcdc for names, white for messages)
- **Typewriter cursor**: 2px vertical line, blinking animation
- **Highlight words**: Use pink accent for key phrases
- **Min-height**: 72px to prevent layout shift

### Navigation Button
- **Position**: Fixed bottom-right (28px from edges)
- **Style**: Skewed (-10deg), dark burgundy (#5a0014)
- **Animation**: Breathing effect (subtle scale pulse 1.0 → 1.03)
- **Hover**: Scale to 1.06
- **First page only**: Hidden music trigger integrated

### Final Page Circle
- **Layout**: 6 photos in orbital arrangement (60° intervals)
- **Center**: Optional central image (160x160px circle)
- **Orbit radius**: 200px from center
- **Animation**: Slow rotation (14s infinite)
- **Mobile**: Scale down to 360px container, smaller photos

## Animation Strategy (GPU-Optimized)

### Performance Rules
- Use only `transform` and `opacity` for animations
- Apply `will-change: transform` to animated elements
- Remove animations after completion
- Reduce particle density by 40% on mobile

### Key Animations
1. **Photo entry**: translateX + scale + opacity (0.9s)
2. **Name card**: slideDown + fadeIn (0.6s, delayed)
3. **Typewriter**: Character-by-character with cursor blink
4. **Button breathing**: Scale pulse (3s infinite)
5. **Particles**: Heart/star fall (6-12s duration)

### Particle System
- **Hearts**: 1 every 850ms, varying sizes (14-44px)
- **Stars**: 1 every 250ms, tiny (2-4px)
- **Mobile reduction**: 60% of desktop particle count
- **Opacity**: 0.18 for background, 0.8-1.0 for emphasis
- **Blur**: Subtle drop-shadow glow effect

## Audio Integration

### Music System
- **Per-page audio**: Each person has dedicated track
- **Transitions**: 0.8s fade out → 0.5s fade in
- **Volume**: Default 0.5 (50%)
- **First interaction**: Hidden audio unlock on first "Devam Et" click
- **Samsung optimization**: Auto-play with user gesture, fullscreen API trigger

### Audio UX
- Stop previous track completely before next
- Smooth crossfade between pages
- No visible audio controls (seamless background)

## Mobile Optimization (Samsung Focus)

### Viewport Strategy
- Full-screen sections (100vh)
- Lock orientation hints (portrait preferred)
- Touch-optimized hit areas (minimum 44px)
- Prevent zoom: `user-scalable=no`

### Performance
- Lazy load images (only current + next page)
- Simplified particle count
- Hardware-accelerated transforms
- Debounced scroll/touch handlers

### Samsung-Specific
- Fullscreen API for immersive mode
- Vibration feedback on page transitions
- Internet Browser audio unlock pattern
- Touch gesture support (shake detection for easter egg)

## Accessibility Notes
- High contrast maintained (light text on dark)
- Large touch targets for buttons
- Readable font sizes (minimum 18px)
- Clear visual hierarchy

## Images
**Hero/Welcome Page**: No large hero image - text-focused greeting
**Person Pages**: 6 individual portrait photos (4:5 ratio, high quality JPGs)
**Final Page**: Central photo + 6 orbital photos (same as person pages)
**Name Cards**: Optional decorative SVG elements (hearts, stars) - lightweight

This design balances emotional impact with performance, creating an intimate, memorable experience optimized for mobile viewing on Samsung devices.