/**
 * MAIN.JS - GSAP Animations and Interactions
 * Handles:
 * - Navigation animations
 * - ScrollTrigger animations for all sections
 * - SplitText letter animations
 * - Timeline orchestrations
 * - Smooth scroll effects
 * - Performance optimizations
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
if (typeof SplitText !== 'undefined') {
    gsap.registerPlugin(SplitText);
}

// ========== CONFIGURATION & HELPERS ==========

const config = {
    ease: 'power3.out',
    stagger: 0.05,
    duration: 0.8
};

/**
 * Create animated text entrance
 */
function createTextEntrance(selector, staggerValue = 0.05) {
    const elements = document.querySelectorAll(selector);
    const timeline = gsap.timeline();

    elements.forEach((element, index) => {
        const split = new SplitText(element, { type: 'words, chars' });
        timeline.from(split.chars, {
            duration: 0.6,
            opacity: 0,
            y: 20,
            stagger: staggerValue,
            ease: config.ease
        }, 0.1 * index);
    });

    return timeline;
}

/**
 * Create slot machine text effect for hover
 */
function createSlotMachineEffect(element) {
    const text = element.textContent;
    let targetText = text;
    let currentIndex = 0;

    element.addEventListener('mouseenter', () => {
        const tl = gsap.timeline();
        const duration = 0.4;

        tl.to(element, {
            onUpdate: function () {
                const progress = this.progress();
                element.textContent = text.slice(0, Math.floor(text.length * progress)) +
                    targetText.slice(Math.floor(text.length * progress));
            },
            duration: duration,
            ease: config.ease
        });
    });
}

/**
 * Slot-machine character scramble on hover
 * Each character cycles through random glyphs before resolving L→R
 */
function charScramble(element) {
    const original = element.textContent.trim();
    const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    let interval = null;
    let iteration = 0;

    element.addEventListener('mouseenter', () => {
        clearInterval(interval);
        iteration = 0;
        interval = setInterval(() => {
            element.textContent = original
                .split('')
                .map((char, idx) => {
                    if (char === ' ') return ' ';
                    if (idx < Math.floor(iteration)) return original[idx];
                    return pool[Math.floor(Math.random() * pool.length)];
                })
                .join('');

            iteration += 0.45;
            if (iteration >= original.length) {
                clearInterval(interval);
                element.textContent = original;
            }
        }, 35);
    });

    element.addEventListener('mouseleave', () => {
        clearInterval(interval);
        element.textContent = original;
    });
}

/**
 * Create slot-machine text animation on hover
 * Creates smooth rolling text effect like a slot machine
 */
function createSlotMachineAnimation(element) {
    element.addEventListener('mouseenter', function () {
        gsap.to(element, {
            duration: 0.4,
            letterSpacing: '0.15em',
            scaleY: 1.1,
            ease: 'back.out'
        });
    });

    element.addEventListener('mouseleave', function () {
        gsap.to(element, {
            duration: 0.3,
            letterSpacing: 'normal',
            scaleY: 1,
            ease: config.ease
        });
    });
}

// ========== SECTION 1: NAVIGATION ==========

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar background on scroll - simple scroll listener
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hover animation for nav links — char scramble effect
    navLinks.forEach(link => {
        charScramble(link);
    });
}

// ========== SECTION 2: HERO SECTION ==========

