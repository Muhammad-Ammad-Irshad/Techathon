# 📸 Card Images - Size Compatibility & Reference Guide

## Overview
This guide provides all the image specifications for the responsive work cards featured in the Techathon site section. Images are optimized for multiple breakpoints with proper responsive sizing.

---

## 🎯 Image Breakpoints & Sizes

### Breakpoint Strategy
| Device | Breakpoint | Card Width | Image Dimensions | File Size Target |
|--------|-----------|-----------|------------------|-----------------|
| **Mobile** | ≤ 480px | ~90vw (320px) | 320×280px | 40-60 KB |
| **Tablet** | 481-1023px | 50vw (400px) | 400×350px | 60-90 KB |
| **Desktop** | ≥ 1024px | ~600px | 600×560px (1x) | 100-150 KB |
| **Retina 2x** | ≥ 1024px | ~600px | 1200×1120px (2x) | 200-300 KB |

---

## 📱 Card Image Specifications

### Card 1: Aurora Project
**Project Type:** Interactive 3D Experience
**Color Theme:** Blue (#1a4d7a)

**File Structure:**
```
assets/images/aurora-mobile-320w.jpg         (320×280px, ~50 KB)
assets/images/aurora-tablet-400w.jpg         (400×350px, ~75 KB)
assets/images/aurora-desktop-600w.jpg        (600×560px, ~130 KB)
assets/images/aurora-desktop-1200w.jpg       (1200×1120px, ~250 KB)
```

**Image Attributes:**
- Alt text: "Aurora Project - Interactive 3D Experience"
- Card ID: `aurora`
- Format: JPG (optimized) or WebP (optional)
- Aspect Ratio: 1.07:1 (slightly wider than square)

---

### Card 2: Nexus Interface
**Project Type:** Motion Design & UI Components
**Color Theme:** Purple (#7a1a4d)

**File Structure:**
```
assets/images/nexus-mobile-320w.jpg          (320×280px, ~50 KB)
assets/images/nexus-tablet-400w.jpg          (400×350px, ~75 KB)
assets/images/nexus-desktop-600w.jpg         (600×560px, ~130 KB)
assets/images/nexus-desktop-1200w.jpg        (1200×1120px, ~250 KB)
```

**Image Attributes:**
- Alt text: "Nexus Interface - Motion Design & UI Components"
- Card ID: `nexus`
- Format: JPG (optimized) or WebP (optional)
- Aspect Ratio: 1.07:1

---

### Card 3: Lumina Studios
**Project Type:** Branding & Digital Transformation
**Color Theme:** Green (#4d7a1a)

**File Structure:**
```
assets/images/lumina-mobile-320w.jpg         (320×280px, ~50 KB)
assets/images/lumina-tablet-400w.jpg         (400×350px, ~75 KB)
assets/images/lumina-desktop-600w.jpg        (600×560px, ~130 KB)
assets/images/lumina-desktop-1200w.jpg       (1200×1120px, ~250 KB)
```

**Image Attributes:**
- Alt text: "Lumina Studios - Branding & Digital Transformation"
- Card ID: `lumina`
- Format: JPG (optimized) or WebP (optional)
- Aspect Ratio: 1.07:1

---

### Card 4: Prism Digital
**Project Type:** Web Experience & Visual Storytelling
**Color Theme:** Dark Purple (#4d1a7a)

**File Structure:**
```
assets/images/prism-mobile-320w.jpg          (320×280px, ~50 KB)
assets/images/prism-tablet-400w.jpg          (400×350px, ~75 KB)
assets/images/prism-desktop-600w.jpg         (600×560px, ~130 KB)
assets/images/prism-desktop-1200w.jpg        (1200×1120px, ~250 KB)
```

**Image Attributes:**
- Alt text: "Prism Digital - Web Experience & Visual Storytelling"
- Card ID: `prism`
- Format: JPG (optimized) or WebP (optional)
- Aspect Ratio: 1.07:1

---

## 🔧 HTML Implementation Details

### Picture Element Structure
Each card uses the HTML `<picture>` element with:

```html
<picture class="card-picture">
    <!-- Mobile breakpoint -->
    <source media="(max-width: 480px)" 
            srcset="assets/images/[name]-mobile-320w.jpg 320w"
            data-size="320x280">
    
    <!-- Tablet breakpoint -->
    <source media="(max-width: 768px)" 
            srcset="assets/images/[name]-tablet-400w.jpg 400w"
            data-size="400x350">
    
    <!-- Desktop & 2x Retina -->
    <source media="(min-width: 1024px)" 
            srcset="assets/images/[name]-desktop-600w.jpg 1x, 
                    assets/images/[name]-desktop-1200w.jpg 2x"
            data-size="600x560">
    
    <!-- Fallback -->
    <img src="assets/images/[name]-desktop-600w.jpg" 
         alt="[Card Description]"
         class="card-image"
         loading="lazy"
         decoding="async"
         data-card-id="[card-id]"
         data-sizes="320w (mobile) | 400w (tablet) | 600w (desktop) | 1200w (2x desktop)">
</picture>
```

---

## 📐 CSS Styling Recommendations

### Picture Element Styling
```css
.card-picture {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.work-card:hover .card-image {
    transform: scale(1.05);
}
```

---

## 🖼️ Image Format Recommendations

### JPG (Primary Format)
- **Pros:** Universal compatibility, better compression for photos
- **Quality:** 85-90% for desktop, 80-85% for mobile
- **Progressive:** Enable progressive encoding for better perceived load times

### WebP (Optional - Advanced)
For even better compression with modern browsers:
```html
<source type="image/webp" media="(max-width: 480px)" 
        srcset="assets/images/[name]-mobile-320w.webp 320w">
```

---

## 📊 Performance Guidelines

### Load Time Targets
- Mobile: < 100ms
- Tablet: < 150ms
- Desktop: < 200ms

### Optimization Checklist
- ✅ Use JPEG compression with quality 80-90%
- ✅ Enable lazy loading (native `loading="lazy"`)
- ✅ Use async decoding (`decoding="async"`)
- ✅ Optimize for each breakpoint separately
- ✅ Consider using modern formats (WebP, AVIF)
- ✅ Add descriptive alt text for accessibility
- ✅ Test on real devices across breakpoints

---

## 📋 Directory Structure

```
Techathon site/
├── assets/
│   └── images/
│       ├── aurora/
│       │   ├── aurora-mobile-320w.jpg
│       │   ├── aurora-tablet-400w.jpg
│       │   ├── aurora-desktop-600w.jpg
│       │   └── aurora-desktop-1200w.jpg
│       ├── nexus/
│       │   ├── nexus-mobile-320w.jpg
│       │   ├── nexus-tablet-400w.jpg
│       │   ├── nexus-desktop-600w.jpg
│       │   └── nexus-desktop-1200w.jpg
│       ├── lumina/
│       │   ├── lumina-mobile-320w.jpg
│       │   ├── lumina-tablet-400w.jpg
│       │   ├── lumina-desktop-600w.jpg
│       │   └── lumina-desktop-1200w.jpg
│       └── prism/
│           ├── prism-mobile-320w.jpg
│           ├── prism-tablet-400w.jpg
│           ├── prism-desktop-600w.jpg
│           └── prism-desktop-1200w.jpg
```

**OR** (Flat Structure):
```
assets/images/
├── aurora-mobile-320w.jpg
├── aurora-tablet-400w.jpg
├── aurora-desktop-600w.jpg
├── aurora-desktop-1200w.jpg
├── nexus-mobile-320w.jpg
├── nexus-tablet-400w.jpg
├── nexus-desktop-600w.jpg
├── nexus-desktop-1200w.jpg
... (and so on for lumina and prism)
```

---

## 🎨 Color Theme References

Each card corresponds to a specific project color theme:

| Card | Project Name | Primary Color | Secondary Color |
|------|-------------|---------------|-----------------|
| 1 | Aurora | Blue (#1a4d7a) | Cyan (#00d4ff) |
| 2 | Nexus | Purple (#7a1a4d) | Pink (#ff006e) |
| 3 | Lumina | Green (#4d7a1a) | Lime (#00ff88) |
| 4 | Prism | Dark Purple (#4d1a7a) | Cyan (#00d4ff) |

Use these colors as design inspiration when creating or sourcing images.

---

## 🔄 Responsive Behavior

### Media Query Breakpoints
```
Mobile:   max-width: 480px      → 320×280px image
Tablet:   481px - 1023px        → 400×350px image
Desktop:  1024px and above       → 600×560px image (1x)
Retina:   1024px and above (2x)  → 1200×1120px image (2x)
```

### Loading Strategy
- **Lazy Loading:** Enabled via `loading="lazy"` attribute
- **Async Decoding:** Enabled via `decoding="async"` attribute
- **Progressive Rendering:** Images render as they download

---

## ✅ Quick Checklist for Adding Images

1. Create image files following the naming convention
2. Place images in `assets/images/` directory
3. Ensure correct dimensions for each breakpoint
4. Optimize file sizes (JPG quality 80-90%)
5. Test on multiple devices/breakpoints
6. Verify alt text accuracy
7. Check lazy loading functionality
8. Monitor performance metrics

---

## 📞 Support

For questions or issues with image sizing:
- Refer to [FILE-STRUCTURE.md](FILE-STRUCTURE.md) for project overview
- Check [CUSTOMIZATION.md](CUSTOMIZATION.md) for advanced options
- Review [README.md](README.md) for general documentation
