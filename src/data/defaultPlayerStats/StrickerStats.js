export const strickerStats = {
    appearances: 1,
    Attack: {
        goals: 0.4,
        xpGoal: 0.35,
        shots: 3.2,
        shotsOntarget: 1.5,
        offensiveDuels: {
            lost: 2.0,
            won: 2.5,
        },
    },
    Playmaking: {
        assists: 0.2,
        xpAssists: 0.18,
        createdChances: 0.8,
        passAccuracy: 78.0,
        longPassAccuracy: 60.0,
        progressivePasses: 4.0,
        crosses: {
            failed: 0.6,
            succeded: 0.3,
        },
    },
    Deffense: {
        cleanSheets: 0.3,
        yellowCards: 0.1,
        redCards: 0.01,
        headerDuels: {
            lost: 1.0,
            won: 1.2,
        },
        groundDuels: {
            lost: 2.5,
            won: 2.0,
        },
        fauls: 0.8,
        interceptions: 0.5,
    },
    Goalkeeper: {
        cleanSheets: 0,
        xpConcededGoals: 0,
        saveSuccessRate: 0,
        interventions: 0,
    },
};
