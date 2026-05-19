// static/js/core/Engine.js
/**
 * Atharva Quantum Engine Core v10 - Master Orchestration System
 * Coordinates multi-tab logic matrices, hardware graphics ticks, and audio synthesizer dispatches.
 */

class CoreGameEngine {
    constructor() {
        // Instantiate decoupled operational sub-module classes
        this.stateManager = new StateManager();
        this.audioController = new AudioSynthController();
        this.graphicsEngine = new ParticleEngine('matrix-particle-canvas');
        
        this.activeMathCategory = 'add';
        this.mathSolutionTarget = 0;
        
        this.activePhonicsIndex = 0;
        this.activeTelemetryIndex = 0;
        
        this.localMathBgTracker = 'logic';
        this.localGkBgTracker = 'map1';

        this.initBootSequenceUI();
    }

    initBootSequenceUI() {
        // Hydrate DOM display elements with real-time variables initialized from state values
        document.getElementById('score-node').innerText = this.stateManager.score;
        document.getElementById('streak-node').innerText = this.stateManager.streak;
        document.getElementById('rank-node').innerText = this.stateManager.currentRank;

        this.bindUserInteractionEvents();
        this.initMasterLoopTick();
    }

    bindUserInteractionEvents() {
        // Bind dynamic listeners for calculation inputs inside text fields
        const mathField = document.getElementById('math-input-response-box');
        if (mathField) {
            mathField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.processMathSubmission();
            });
        }
    }

    initMasterLoopTick() {
        const loop = () => {
            // Direct execution flow map triggering 60FPS particle positions updates inside canvas frames
            this.graphicsEngine.updateAndRenderFrameStep();
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    executePlatformPlaneWarp(platformId) {
        this.stateManager.setActiveModule(platformId);
        this.graphicsEngine.updateEnginePaletteTheme(platformId);

        document.querySelectorAll('.adventure-plane').forEach(plane => plane.classList.remove('active'));
        document.querySelectorAll('.console-trigger').forEach(btn => btn.classList.remove('active'));

        const destinationPlane = document.getElementById(`${platformId}-platform`);
        if (destinationPlane) {
            destinationPlane.style.display = 'flex';
            setTimeout(() => destinationPlane.classList.add('active'), 40);
        }

        // Apply visual button state focus changes targeting caller actions safely
        const triggerBtn = event.currentTarget;
        if (triggerBtn && triggerBtn.classList) {
            triggerBtn.classList.add('active');
        }

        if (platformId === 'math') this.generateProceduralMathChallenge();
        if (platformId === 'english') this.generateProceduralPhonicsChallenge();
        if (platformId === 'gk') this.generateProceduralTelemetryChallenge();
    }

    // ==========================================================================
    // PROCEDURAL MATHEMATICAL GENERATION PROCESSING UNIT
    // ==========================================================================
    setMathOperationMode(operationType) {
        this.activeMathCategory = operationType;
        document.querySelectorAll('#math-platform .tab-matrix-cluster .console-trigger').forEach(b => b.classList.remove('active'));
        document.getElementById(`m-${operationType}`).classList.add('active');
        this.generateProceduralMathChallenge();
    }

    generateProceduralMathChallenge() {
        const frame = document.getElementById('math-platform');
        const inputField = document.getElementById('math-input-response-box');
        if (inputField) inputField.value = '';

        if (this.localMathBgTracker === 'logic') {
            frame.style.backgroundImage = "url('/images/logic_lock.png')";
            document.getElementById('math-headline-string').innerText = "SYSTEM SECURITY ENCRYPTION FIELD";
            this.localMathBgTracker = 'arctic';
        } else {
            frame.style.backgroundImage = "url('/images/arctic_explorer.png')";
            document.getElementById('math-headline-string').innerText = "ANCIENT ICE CORE RELIC DATA";
            this.localMathBgTracker = 'logic';
        }

        let val1, val2;
        switch(this.activeMathCategory) {
            case 'add':
                val1 = Math.floor(Math.random() * 10) + 5; // Constrain numerical ranges balanced for childhood progression (Age 6)
                val2 = Math.floor(Math.random() * 8) + 1;
                document.getElementById('math-display-equation').innerText = `${val1} + ${val2} = ?`;
                this.mathSolutionTarget = val1 + val2;
                break;
            case 'sub':
                val1 = Math.floor(Math.random() * 12) + 8;
                val2 = Math.floor(Math.random() * 7) + 1; // Evaluates safe paths guaranteeing no negative configurations can occur
                document.getElementById('math-display-equation').innerText = `${val1} - ${val2} = ?`;
                this.mathSolutionTarget = val1 - val2;
                break;
            case 'mul':
                val1 = Math.floor(Math.random() * 4) + 2; // Basic tracking multiplication table counts from 2 to 5
                val2 = Math.floor(Math.random() * 5) + 1;
                document.getElementById('math-display-equation').innerText = `${val1} × ${val2} = ?`;
                this.mathSolutionTarget = val1 * val2;
                break;
            case 'div':
                val2 = Math.floor(Math.random() * 3) + 2; // Whole results without float remainders
                this.mathSolutionTarget = Math.floor(Math.random() * 4) + 1;
                val1 = val2 * this.mathSolutionTarget;
                document.getElementById('math-display-equation').innerText = `${val1} ÷ ${val2} = ?`;
                break;
        }
    }

    processMathSubmission() {
        const entry = parseInt(document.getElementById('math-input-response-box').value);
        if (entry === this.mathSolutionTarget) {
            this.handleSystemSuccessEvent(10);
        } else {
            this.handleSystemFailureEvent();
        }
    }

    // ==========================================================================
    // PHONICS LITERACY & GENERAL KNOWLEDGE TELEMETRY MANAGEMENT
    // ==========================================================================
    generateProceduralPhonicsChallenge() {
        let activeObj = ARCADE_QUESTION_DATABASE.phonics[this.activePhonicsIndex];
        document.getElementById('english-text-prompt').innerText = activeObj.query;

        let grid = document.getElementById('english-response-grid');
        grid.innerHTML = '';
        activeObj.choices.forEach(opt => {
            grid.innerHTML += `<button class="arcade-matrix-block" onclick="window.ArcadeInstanceEngine.processPhonicsSubmission('${opt}')">${opt}</button>`;
        });
    }

    processPhonicsSubmission(selection) {
        let activeObj = ARCADE_QUESTION_DATABASE.phonics[this.activePhonicsIndex];
        if (selection === activeObj.target) {
            this.activePhonicsIndex = (this.activePhonicsIndex + 1) % ARCADE_QUESTION_DATABASE.phonics.length;
            this.handleSystemSuccessEvent(activeObj.reward);
        } else {
            this.handleSystemFailureEvent();
        }
    }

    generateProceduralTelemetryChallenge() {
        let activeObj = ARCADE_QUESTION_DATABASE.telemetry[this.activeTelemetryIndex];
        document.getElementById('gk-text-prompt').innerText = activeObj.query;

        let frame = document.getElementById('gk-platform');
        if (this.localGkBgTracker === 'map1') {
            frame.style.backgroundImage = "url('/images/space_ranger.png')";
            this.localGkBgTracker = 'map2';
        } else if (this.localGkBgTracker === 'map2') {
            frame.style.backgroundImage = "url('/images/space_ranger_new.png')";
            this.localGkBgTracker = 'map3';
        } else {
            frame.style.backgroundImage = "url('/images/ocean_speller.png')";
            this.localGkBgTracker = 'map1';
        }

        let grid = document.getElementById('gk-response-grid');
        grid.innerHTML = '';
        activeObj.choices.forEach(opt => {
            grid.innerHTML += `<button class="arcade-matrix-block" onclick="window.ArcadeInstanceEngine.processTelemetrySubmission('${opt}')">${opt}</button>`;
        });
    }

    processTelemetrySubmission(selection) {
        let activeObj = ARCADE_QUESTION_DATABASE.telemetry[this.activeTelemetryIndex];
        if (selection === activeObj.target) {
            this.activeTelemetryIndex = (this.activeTelemetryIndex + 1) % ARCADE_QUESTION_DATABASE.telemetry.length;
            this.handleSystemSuccessEvent(activeObj.reward);
        } else {
            this.handleSystemFailureEvent();
        }
    }

    // ==========================================================================
    // ENGINE STATE DISPATCH HANDLERS
    // ==========================================================================
    handleSystemSuccessEvent(basePoints) {
        const res = this.stateManager.registerSuccess(basePoints);
        
        this.audioController.playSuccessChime();
        document.getElementById('score-node').innerText = res.currentScore;
        document.getElementById('streak-node').innerText = res.currentStreak;

        confetti({ particleCount: 200, spread: 100, origin: { y: 0.65 } });

        if (res.rankChanged) {
            document.getElementById('rank-node').innerText = res.newRank;
            this.dispatchGlobalToasterAlert(`PROMOTED: ${res.newRank} ACCESS PRIVILEGES GRANTED!`);
        }

        // Reward overlay triggering condition: every 4 questions solved (40 stars achieved)
        if (res.currentScore % 40 === 0) {
            this.audioController.playLevelUpFanfare();
            document.getElementById('stadium-curtain-overlay').classList.add('active');
        } else {
            this.retriggerActiveViewInstance();
        }
    }

    handleSystemFailureEvent() {
        const res = this.stateManager.registerFailure();
        this.audioController.playFailureTone();
        document.getElementById('streak-node').innerText = res.currentStreak;
        
        alert("❌ CODE REJECTION FIREWALL! Recalibrating logic vectors...");
        this.retriggerActiveViewInstance();
    }

    retriggerActiveViewInstance() {
        const currentActivePlane = document.querySelector('.adventure-plane.active').id;
        if (currentActivePlane === 'math-platform') this.generateProceduralMathChallenge();
        if (currentActivePlane === 'english-platform') this.generateProceduralPhonicsChallenge();
        if (currentActivePlane === 'gk-platform') this.generateProceduralTelemetryChallenge();
    }

    dispatchGlobalToasterAlert(message) {
        const toast = document.getElementById('core-toaster-notification');
        document.getElementById('toast-message-body').innerText = message;
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 4500);
    }

    closeStadiumOverlayPortal() {
        document.getElementById('stadium-curtain-overlay').classList.remove('active');
        this.retriggerActiveViewInstance();
    }
}