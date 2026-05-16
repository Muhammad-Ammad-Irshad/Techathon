# 🖼️ Card Images - Quick Reference

## Image Files Required

Create these image files in `assets/images/` folder:

### Aurora Project (Blue #1a4d7a)
```
✓ aurora-mobile-320w.jpg      (320 × 280px)
✓ aurora-tablet-400w.jpg      (400 × 350px)
✓ aurora-desktop-600w.jpg     (600 × 560px)
✓ aurora-desktop-1200w.jpg    (1200 × 1120px) [Retina 2x]
```

### Nexus Interface (Purple #7a1a4d)
```
✓ nexus-mobile-320w.jpg       (320 × 280px)
✓ nexus-tablet-400w.jpg       (400 × 350px)
✓ nexus-desktop-600w.jpg      (600 × 560px)
✓ nexus-desktop-1200w.jpg     (1200 × 1120px) [Retina 2x]
```

### Lumina Studios (Green #4d7a1a)
```
✓ lumina-mobile-320w.jpg      (320 × 280px)
✓ lumina-tablet-400w.jpg      (400 × 350px)
✓ lumina-desktop-600w.jpg     (600 × 560px)
✓ lumina-desktop-1200w.jpg    (1200 × 1120px) [Retina 2x]
```

### Prism Digital (Dark Purple #4d1a7a)
```
✓ prism-mobile-320w.jpg       (320 × 280px)
✓ prism-tablet-400w.jpg       (400 × 350px)
✓ prism-desktop-600w.jpg      (600 × 560px)
✓ prism-desktop-1200w.jpg     (1200 × 1120px) [Retina 2x]
```

---

## Total Files Needed: 16 images

- 4 cards × 4 sizes = 16 JPG files

---

## Responsive Behavior

| Breakpoint | Device | Image Size | Width Setting |
|-----------|--------|-----------|---|
| < 480px | Mobile | 320×280px | `srcset="...320w"` |
| 481-1023px | Tablet | 400×350px | `srcset="...400w"` |
| ≥ 1024px (1x) | Desktop | 600×560px | `srcset="...1x"` |
| ≥ 1024px (2x) | Retina | 1200×1120px | `srcset="...2x"` |

---

## File Size Guidelines

```
Mobile (320w):   40-60 KB per image
Tablet (400w):   60-90 KB per image
Desktop (600w):  100-150 KB per image
Retina (1200w):  200-300 KB per image
```

**Total estimated size:** ~2-3 MB (all 16 images combined)

---

## Aspect Ratio

All images: **1.07:1** (slightly wider than square)
- Width/Height ratio = 1.07

---

## Directory Structure

```
Techathon site/
└── assets/
    └── images/
        ├── aurora-mobile-320w.jpg
        ├── aurora-tablet-400w.jpg
        ├── aurora-desktop-600w.jpg
        ├── aurora-desktop-1200w.jpg
        ├── nexus-mobile-320w.jpg
        ├── nexus-tablet-400w.jpg
        ├── nexus-desktop-600w.jpg
        ├── nexus-desktop-1200w.jpg
        ├── lumina-mobile-320w.jpg
        ├── lumina-tablet-400w.jpg
        ├── lumina-desktop-600w.jpg
        ├── lumina-desktop-1200w.jpg
        ├── prism-mobile-320w.jpg
        ├── prism-tablet-400w.jpg
        ├── prism-desktop-600w.jpg
        └── prism-desktop-1200w.jpg
```

---

## How to Add Images

1. **Create folder:** `assets/images/` (if not exists)
2. **Prepare images:**
   - 320×280px, 400×350px, 600×560px, 1200×1120px for each card
   - Save as JPG with 85% quality for best compression
3. **Name files** exactly as specified above
4. **Place in folder** and you're done!

The HTML and CSS are already configured to use these images automatically.

---

## Color References for Design

Use these colors as inspiration when creating or selecting images:

| Card | Project | Primary Color | Secondary Color |
|------|---------|--------------|-----------------|
| 1 | Aurora | `#1a4d7a` (Blue) | `#00d4ff` (Cyan) |
| 2 | Nexus | `#7a1a4d` (Purple) | `#ff006e` (Pink) |
| 3 | Lumina | `#4d7a1a` (Green) | `#00ff88` (Lime) |
| 4 | Prism | `#4d1a7a` (Dark Purple) | `#00d4ff` (Cyan) |

---

## Notes

- Images will **lazy load** automatically on page load
- Images use **async decoding** for better performance
- Responsive images automatically adjust based on device/screen size
- **No manual configuration needed** - just add images to `assets/images/`
