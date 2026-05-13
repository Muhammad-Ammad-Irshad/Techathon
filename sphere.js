/**
 * SPHERE.JS - Three.js Fluid Animated Sphere
 * Features:
 * - Multi-octave GLSL noise for liquid/fluid surface
 * - Mouse hover activates intense fluid flow
 * - Sphere radius stays constant (noise balanced around origin)
 * - Smooth fluid intensity easing
 */

class SphereController {
    constructor() {
        this.canvas = document.getElementById('sphereCanvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.sphere = null;
        this.material = null;
        this.animationId = null;

        // Mouse state
        this.mouseNorm = { x: 0.5, y: 0.5 };   // 0..1 relative to canvas
        this.mouse3D = { x: 0.0, y: 0.0 };     // -1..1 world-ish
        this.isHovering = false;

        // Fluid intensity (0 = idle, 1 = full hover)
        this.fluidIntensity = 0.0;
        this.targetIntensity = 0.0;

        this.init();
        this.createEventListeners();
        this.animate();
    }

    init() {
        this.scene = new THREE.Scene();

        const width = this.canvas.clientWidth || 500;
        const height = this.canvas.clientHeight || 500;

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 3.5;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
            precision: 'highp',
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);

        this.createMaterial();

        // High-subdivision sphere — more vertices = smoother fluid
        const geometry = new THREE.IcosahedronGeometry(1.3, 80);
        this.sphere = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.sphere);

