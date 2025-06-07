

// --- ItemSystem Module ---
const ItemSystem = {
    generateRandomItem: function(forcedRarityKey = null, itemBase = null) {
        let rarityKey = forcedRarityKey;
        if (!rarityKey) {
            const totalWeight = Object.values(ITEM_RARITIES).reduce((sum, r) => sum + r.chanceWeight, 0);
            let roll = Math.random() * totalWeight;
            for (const key in ITEM_RARITIES) {
                if (roll < ITEM_RARITIES[key].chanceWeight) {
                    rarityKey = key;
                    break;
                }
                roll -= ITEM_RARITIES[key].chanceWeight;
            }
            if (!rarityKey) rarityKey = "D"; 
        }

        const rarity = ITEM_RARITIES[rarityKey];
        const base = itemBase || ITEM_BASE_TYPES[Math.floor(Math.random() * ITEM_BASE_TYPES.length)];
        
        const newItem = {
            id: Date.now() + Math.random().toString(36).substring(2, 15), 
            name: `${rarity.name} ${base.name}`,
            type: base.type,
            slot: base.slot,
            stats: {},
            rarity: rarityKey, 
            color: rarity.color,
            cost: 0, 
            sellPrice: 0, 
            description: `A ${rarity.name.toLowerCase()} ${base.name.toLowerCase()}.`
        };

        const numStatsToGrant = Math.floor(Math.random() * rarity.maxStatTypes) + 1;
        const availableStats = [...(base.possibleStats || POSSIBLE_ITEM_STATS)]; 
        
        for (let i = 0; i < numStatsToGrant && availableStats.length > 0; i++) {
            const statIndex = Math.floor(Math.random() * availableStats.length);
            const statKey = availableStats.splice(statIndex, 1)[0];
            
            const basePoints = Math.floor(Math.random() * rarity.maxBasePointsPerStat) + 1;
            newItem.stats[statKey] = Math.max(1, Math.floor(basePoints * rarity.statPointsMultiplier));
        }

        let totalStatValue = Object.values(newItem.stats).reduce((sum, val) => sum + val, 0);
        newItem.cost = Math.floor(base.baseCost * rarity.costMultiplier + totalStatValue * 5 * rarity.costMultiplier); 
        newItem.sellPrice = Math.max(1, Math.floor(newItem.cost * 0.3)); 

        return newItem;
    }
};
window.ItemSystem = ItemSystem;