function initHeroSection() {
    const heroWords = document.querySelectorAll('.hero-word');
    const heroSection = document.querySelector('.hero');

    // Initial entrance animation with enhanced split text effect
    const heroTl = gsap.timeline();

    if (typeof SplitText !== 'undefined') {
        heroWords.forEach((word, index) => {
            const split = new SplitText(word, { type: 'chars' });

            // Animate each character with staggered effect
            heroTl.from(split.chars, {
                duration: 0.6,
                opacity: 0,
                x: -30,
                rotationY: -90,
                transformOrigin: '0% 50%',
                stagger: 0.03,
                ease: 'back.out'
            }, 0.15 * index);
        });
    } else {
        // Fallback without SplitText - word-based animation
        heroTl.from(heroWords, {
            duration: 0.8,
            opacity: 0,
            x: -40,
            stagger: 0.1,
            ease: config.ease
        });
    }

    // Ensure hero words are visible after animation
    gsap.set(heroWords, { opacity: 1 });

    // Scroll animation - words move in different directions
    gsap.to('.hero-word:nth-child(1)', {
        y: -100,
        opacity: 0,
        x: -100,
        scrollTrigger: {
            trigger: heroSection,
            start: 'center center',
            end: 'bottom center',
            scrub: 1,
            markers: false
        }
    });

    gsap.to('.hero-word:nth-child(2)', {
        y: 100,
        opacity: 0,
        x: 100,
        scrollTrigger: {
            trigger: heroSection,
            start: 'center center',
            end: 'bottom center',
            scrub: 1
        }
    });

    gsap.to('.hero-word:nth-child(3)', {
        y: -50,
        opacity: 0,
        x: -80,
        scrollTrigger: {
            trigger: heroSection,
            start: 'center center',
            end: 'bottom center',
            scrub: 1
        }
    });

    // Sphere animation on scroll
    if (sphereController) {
        const sphere = sphereController.getSphere();
        gsap.to(sphere.position, {
            x: 2,
            scrollTrigger: {
                trigger: '.featured-work',
                start: 'top center',
                end: 'center center',
                scrub: 1
            }
        });
    }
}

// ========== SECTION 3: FEATURED WORK ==========

function initFeaturedWork() {
    const cards = document.querySelectorAll('.work-card');
    const container = document.querySelector('.featured-work');
    const fltLines = document.querySelectorAll('.flt-line');

    // Animate left-side text lines
    fltLines.forEach((line, i) => {
        gsap.to(line, {
            scrollTrigger: { trigger: container, start: 'top 70%' },
            opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: config.ease
        });
    });

    // Title animation
    const label = document.querySelector('.featured-label');
    if (typeof SplitText !== 'undefined') {
        const split = new SplitText(label.querySelector('h3'), { type: 'chars' });
        gsap.from(split.chars, {
            scrollTrigger: { trigger: container, start: 'top 80%' },
            duration: 0.6, opacity: 0, y: 20, stagger: 0.03, ease: config.ease
        });
    }

    // Cards entrance
    cards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: { trigger: container, start: 'top 70%' },
            duration: 0.8, opacity: 0, y: 50, delay: index * 0.1, ease: config.ease
        });
    });

    // Card hover
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            gsap.to(this, { duration: 0.3, scale: 1.04, ease: config.ease });
        });
        card.addEventListener('mouseleave', function () {
            gsap.to(this, { duration: 0.3, scale: 1, ease: config.ease });
        });
    });
}

// ========== SECTION 4: SPHERE GALLERY (see initSphereGallery below) ==========

// ========== SECTION 5: SCROLL TEXT ==========

function initScrollText() {
    const paragraph = document.querySelector('.scroll-paragraph');
    const section = document.querySelector('.scroll-text');
    if (!paragraph || !section) return;

    if (typeof SplitText !== 'undefined') {
        const split = new SplitText(paragraph, { type: 'words' });
        split.words.forEach((word, i) => {
            const dir = i % 2 === 0 ? -65 : 65;
            gsap.to(word, {
                y: dir, opacity: 0, duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'center center',
                    end: 'bottom center',
                    scrub: 1
                }
            });
        });
    } else {
        gsap.to(paragraph, {
            scrollTrigger: { trigger: section, start: 'center center', end: 'bottom center', scrub: 1 },
            y: -50, opacity: 0, duration: 1, ease: config.ease
        });
    }
}

// ========== SECTION 6: AWARDS TABLE ==========

function initAwardsTable() {
    const rows = document.querySelectorAll('.awards-table tr');
    const section = document.querySelector('.awards');

    rows.forEach((row, index) => {
        gsap.from(row, {
            scrollTrigger: {
                trigger: section,
                start: 'top 70%'
            },
            duration: 0.6,
            opacity: 0,
            x: -30,
            delay: index * 0.1,
            ease: config.ease
        });
    });
}

// ========== SECTION 7: GRADIENT CROSS ==========

