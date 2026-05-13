# 🚀 Quick Start Guide

## Step 1: Open the Project

### Option A: VS Code with Live Server
1. Open VS Code
2. Open the `portfolio-site` folder: `File > Open Folder > D:\portfolio-site`
3. Install Live Server extension (if not already installed)
4. Right-click on `index.html` → "Open with Live Server"
5. Your browser will open at `http://localhost:5500`

### Option B: Direct Browser
1. Navigate to `D:\portfolio-site`
2. Double-click `index.html`
3. Opens in your default browser

## Step 2: Explore the Website

### Sections to Navigate
- **Hero**: Full-screen 3D sphere with animated text
- **Featured Work**: Project cards with hover effects
- **Dynamic Images**: Scrolling image animations
- **Awards**: Recognition table
- **Contact**: Call-to-action section
- **Footer**: Company branding

## Step 3: Try the Interactions

### Mouse Interactions
- ✨ Hover over navigation buttons - smooth underline animation
- 🔄 Move mouse over the 3D sphere - ripple effect follows cursor
- 🎯 Hover on work cards - description fades in
- 🎨 Scroll down page - watch the animations trigger

### Scroll Effects
- 📜 Scroll to see text move in different directions
- 🌀 Gradient cross rotates and grows
- 🎭 Words animate up and down
- 🖼️ Images scale and fade

## Step 4: Customize Your Content

### Edit Text
1. Open `index.html` in a text editor
2. Find the section you want to modify
3. Replace placeholder text with your content

Example:
```html
<h1 class="hero-heading">
    <span class="hero-word">Your Text</span>
    <span class="hero-word">Here</span>
    <span class="hero-word">Now</span>
</h1>
```

### Edit Colors
1. Open `css/style.css`
2. Search for color values
3. Replace with your preferred colors

Example:
```css
background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR2 50%, #YOUR_COLOR3 100%);
```

### Add Your Images
1. Place images in the `assets/` folder
2. Update image paths in `index.html`

Example:
```html
<img src="assets/your-image.jpg" alt="Description">
```

## Step 5: Advanced Customization

### Modify Animation Speed
In `js/main.js`:
```javascript
const config = {
    ease: 'power3.out',    // Change easing
    stagger: 0.05,         // Change stagger delay
    duration: 0.8          // Change animation duration
};
```

### Adjust Sphere Colors
In `js/sphere.js`, find the shader material:
```javascript
vec3 color1 = vec3(1.0, 0.0, 0.439); // Red-Pink - Change these
vec3 color2 = vec3(0.0, 0.831, 1.0); // Cyan
vec3 color3 = vec3(0.0, 1.0, 0.533); // Green
```

### Change Animation Triggers
Modify ScrollTrigger start points in `main.js`:
```javascript
scrollTrigger: {
    trigger: selector,
    start: 'top 80%',    // Change when animation starts
    end: 'bottom center' // Change when animation ends
}
```

## Troubleshooting

### Sphere doesn't show
- ✅ Check browser console (F12 → Console tab)
- ✅ Ensure JavaScript is enabled
- ✅ Try a different browser
- ✅ Clear cache: Ctrl+Shift+Delete

### Animations are choppy
- ✅ Close other tabs/apps
- ✅ Check GPU acceleration (Settings)
- ✅ Update graphics drivers
- ✅ Try a different browser

### CDN libraries not loading
- ✅ Check internet connection
- ✅ Check browser console for errors
- ✅ Disable ad blockers temporarily
- ✅ Try incognito mode

## File Structure Reference

```
portfolio-site/
├── index.html          ← HTML content
├── css/
│   └── style.css       ← All styling
├── js/
│   ├── main.js         ← Animations
│   └── sphere.js       ← 3D sphere
├── assets/             ← Your images here
└── README.md          ← Full documentation
```

## Next Steps

1. **Customize colors** to match your brand
2. **Update text** with your portfolio information
3. **Add your images** to the assets folder
4. **Modify animations** to your preference
5. **Deploy** to a hosting service

## Deployment Options

### Netlify (Recommended)
1. Go to netlify.com
2. Sign up with GitHub
3. Drag and drop `portfolio-site` folder
4. Done! Your site is live

### GitHub Pages
1. Create a GitHub repository
2. Push the files
3. Enable GitHub Pages in settings
4. Your site is live at `username.github.io/repo-name`

### Other Options
- **Vercel**: Connect Git repository
- **AWS S3**: Upload files and enable static hosting
- **Firebase Hosting**: Deploy with Firebase CLI

## Performance Checklist

- ✅ Optimize images before adding
- ✅ Minimize custom code
- ✅ Keep dependencies updated
- ✅ Test on mobile devices
- ✅ Check browser compatibility

## Need Help?

1. Check the README.md for detailed documentation
2. Review the code comments in HTML, CSS, and JS files
3. Use browser DevTools (F12) to inspect elements
4. Check Three.js and GSAP documentation
5. Look for similar examples online

## Pro Tips

🎨 **Design**
- Keep the dark theme for premium feel
- Use accent colors sparingly
- Maintain whitespace

⚡ **Performance**
- Test on real devices
- Monitor FPS with DevTools
- Optimize images

🎯 **UX**
- Smooth transitions between sections
- Clear navigation
- Fast load times

---

**Happy designing! 🚀**

For more details, see [README.md](README.md)
