export const deffenderStats = {
    appearances: 1,
    Attack: {
        goals: 0.05,
        xpGoal: 0.04,
        shots: 0.6,
        shotsOntarget: 0.2,
        offensiveDuels: {
            lost: 1.2,
            won: 1.0,
        },
    },
    Playmaking: {
        assists: 0.15,
        xpAssists: 0.12,
        createdChances: 0.5,
        passAccuracy: 88.0,
        longPassAccuracy: 70.0,
        progressivePasses: 6.0,
        crosses: {
            failed: 0.8,
            succeded: 0.4,
        },
    },
    Deffense: {
        cleanSheets: 0.45,
        yellowCards: 0.25,
        redCards: 0.02,
        headerDuels: {
            lost: 1.0,
            won: 2.5,
        },
        groundDuels: {
            lost: 1.8,
            won: 3.0,
        },
        fauls: 1.2,
        interceptions: 3.5,
    },
    Goalkeeper: {
        cleanSheets: 0,
        xpConcededGoals: 0,
        saveSuccessRate: 0,
        interventions: 0,
    },
};