function initGradientCross() {
    const cross = document.querySelector('.gradient-cross');
    const words = document.querySelectorAll('.cross-word');
    const section = document.querySelector('.gradient-cross-section');
    if (!cross || !section) return;

    // Sphere radius in px
    const spherePx = Math.min(0.62 * Math.min(window.innerWidth, window.innerHeight), 700) / 2;

    const crossTl = gsap.timeline({
        scrollTrigger: {
            trigger: section, start: 'top center', end: 'bottom bottom', scrub: 1
        }
    });
    crossTl
        .from(cross, { opacity: 0, scale: 0, duration: 0.5 }, 0)
        .to(cross, { opacity: 1, rotation: 360, scale: 2, duration: 1 })
        .to(cross, { scale: 20, rotation: 720, borderRadius: '100px', duration: 1 });

    // Words appear left-to-right when cross ≈ sphere size
    // cross starts 100px, reaches sphere at scale≈(spherePx/100).
    // That's roughly 22% through the cross animation → start text at scrub 0.22
    const wordsTl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top center',
            end: 'bottom bottom',
            scrub: 1
        }
    });

    words.forEach((word, i) => {
        const startAt = 0.22 + i * 0.1;
        wordsTl
            .fromTo(word,
                { opacity: 0, x: -80 },
                { opacity: 1, x: 0, duration: 0.18, ease: 'power2.out' },
                startAt
            )
            .to(word,
                { opacity: 0, y: i % 2 === 0 ? -50 : 50, duration: 0.12 },
                startAt + 0.28
            );
    });
}

// ========== SECTION 8: CONTACT SECTION ==========

function initContactSection() {
    const contactLines = document.querySelectorAll('.contact-line');
    const infoLinks = document.querySelectorAll('.info-link');
    const button = document.querySelector('#ctaBtn');
    const section = document.querySelector('.contact');

    // 4-line text fade in from below
    contactLines.forEach((line, i) => {
        gsap.to(line, {
            scrollTrigger: { trigger: section, start: 'top 65%' },
            opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: config.ease
        });
    });

    // Button
    if (button) {
        gsap.from(button, {
            scrollTrigger: { trigger: section, start: 'top 65%' },
            opacity: 0, scale: 0.85, delay: 0.35, duration: 0.7, ease: config.ease
        });
        button.addEventListener('mouseenter', () =>
            gsap.to(button, { scale: 1.08, boxShadow: '0 10px 30px rgba(0,212,255,0.3)', duration: 0.3, ease: config.ease }));
        button.addEventListener('mouseleave', () =>
            gsap.to(button, { scale: 1, boxShadow: 'none', duration: 0.3, ease: config.ease }));
    }

    // Studio/Services links: slot-machine scale effect
    infoLinks.forEach(link => {
        if (link.classList.contains('info-slot')) {
            // Char-scramble slot machine: each char cycles before resolving to hover text
            const orig = link.textContent.trim();
            const swapTo = (link.dataset.hover || orig).trim();
            const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
            let interval = null, iteration = 0, target = orig;

            const scrambleTo = (dest) => {
                clearInterval(interval);
                iteration = 0;
                interval = setInterval(() => {
                    link.textContent = dest
                        .split('')
                        .map((ch, idx) => {
                            if (ch === ' ' || ch === '@' || ch === '.') return ch;
                            if (idx < Math.floor(iteration)) return dest[idx];
                            return pool[Math.floor(Math.random() * pool.length)];
                        })
                        .join('');
                    iteration += 0.4;
                    if (iteration >= dest.length) {
                        clearInterval(interval);
                        link.textContent = dest;
                    }
                }, 35);
            };

            link.addEventListener('mouseenter', () => scrambleTo(swapTo));
            link.addEventListener('mouseleave', () => scrambleTo(orig));
        } else {
            // Same char-scramble as nav links
            charScramble(link);
        }
    });
}

// ========== SECTION 9: FOOTER ==========

