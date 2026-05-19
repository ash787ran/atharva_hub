// static/js/core/StateManager.js
/**
 * Atharva Quantum Engine Core v10 - Session State Factory
 * Controls mathematical mutations of scores, streak levels, and background telemetry synchronization loops.
 */

class StateManager {
    constructor() {
        this.pilotName = "CAPTAIN ATHARVA";
        this.score = 0;
        this.streak = 0;
        this.currentRank = "SPACE CADET";
        this.activeModule = "home";
        
        this.rankThresholds = [
            { rank: "GALAXY KNIGHT", minStars: 40 },
            { rank: "SOCCER ALL-STAR", minStars: 90 },
            { rank: "COSMIC SUPERHERO", minStars: 160 }
        ];
    }

    registerSuccess(points) {
        this.streak++;
        // Apply a dynamic 2x streak multiplier milestone rewards when streak is 5 or greater
        const calculatedMultiplier = this.streak >= 5 ? 2 : 1;
        const netPointsGained = points * calculatedMultiplier;
        this.score += netPointsGained;

        const rankStatusChanged = this.recalculatePilotRank();
        this.dispatchBackendTelemetrySync();

        return {
            pointsGained: netPointsGained,
            currentScore: this.score,
            currentStreak: this.streak,
            rankChanged: rankStatusChanged,
            newRank: this.currentRank
        };
    }

    registerFailure() {
        this.streak = 0;
        this.dispatchBackendTelemetrySync();
        return {
            currentStreak: this.streak
        };
    }

    recalculatePilotRank() {
        let matchingRank = "SPACE CADET";
        for (let tier of this.rankThresholds) {
            if (this.score >= tier.minStars) {
                matchingRank = tier.rank;
            }
        }
        if (matchingRank !== this.currentRank) {
            this.currentRank = matchingRank;
            return true; // Flag rank change state transformation
        }
        return false;
    }

    setActiveModule(moduleKey) {
        this.activeModule = moduleKey;
        this.dispatchBackendTelemetrySync();
    }

    async dispatchBackendTelemetrySync() {
        const payload = {
            pilot_name: this.pilotName,
            current_score: this.score,
            streak_multiplier: this.streak,
            unlocked_rank: this.currentRank,
            active_module: this.activeModule
        };

        try {
            // Asynchronous thread channel processing data tracking states
            const response = await fetch('/api/telemetry/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                console.warn("⚠️ [Telemetry Sync] Non-200 state response received from router channel.");
            }
        } catch (error) {
            console.error("⛔ [Telemetry Sync] Core server pipeline communication failure:", error);
        }
    }
}