        window.addEventListener('resize', () => this.onWindowResize());
    }

    createMaterial() {
        /* -------------------------------------------------------
         * VERTEX SHADER
         * Multi-octave gradient noise displaces vertices along
         * their normals. The displacement sums to ~zero so the
         * average radius is preserved.  Fluid speed & amplitude
         * scale with the `fluidIntensity` uniform.
         * ------------------------------------------------------- */
        const vertexShader = /* glsl */`
            uniform float time;
            uniform float fluidIntensity;   // 0 = idle, 1 = hover
            uniform vec2  mouseDir;         // normalised mouse direction

            varying vec3  vPos;
            varying vec3  vNormal;
            varying float vDisplace;

            // ---- Hash / Noise helpers ----
            vec3 hash3(vec3 p) {
                p = fract(p * vec3(443.897, 441.423, 437.195));
                p += dot(p, p.yxz + 19.19);
                return fract((p.xxy + p.yxx) * p.zyx);
            }

            // Value noise – smooth tricubic
            float noise(vec3 p) {
                vec3 i = floor(p);
                vec3 f = fract(p);
                vec3 u = f * f * (3.0 - 2.0 * f);

                float n000 = dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0));
                float n100 = dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0));
                float n010 = dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0));
                float n110 = dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0));
                float n001 = dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1));
                float n101 = dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1));
                float n011 = dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1));
                float n111 = dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1));

                return mix(
                    mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y),
                    mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y),
                    u.z
                );
            }

            // 4-octave fractal noise (fbm)
            float fbm(vec3 p) {
                float val = 0.0;
                float amp = 0.5;
                float freq = 1.0;
                for (int i = 0; i < 4; i++) {
                    val  += amp  * noise(p * freq);
                    amp  *= 0.5;
                    freq *= 2.0;
                }
                return val;
            }

            void main() {
                vec3 n = normalize(position);   // unit sphere normal

                // ------ Idle gentle breathing ------
                float idleSpeed = 0.28;
                vec3  idleSample = n * 2.2 + vec3(time * idleSpeed);
                float idleDisp   = fbm(idleSample) * 0.055;   // very subtle

                // ------ Fluid / hover layer ------
                // Flow direction biased by mouse position
                vec3 flowDir = vec3(mouseDir * 0.6, 0.8);
                float fluidSpeed  = 1.4 + fluidIntensity * 1.8;
                float fluidScale  = 2.8 + fluidIntensity * 1.2;
                vec3  fluidSample = n * fluidScale + flowDir * time * fluidSpeed;

                float fluidDisp   = fbm(fluidSample) * 0.065 * fluidIntensity;

                // Second turbulence octave for gentle water-finger feel
                vec3  turbSample  = n * 5.0 - flowDir * time * (fluidSpeed * 0.7);
                float turbDisp    = fbm(turbSample) * 0.022 * fluidIntensity * fluidIntensity;

                // Total displacement (centred – positive & negative cancel on average)
                float totalDisp = idleDisp + fluidDisp + turbDisp;
                vDisplace = totalDisp;

                // Displace along the surface normal – radius is preserved on average
                vec3 displaced = position + n * totalDisp;

                vPos    = displaced;
                vNormal = normalize(normalMatrix * n);

                gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
            }
        `;

        /* -------------------------------------------------------
         * FRAGMENT SHADER
         * Colour palette flows with the fluid, iridescent sheen
         * ramps up with hover intensity.
         * ------------------------------------------------------- */
        const fragmentShader = /* glsl */`
            uniform float time;
            uniform float fluidIntensity;
            uniform vec2  mouseDir;

            varying vec3  vPos;
            varying vec3  vNormal;
            varying float vDisplace;

            void main() {
                vec3 n   = normalize(vNormal);
                vec3 view = normalize(-vPos);

                // ---- Colour palette ----
                // Base gradient colours
                vec3 c1 = vec3(1.0,  0.08, 0.45);   // hot pink
                vec3 c2 = vec3(0.02, 0.85, 1.0);     // cyan
                vec3 c3 = vec3(0.1,  1.0,  0.55);    // mint green
                vec3 c4 = vec3(0.55, 0.0,  1.0);     // violet

                // Slow ambient colour cycle
                float t1 = sin(vPos.x * 1.6 + time * 0.18) * 0.5 + 0.5;
                float t2 = sin(vPos.y * 1.6 - time * 0.14) * 0.5 + 0.5;
                float t3 = cos(vPos.z * 1.6 + time * 0.20) * 0.5 + 0.5;

                vec3 col = mix(c1, c2, t1);
                col = mix(col, c3, t2 * 0.6);
                col = mix(col, c4, t3 * 0.35);

                // ---- Fluid shimmer overlay (intensifies on hover) ----
                float shimmer = sin(vDisplace * 60.0 - time * 4.0) * 0.5 + 0.5;
                shimmer *= fluidIntensity * 0.35;
                col += shimmer * vec3(0.8, 0.95, 1.0);

                // ---- Iridescent / pearlescent sheen ----
                float fresnel = pow(1.0 - abs(dot(view, n)), 2.5);
                // Iridescent hue shift based on view angle + time
                vec3 iridescentCol = 0.5 + 0.5 * cos(
                    vec3(0.0, 2.094, 4.189) + fresnel * 4.0 + time * 0.3
                );
                float iridStrength = mix(0.25, 0.6, fluidIntensity);
                col += iridescentCol * fresnel * iridStrength;

                // ---- Diffuse lighting ----
                float diff = dot(n, normalize(vec3(0.6, 1.0, 0.7)));
                diff = smoothstep(-0.3, 1.0, diff);

                // ---- Specular highlight (moves with mouse) ----
                vec3 lightDir = normalize(vec3(mouseDir * 2.0, 2.0));
                float spec = pow(max(dot(reflect(-lightDir, n), view), 0.0), 32.0);
                float specStr = mix(0.15, 0.55, fluidIntensity);
                col += spec * specStr * vec3(1.0, 0.95, 0.9);

                // ---- Rim glow ----
                float rim = pow(1.0 - abs(dot(view, n)), 3.5);
                col += rim * vec3(0.0, 0.75, 1.0) * mix(0.20, 0.45, fluidIntensity);

                col *= (0.85 + diff * 0.4);

                gl_FragColor = vec4(clamp(col, 0.0, 1.5), 1.0);
            }
        `;

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                fluidIntensity: { value: 0.0 },
                mouseDir: { value: new THREE.Vector2(0.0, 0.0) }
            },
            vertexShader,
            fragmentShader,
            wireframe: false,
            side: THREE.FrontSide
        });
    }

    createEventListeners() {
        const canvasEl = this.canvas;

        // Track mouse globally so partial hover still works
        document.addEventListener('mousemove', (e) => {
            const rect = canvasEl.getBoundingClientRect();
            const nx = (e.clientX - rect.left) / rect.width;
            const ny = (e.clientY - rect.top) / rect.height;

            // Are we over the canvas?
            this.isHovering = nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1;

            // Update mouse direction uniform (-1..1 centred)
            this.mouse3D.x = (nx - 0.5) * 2.0;
            this.mouse3D.y = -(ny - 0.5) * 2.0;
            this.material.uniforms.mouseDir.value.set(this.mouse3D.x, this.mouse3D.y);

            this.targetIntensity = this.isHovering ? 1.0 : 0.0;
        });

        canvasEl.addEventListener('mouseleave', () => {
            this.isHovering = false;
            this.targetIntensity = 0.0;
        });

        // Touch support
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const rect = canvasEl.getBoundingClientRect();
                const t = e.touches[0];
                const nx = (t.clientX - rect.left) / rect.width;
                const ny = (t.clientY - rect.top) / rect.height;
                this.mouse3D.x = (nx - 0.5) * 2.0;
                this.mouse3D.y = -(ny - 0.5) * 2.0;
                this.material.uniforms.mouseDir.value.set(this.mouse3D.x, this.mouse3D.y);
                this.targetIntensity = 1.0;
            }
        }, { passive: true });

        document.addEventListener('touchend', () => {
            this.targetIntensity = 0.0;
        });
    }

    onWindowResize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate = () => {
        this.animationId = requestAnimationFrame(this.animate);

        // Advance time
        this.material.uniforms.time.value += 0.016;

        // Smooth fluid intensity – fast ramp-up, slower decay
        const lerpSpeed = this.targetIntensity > this.fluidIntensity ? 0.055 : 0.025;
        this.fluidIntensity += (this.targetIntensity - this.fluidIntensity) * lerpSpeed;
        this.material.uniforms.fluidIntensity.value = this.fluidIntensity;

        // Very slow idle rotation – stops feeling like a spinning ball
        this.sphere.rotation.y += 0.0006 + this.fluidIntensity * 0.0008;
        this.sphere.rotation.x += 0.0002;

        this.renderer.render(this.scene, this.camera);
    };

    getSphere() { return this.sphere; }

    dispose() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.renderer.dispose();
        this.material.dispose();
        this.sphere.geometry.dispose();
    }
}

// ---- Bootstrap ----
let sphereController = null;

document.addEventListener('DOMContentLoaded', () => {
    sphereController = new SphereController();
});

window.addEventListener('beforeunload', () => {
    if (sphereController) sphereController.dispose();
});
