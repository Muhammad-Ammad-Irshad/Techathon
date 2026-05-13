# 🎨 Customization & Configuration Guide

This guide covers advanced customization options for the portfolio website.

## 📝 Table of Contents
1. [Color Customization](#color-customization)
2. [Animation Tweaking](#animation-tweaking)
3. [Typography Changes](#typography-changes)
4. [Shader Modifications](#shader-modifications)
5. [Performance Tuning](#performance-tuning)
6. [Adding New Sections](#adding-new-sections)

---

## 🎨 Color Customization

### Global Color Variables
Create CSS custom properties for easy theme switching:

```css
:root {
    --color-bg: #000;
    --color-primary: #ff006e;
    --color-secondary: #00d4ff;
    --color-tertiary: #00ff88;
    --color-text: #ffffff;
    --color-muted: #999999;
}
```

### Update references in CSS:
```css
body {
    background-color: var(--color-bg);
    color: var(--color-text);
}

.nav-link::after {
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
}
```

### Dark Mode Toggle (Optional)
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const isDark = localStorage.getItem('darkMode') !== 'false';
    
    if (!isDark) {
        document.documentElement.style.setProperty('--color-bg', '#f5f5f5');
        document.documentElement.style.setProperty('--color-text', '#000');
    }
});
```

---

## ⚡ Animation Tweaking

### Duration Adjustments
**Slow down all animations:**
```javascript
// In main.js
const config = {
    ease: 'power3.out',
    stagger: 0.05,
    duration: 1.2  // Increased from 0.8
};
```

### Easing Functions
Available GSAP easing options:
```javascript
// Power easing (Recommended)
'power1.out', 'power2.out', 'power3.out', 'power4.out'

// Bounce/Spring effects
'bounce.out', 'elastic.out'

// Back easing
'back.out', 'back.inOut'

// Custom cubic bezier
'cubic-bezier(0.17, 0.67, 0.83, 0.67)'
```

### Scroll Trigger Customization
```javascript
// Fast trigger
scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',    // Triggers earlier
    end: 'center center'
}

// Slow trigger
scrollTrigger: {
    trigger: '.section',
    start: 'top 20%',    // Triggers later
    end: 'bottom -50%',  // Longer animation duration
    scrub: 2            // Smoother scrub (1-3 recommended)
}
```

### Stagger Effects
```javascript
// Reverse stagger
gsap.to('.element', {
    stagger: {
        amount: 0.5,
        from: 'end',    // Start from last element
        grid: 'auto'    // Auto grid detection
    }
})

// Custom stagger function
gsap.to('.element', {
    stagger: (index) => index * 0.1,  // Custom delay per element
    delay: (index) => index * 0.05
})
```

---

## 🔤 Typography Changes

### Font Families
```css
/* Modern minimal */
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

/* Elegant serif */
font-family: 'Playfair Display', 'Georgia', serif;

/* Geometric sans-serif */
font-family: 'Poppins', 'Inter', sans-serif;

/* Monospace */
font-family: 'Roboto Mono', monospace;
```

### Font Loading (Google Fonts)
```html
<!-- Add to <head> in index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
```

### Text Effects
```css
/* Gradient text */
background: linear-gradient(135deg, #ff006e, #00d4ff);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

/* Text shadow for depth */
text-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

/* Text outline */
-webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
```

---

## 🎮 Shader Modifications

### Sphere Shader Customization
In `js/sphere.js`, modify the fragment shader:

### Change Gradient Colors
```glsl
// Current colors
vec3 color1 = vec3(1.0, 0.0, 0.439);      // Red-Pink
vec3 color2 = vec3(0.0, 0.831, 1.0);      // Cyan
vec3 color3 = vec3(0.0, 1.0, 0.533);      // Green

// Example: Sunset theme
vec3 color1 = vec3(1.0, 0.5, 0.0);        // Orange
vec3 color2 = vec3(1.0, 0.2, 0.0);        // Red
vec3 color3 = vec3(0.8, 0.4, 0.0);        // Dark Orange

// Example: Ocean theme
vec3 color1 = vec3(0.0, 0.5, 1.0);        // Light Blue
vec3 color2 = vec3(0.0, 0.2, 0.8);        // Dark Blue
vec3 color3 = vec3(0.2, 0.8, 1.0);        // Cyan
```

### Increase Animation Speed
```glsl
// In vertex shader
// Increase multipliers for faster animation
pos.y += sin(time * 1.0 + position.x * 3.0) * 0.1;  // 0.5 → 1.0
pos.x += cos(time * 0.8 + position.y * 2.5) * 0.08; // 0.4 → 0.8
```

### Add More Complex Patterns
```glsl
// Add in fragment shader for more shimmer
float pattern = sin(vPosition.x * 8.0) * cos(vPosition.y * 8.0);
col += pattern * 0.15;

// Add turbulence
float turbulence = sin(vPosition.x * time * 0.1) + sin(vPosition.y * time * 0.15);
col += turbulence * 0.1;
```

### Glow Effect
```glsl
// Enhance glow in fragment shader
float glow = pow(1.0 - abs(dot(viewDir, normal)), 3.0);
col += glow * vec3(1.0, 0.5, 1.0) * 0.5;  // Pink glow
```

---

## ⚙️ Performance Tuning

### Reduce Geometry Detail
In `sphere.js`:
```javascript
// Reduce complexity (from 64 to 32)
const geometry = new THREE.IcosahedronGeometry(1, 32);

// For better performance on mobile
const geometry = new THREE.IcosahedronGeometry(1, 16);
```

### Optimize Renderer
```javascript
// Current settings
this.renderer = new THREE.WebGLRenderer({
    canvas: this.canvas,
    antialias: true,
    alpha: true,
    precision: 'highp',
    powerPreference: 'high-performance'
});

// Mobile-optimized
this.renderer = new THREE.WebGLRenderer({
    canvas: this.canvas,
    antialias: false,  // Disable for better performance
    alpha: true,
    precision: 'mediump',
    powerPreference: 'low-power'
});
```

### Disable Animations on Low-End Devices
```javascript
// Detect performance
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const isSlowDevice = navigator.deviceMemory < 4;

if (mediaQuery.matches || isSlowDevice) {
    gsap.globalTimeline.timeScale(0.3);  // Slow down
    // Or disable certain animations
}
```

### Image Optimization
```html
<!-- Use modern formats with fallback -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="Description">
</picture>

<!-- Lazy loading -->
<img src="image.jpg" alt="Description" loading="lazy">
```

---

## 🆕 Adding New Sections

### HTML Structure
```html
<!-- Add new section -->
<section class="new-section" id="new">
    <div class="new-content">
        <h2>New Section</h2>
        <p>Your content here</p>
    </div>
</section>
```

### CSS Styling
```css
.new-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 120px 60px;
}

.new-content {
    max-width: 1200px;
    width: 100%;
}
```

### Animation in JavaScript
```javascript
function initNewSection() {
    const section = document.querySelector('.new-section');
    const elements = document.querySelectorAll('.new-content h2');

    gsap.from(elements, {
        scrollTrigger: {
            trigger: section,
            start: 'top 60%'
        },
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: config.ease
    });
}

// Call in main initialization
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    initNewSection();
    ScrollTrigger.refresh();
});
```

---

## 🎯 Advanced Techniques

### Parallax Effect
```javascript
gsap.to('.element', {
    scrollTrigger: {
        trigger: '.section',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    },
    y: -100,
    ease: 'none'
});
```

### Morphing Shapes
```javascript
// Using SVG with GSAP
gsap.to('path', {
    attr: { d: newPathData },
    duration: 1,
    ease: config.ease
});
```

### Split Text Advanced
```javascript
const split = new SplitText(element, {
    type: 'words, chars, lines'
});

// Animate each separately
gsap.to(split.words, { opacity: 0.5 });
gsap.to(split.chars, { rotation: () => Math.random() * 360 });
gsap.to(split.lines, { y: 100 });
```

### Scroll-Linked Playback
```javascript
const animation = gsap.to('.element', {
    x: 500,
    paused: true
});

ScrollTrigger.create({
    trigger: '.section',
    start: 'top center',
    end: 'bottom center',
    onUpdate: (self) => {
        animation.progress(self.progress);
    }
});
```

---

## 🐛 Debugging Tips

### Enable GSAP DevTools
```javascript
// In main.js, add at the top
gsap.config({ traceVars: true });
```

### Visualize Scroll Triggers
```javascript
// Add this to see all trigger points
ScrollTrigger.create({
    markers: true  // Shows timeline markers
});
```

### Performance Monitoring
```javascript
// Log animation performance
let frameCount = 0;
let startTime = performance.now();

gsap.ticker.add(() => {
    frameCount++;
    if (performance.now() - startTime > 1000) {
        console.log(`FPS: ${frameCount}`);
        frameCount = 0;
        startTime = performance.now();
    }
});
```

---

## 📚 Resources for Further Learning

- [GSAP Animation Library](https://gsap.com/)
- [Three.js Documentation](https://threejs.org/docs/)
- [WebGL Shaders](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)
- [CSS Tricks](https://css-tricks.com/)
- [Web.dev Performance](https://web.dev/performance/)

---

**Happy customizing! 🎨**
