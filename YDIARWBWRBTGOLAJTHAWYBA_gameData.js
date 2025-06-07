s

// This file contains all the static data for the game.
// It is loaded first and its contents are available to all other modules.

const SAVE_KEY = "isekaiLifeSim_YDIARWBWRBTGOLAJTHAWYBA_v9_modular"; 
const RANKS = ["F", "E", "D", "C", "B", "A", "S", "SS", "SSS"]; 
const RANK_REQUIREMENTS = { 
    "F": { xp: 0, powerScore: 0 },
    "E": { xp: 50, powerScore: 40 },
    "D": { xp: 150, powerScore: 70 },
    "C": { xp: 300, powerScore: 110 },
    "B": { xp: 500, powerScore: 160 },
    "A": { xp: 800, powerScore: 220 },
    "S": { xp: 1200, powerScore: 300 },
    "SS": { xp: 2000, powerScore: 400 },
    "SSS": { xp: 3000, powerScore: 550 }
};
const COMPANION_NAMES = ["Elara", "Ronan", "Seraphina", "Kael", "Lyra", "Jasper", "Astrid", "Finnian", "Aiko", "Kenji", "Leif", "Brynn", "Corbin", "Isolde", "Rowan", "Mira", "Gideon", "Clara"];
const CHILD_NAMES = ["Leo", "Mia", "Noel", "Iris", "Sam", "Chloe", "Alex", "Zoe", "Ren", "Yuki"];
const JAPANESE_NAME_ROOTS = ["Aki", "Haru", "Ken", "Yoshi", "Masa", "Nao", "Ryo", "Shin", "Taka", "Yumi", "Kaz", "Dai", "Ren", "Sora", "Kai", "Hana", "Yuki", "Ai", "Mei", "Saki"];
const JAPANESE_NAME_ENDINGS = ["hiro", "hiko", "jiro", "suke", "kazu", "masa", "aki", "nosuke", "maru", "ko", "mi", "ka", "na", "ya", "to", "ru", "ma", "ne", "ri"];
const DAYS_IN_MONTH = 30; 
const MONTHS_IN_YEAR = 12;
const FRIENDSHIP_TO_ROMANCE_THRESHOLD = 60;
const MIN_ROMANCE_AGE = 16;
const CHILD_BEARING_BOND_LEVEL = 80;
const MIN_STAMINA_FOR_PHYSICAL_ACTION = 10; 
const MAX_COMPANIONS = 5;
const POLYAMOROUS_CHANCE = 0.3; 

const ITEM_RARITIES = {
    E: { name: "Inferior", color: "text-gray-500", statPointsMultiplier: 0.5, costMultiplier: 0.5, maxStatTypes: 1, maxBasePointsPerStat: 2, chanceWeight: 30 },
    D: { name: "Common", color: "text-gray-400", statPointsMultiplier: 0.8, costMultiplier: 0.8, maxStatTypes: 1, maxBasePointsPerStat: 3, chanceWeight: 25 },
    C: { name: "Uncommon", color: "text-green-400", statPointsMultiplier: 1, costMultiplier: 1, maxStatTypes: 2, maxBasePointsPerStat: 4, chanceWeight: 20 },
    B: { name: "Rare", color: "text-blue-400", statPointsMultiplier: 1.5, costMultiplier: 1.5, maxStatTypes: 2, maxBasePointsPerStat: 5, chanceWeight: 15 },
    A: { name: "Epic", color: "text-purple-400", statPointsMultiplier: 2, costMultiplier: 2.5, maxStatTypes: 3, maxBasePointsPerStat: 6, chanceWeight: 7 },
    S: { name: "Legendary", color: "text-orange-400", statPointsMultiplier: 3, costMultiplier: 5, maxStatTypes: 3, maxBasePointsPerStat: 7, chanceWeight: 2.5 },
    SS: { name: "Mythic", color: "text-red-500", statPointsMultiplier: 4, costMultiplier: 10, maxStatTypes: 4, maxBasePointsPerStat: 8, chanceWeight: 0.4 },
    SSS: { name: "Transcendent", color: "text-yellow-300", statPointsMultiplier: 5, costMultiplier: 20, maxStatTypes: 4, maxBasePointsPerStat: 10, chanceWeight: 0.1 }
};
const ITEM_BASE_TYPES = [
    { name: "Dagger", type: "weapon", slot: "weapon", baseCost: 10, possibleStats: ["STR", "DEX", "LUCK"] },
    { name: "Shortsword", type: "weapon", slot: "weapon", baseCost: 20, possibleStats: ["STR", "DEX"] },
    { name: "Staff", type: "weapon", slot: "weapon", baseCost: 18, possibleStats: ["INT", "WIS", "MANA"] },
    { name: "Leather Cap", type: "armor", slot: "armor", baseCost: 8, possibleStats: ["CON", "DEX", "WIS"] }, 
    { name: "Cloth Robes", type: "armor", slot: "armor", baseCost: 12, possibleStats: ["INT", "WIS", "MANA", "CHA"] },
    { name: "Wooden Shield", type: "misc", slot: "misc", baseCost: 15, possibleStats: ["CON", "STR"] }, 
    { name: "Amulet", type: "misc", slot: "misc", baseCost: 25, possibleStats: ["INT", "WIS", "CHA", "LUCK", "MANA"] },
    { name: "Ring", type: "misc", slot: "misc", baseCost: 22, possibleStats: ["STR", "DEX", "CON", "INT", "WIS", "CHA", "LUCK", "MANA"] }
];
const POSSIBLE_ITEM_STATS = ["STR", "DEX", "CON", "INT", "WIS", "CHA", "LUCK", "MANA"];
const MONSTER_MATERIALS = [
    { name: "Slime Core", type: "material", baseSellValue: 2, rarity: "D" },
    { name: "Wolf Pelt", type: "material", baseSellValue: 5, rarity: "D" },
    { name: "Goblin Ear", type: "material", baseSellValue: 3, rarity: "D" },
    { name: "Wyvern Scale", type: "material", baseSellValue: 20, rarity: "B" },
    { name: "Demon Horn Fragment", type: "material", baseSellValue: 50, rarity: "A" }
];

const gameData = {
    // Occupations, Worlds, Spirits, etc., go here
    // ... (All the large objects from the previous script) ...
    // Note: To keep the response manageable, the full content of these large objects is omitted here.
    // You should copy the full 'gameData' object from the previous script into this file.
};
