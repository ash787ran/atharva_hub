// static/js/graphics/ParticleSystem.js
/**
 * Atharva Quantum Engine Core v10 - Hardware-Accelerated Vector Physics Matrix
 * Manages multi-layered high-density alpha-blended space background vectors.
 */

class ParticleEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error("⛔ [Graphics Engine] Canvas context node target allocation failure.");
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 120;
        this.activeColor = 'rgba(0, 255, 255, ';
        
        this.initDimensions();
        this.instantiatePool();
        this.bindGlobalResizeMonitor();
    }

    initDimensions() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindGlobalResizeMonitor() {
        window.addEventListener('resize', () => {
            this.initDimensions();
        });
    }

    instantiatePool() {
        this.particles = [];
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.generateProceduralVectorParameters(true));
        }
    }

    generateProceduralVectorParameters(initPhase = false) {
        return {
            x: Math.random() * this.canvas.width,
            y: initPhase ? Math.random() * this.canvas.height : this.canvas.height + 10,
            radius: Math.random() * 2.5 + 0.6,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * -0.75 - 0.25,
            alpha: Math.random() * 0.6 + 0.15,
            decayRate: Math.random() * 0.002 + 0.001
        };
    }

    updateAndRenderFrameStep() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            
            // Adjust vector coordinates by velocity parameters
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Boundary safety monitoring
            if (p.y < -10 || p.x < -10 || p.x > this.canvas.width + 10) {
                this.particles[i] = this.generateProceduralVectorParameters(false);
                continue;
            }

            // Draw current vector node
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `${this.activeColor}${p.alpha})`;
            this.ctx.fill();
        }
    }

    updateEnginePaletteTheme(themeKey) {
        switch(themeKey) {
            case 'math':
                this.activeColor = 'rgba(255, 235, 59, '; // Yellow energy fields
                break;
            case 'english':
                this.activeColor = 'rgba(255, 0, 127, '; // Pink nebula clouds
                break;
            case 'gk':
                this.activeColor = 'rgba(57, 255, 20, '; // Green radar tracking sweeps
                break;
            default:
                this.activeColor = 'rgba(0, 255, 255, '; // Default cyan cockpit grid
        }
    }
}