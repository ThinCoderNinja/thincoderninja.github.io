// --- GameManager Module ---
// This module handles the main game loop, state management, and saving/loading.

const GameManager = {
    init: function() {
        const savedGame = this.load(); 
        if (savedGame) {
            player = savedGame;

            // --- SAVE FILE MIGRATION LOGIC ---
            // This block checks for properties from newer versions and adds them to older save files if they are missing.
            if (player.stamina === undefined) {
                player.stamina = 100;
                player.maxStamina = 100;
                console.log("Migrating save: Added stamina property.");
            }
            if (player.powerScore === undefined) {
                player.powerScore = 0;
                 console.log("Migrating save: Added powerScore property.");
            }
            if (player.companions === undefined) { 
                player.companions = [];
                 console.log("Migrating save: Added companions array.");
            }
            player.companions.forEach(comp => {
                if(!comp.id) comp.id = Date.now() + Math.random();
                if(comp.metAtAge === undefined) comp.metAtAge = player.age -1; 
                if(comp.isPolyamorous === undefined) comp.isPolyamorous = (Math.random() < 0.2); // Give older companions a default poly chance
            });
            if (player.completedWorldEvents === undefined) {
                player.completedWorldEvents = [];
                console.log("Migrating save: Added completedWorldEvents array.");
            }
            if (player.deathMessages === undefined) {
                player.deathMessages = [];
                console.log("Migrating save: Added deathMessages array.");
            }
            if (player.isCertifiedAdventurer === undefined) {
                player.isCertifiedAdventurer = false;
                 console.log("Migrating save: Added isCertifiedAdventurer flag.");
            }
            if (player.activeGuildQuest === undefined) {
                player.activeGuildQuest = null;
                 console.log("Migrating save: Added activeGuildQuest property.");
            }
            // --- END OF MIGRATION LOGIC ---


            UIManager.showNewLifeInterface();
            UIManager.updateUI();
            UIManager.logEvent(`Game loaded! Welcome back, ${player.name}.`);
            if (player.inDungeon) {
                currentDungeon = gameData.worlds.find(w => w.id === player.world.id)
                                .lateGameActions.find(a => a.id === player.inDungeon.dungeonActionId);
                if (currentDungeon) {
                     UIManager.showDungeonInterface(currentDungeon);
                }
            }
        } else {
            this.startNewGame();
        }
    },
    startNewGame: function() {
        const startingAge = Math.floor(Math.random() * 5) + 8; 
        const previousDeaths = player.deathMessages || []; 
        player = {
            name: this.generateRandomName(), 
            age: startingAge,
            currentDate: { year: startingAge, month: 1, day: 1 }, 
            gold: 20, 
            occupation: null,
            class: null,
            baseStats: {},
            effectiveStats: {},
            powerScore: 0,
            rank: "F",
            rankXP: 0,
            maxHP: 100,
            currentHP: 100,
            stamina: 100, 
            maxStamina: 100, 
            mana: 100,
            maxMana: 100,
            world: null,
            companions: [], 
            children: [],
            accolades: [],
            titles: [],
            equipment: { weapon: null, armor: null, misc: null }, 
            treasures: [], 
            blessings: [],
            curses: [],
            inDungeon: null, 
            bondedSpirit: null, 
            inventory: [], 
            completedWorldEvents: [], 
            deathMessages: previousDeaths,
            isCertifiedAdventurer: false,
            activeGuildQuest: null 
        };
        gameEnded = false; 
        eventInProgress = false; 
        
        UIManager.hideGameOverScreen(); 
        UIManager.displayOccupationSelection();
        UIManager.logEvent(`Welcome to a new life, ${player.name}! You begin your journey at the age of ${player.age}.`);
        UIManager.updateUI(); 
    },
    generateRandomName: function() {
        const root = JAPANESE_NAME_ROOTS[Math.floor(Math.random() * JAPANESE_NAME_ROOTS.length)];
        const ending = JAPANESE_NAME_ENDINGS[Math.floor(Math.random() * JAPANESE_NAME_ENDINGS.length)];
        let name = root + ending;
        return name.charAt(0).toUpperCase() + name.slice(1);
    },
    advanceDate: function(days) {
        player.currentDate.day += days;
        while (player.currentDate.day > DAYS_IN_MONTH) {
            player.currentDate.day -= DAYS_IN_MONTH;
            player.currentDate.month++;
            if (player.currentDate.month > MONTHS_IN_YEAR) {
                player.currentDate.month = 1;
                player.currentDate.year++;
                player.age++; 
                UIManager.logEvent(`Happy Birthday! You are now ${player.age}.`);
            }
        }
    },
    advanceYear: function() { 
        if (eventInProgress || gameEnded) return;

        player.currentDate.day = 1;
        player.currentDate.month = 1;
        player.currentDate.year++;
        player.age++;
        player.stamina = player.maxStamina; 

        if (!player.inDungeon) {
            player.currentHP = player.maxHP;
            player.mana = player.maxMana;
            UIManager.logEvent("A new year begins! Your HP, Mana, and Stamina have been restored.");
        } else {
             UIManager.logEvent("A new year begins! Your Stamina has been restored.");
        }


        if (player.bondedSpirit) {
            const spiritData = gameData.elementalSpirits.find(s => s.id === player.bondedSpirit.id);
            if (spiritData && player.bondedSpirit.bondLevel < spiritData.maxBondLevel) {
                if (Math.random() < 0.25 + ((player.effectiveStats.CHA || 0) * 0.01)) { 
                    player.bondedSpirit.bondLevel++;
                    UIManager.logEvent(`Your bond with the <span class="font-bold text-cyan-300">${spiritData.name}</span> deepens! (Bond Level ${player.bondedSpirit.bondLevel})`);
                    if (spiritData.bondMessages[player.bondedSpirit.bondLevel -1]) { 
                         UIManager.logEvent(spiritData.bondMessages[player.bondedSpirit.bondLevel -1]);
                    }
                }
            }
        }

        ActionHandler.checkElementalSpiritEncounter(); 

        UIManager.updateUI(); 
        if (!eventInProgress) { 
            UIManager.logEvent(`Year ${player.currentDate.year} begins. You are now ${player.age}.`);
        }
        this.save(); 
    },
    save: function() {
        localStorage.setItem(SAVE_KEY, JSON.stringify(player));
    },
    load: function() {
        const savedData = localStorage.getItem(SAVE_KEY);
        if (savedData) {
            return JSON.parse(savedData);
        }
        return null;
    },
    endGame: function(finalDeathMessage = "Your journey has come to an end.") {
        gameEnded = true;
        UIManager.logEvent(finalDeathMessage); 
        player.deathMessages.push({ date: new Date().toLocaleString(), message: finalDeathMessage });
        this.save(); 

        UIManager.showGameOverScreen(finalDeathMessage);
        
        advanceYearButtonUI.disabled = true;
        saveGameButtonUI.disabled = true;
        itemBagButtonUI.disabled = true;
        manageCompanionsButtonUI.disabled = true;
        actionsContainer.innerHTML = ''; // Clear action buttons
    },
    calculatePowerScore: function() {
        let score = 0;
        if (!player || !player.effectiveStats) return 0; // Guard against missing objects
        const stats = player.effectiveStats; 
        for (const stat in stats) {
            if (typeof stats[stat] === 'number' && stat !== 'MANA' && stat !== 'MaxMana') { 
                score += stats[stat];
            }
        }
        score += Math.floor((player.maxMana || 0) / 10); 
        return Math.floor(score);
    },
    checkRankUp: function() {
        const currentRankIndex = RANKS.indexOf(player.rank);
        if (currentRankIndex < RANKS.length - 1) { 
            const nextRankKey = RANKS[currentRankIndex + 1];
            const requirements = RANK_REQUIREMENTS[nextRankKey];
            if (player.rankXP >= requirements.xp && player.powerScore >= requirements.powerScore) {
                player.rank = nextRankKey;
                player.maxHP += 15 + Math.floor((player.baseStats.CON || 0) * 0.5); 
                player.currentHP = player.maxHP; 
                UIManager.logEvent(`🎉 RANK UP! You have been promoted to <span class="font-bold text-purple-300">${player.rank} Rank</span>! Your HP increased!`);
                UIManager.showMessageModal("Rank Up!", `Congratulations! You've been promoted to ${player.rank} Rank!`);
            }
        }
    },
    calculateEffectiveStats: function() { 
        const effective = { ...player.baseStats };
        for (const slot in player.equipment) {
            const item = player.equipment[slot];
            if (item && item.stats) {
                for (const stat in item.stats) {
                    effective[stat.toUpperCase()] = (effective[stat.toUpperCase()] || 0) + item.stats[stat];
                }
            }
        }
        if (player.bondedSpirit) {
            const spiritData = gameData.elementalSpirits.find(s => s.id === player.bondedSpirit.id);
            if (spiritData) {
                for (const stat in spiritData.baseBoosts) {
                    effective[stat.toUpperCase()] = (effective[stat.toUpperCase()] || 0) + spiritData.baseBoosts[stat];
                }
                if (player.bondedSpirit.bondLevel > 1) {
                    for (const stat in spiritData.boostPerLevel) {
                        effective[stat.toUpperCase()] = (effective[stat.toUpperCase()] || 0) + (spiritData.boostPerLevel[stat] * (player.bondedSpirit.bondLevel - 1));
                    }
                }
            }
        }
        
        let newMaxMana = (effective.INT || 0) * 5 + (player.class.baseStats.MANA || 100);
        for (const slot in player.equipment) {
            const item = player.equipment[slot];
            if (item && item.stats && item.stats.MANA) {
                newMaxMana += item.stats.MANA;
            }
        }
         if (player.bondedSpirit) {
            const spiritData = gameData.elementalSpirits.find(s => s.id === player.bondedSpirit.id);
            if (spiritData) {
                if(spiritData.baseBoosts.MANA) newMaxMana += spiritData.baseBoosts.MANA;
                if (player.bondedSpirit.bondLevel > 1 && spiritData.boostPerLevel.MANA) {
                     newMaxMana += (spiritData.boostPerLevel.MANA * (player.bondedSpirit.bondLevel - 1));
                }
            }
        }
        player.maxMana = newMaxMana;
        player.mana = Math.min(player.mana, player.maxMana);
        return effective;
    }
};
window.GameManager = GameManager;