function initFooter() {
    const logos = document.querySelectorAll('.footer-logo');
    const footer = document.querySelector('.footer');

    logos.forEach((logo, index) => {
        gsap.from(logo, {
            scrollTrigger: {
                trigger: footer,
                start: 'top 80%'
            },
            duration: 0.6,
            opacity: 0,
            y: 20,
            delay: index * 0.1,
            ease: config.ease
        });
    });

    // Hover effect on logos
    logos.forEach(logo => {
        logo.addEventListener('mouseenter', function () {
            gsap.to(this, {
                duration: 0.3,
                color: '#fff',
                y: -5,
                ease: config.ease
            });
        });

        logo.addEventListener('mouseleave', function () {
            gsap.to(this, {
                duration: 0.3,
                color: '#666',
                y: 0,
                ease: config.ease
            });
        });
    });
}

// ========== SPHERE JOURNEY (HERO → CENTER → LEFT) ==========

function initSphereParallax() {
    const sphereContainer = document.querySelector('.hero-sphere-container');
    if (!sphereContainer) return;

    // Hero: sphere slightly to the right
    gsap.set(sphereContainer, { x: '18vw' });

    // After cards section ends → sphere glides to center
    gsap.to(sphereContainer, {
        x: '0vw',
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: '.featured-work',
            start: 'bottom 85%',
            end: 'bottom 10%',
            scrub: 1.5
        }
    });
}

// ========== SPHERE GALLERY ==========

function initSphereGallery() {
    const gallerySection = document.querySelector('.sphere-gallery');
    if (!gallerySection) return;

    const sphereContainer = document.querySelector('.hero-sphere-container');
    const gallerySticky = document.querySelector('.gallery-sticky');
    const galleryImages = document.querySelectorAll('.gallery-img');

    // Sphere visual radius in px
    const sphereR = Math.min(0.62 * Math.min(window.innerWidth, window.innerHeight), 700) / 2;

    // 12 random end-positions (x, y) relative to sticky-container center
    // Negative y = above center, positive y = below center
    const endPos = [
        { x: -420, y: -sphereR * 0.6 }, { x: -240, y: -sphereR * 0.9 },
        { x: -60, y: -sphereR * 0.7 }, { x: 120, y: -sphereR * 0.85 },
        { x: 300, y: -sphereR * 0.55 }, { x: 450, y: -sphereR * 0.2 },
        { x: -460, y: sphereR * 0.3 }, { x: -280, y: sphereR * 0.6 },
        { x: -90, y: sphereR * 0.55 }, { x: 100, y: sphereR * 0.6 },
        { x: 290, y: sphereR * 0.45 }, { x: 455, y: sphereR * 0.3 }
    ];

    // Start pos: sphere bottom edge
    const startY = sphereR + 20;

    const tl = gsap.timeline();

    // ALL images animate together from sphere bottom, growing as they rise
    galleryImages.forEach((img, i) => {
        const { x, y } = endPos[i];
        tl.fromTo(img,
            { x: 0, y: startY, scale: 0.28, opacity: 0 },
            { x, y, scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
            0   // all start at the same time
        );
    });

    // Hold so user can see
    tl.to({}, { duration: 0.6 });

    // Fade out all
    tl.to(galleryImages, { opacity: 0, scale: 0.5, duration: 0.5, ease: 'power2.in' });

    // Sphere exits left
    tl.to(sphereContainer, { x: '-28vw', ease: 'power3.inOut', duration: 0.8 }, '<0.1');

    ScrollTrigger.create({
        trigger: gallerySection,
        start: 'top top',
        end: 'bottom top',
        pin: gallerySticky,
        scrub: 1.2,
        animation: tl
    });
}

// ========== SMOOTH SCROLL ENHANCEMENT ==========

function initSmoothScroll() {
    // Use native smooth scroll via CSS
    document.documentElement.style.scrollBehavior = 'smooth';

    // Optional: Enhanced scroll performance
    ScrollTrigger.normalizeScroll({
        allowNestedScroll: true
    });
}

// ========== INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sections
    initSmoothScroll();
    initNavigation();
    initSphereParallax();
    initHeroSection();
    initFeaturedWork();
    initSphereGallery();
    initScrollText();
    initAwardsTable();
    initGradientCross();
    initContactSection();
    initFooter();

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();

    // Refresh on window resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});

// ========== PERFORMANCE OPTIMIZATION ==========

// Reduce motion for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    gsap.globalTimeline.timeScale(0.5);
    document.documentElement.style.scrollBehavior = 'auto';
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf('*');
});
