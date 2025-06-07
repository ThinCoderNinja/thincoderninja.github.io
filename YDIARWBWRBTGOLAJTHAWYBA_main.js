

// --- Main Game Entry Point ---
// This script initializes the game after the DOM is loaded
// and sets up the main event listeners.

document.addEventListener('DOMContentLoaded', () => { 
    // --- Global Game State Variables ---
    let player = {};
    let currentDungeon = null;
    let gameEnded = false;
    let eventInProgress = false; 
    let currentSpiritEncounter = null; 

    // --- UI Element References ---
    const advanceYearButtonUI = document.getElementById('advanceYearButtonUI');
    const saveGameButtonUI = document.getElementById('saveGameButtonUI');
    const modalCloseButton = document.getElementById('modalCloseButton');
    const dungeonExploreButton = document.getElementById('dungeonExploreButton');
    const dungeonRestButton = document.getElementById('dungeonRestButton');
    const dungeonFleeButton = document.getElementById('dungeonFleeButton');
    const bondSpiritButton = document.getElementById('bondSpiritButton');
    const declineSpiritButton = document.getElementById('declineSpiritButton');
    const itemBagButtonUI = document.getElementById('itemBagButtonUI');
    const closeItemBagButton = document.getElementById('closeItemBagButton');
    const buyTab = document.getElementById('buyTab');
    const sellTab = document.getElementById('sellTab');
    const closeShopButton = document.getElementById('closeShopButton');
    const manageCompanionsButtonUI = document.getElementById('manageCompanionsButtonUI');
    const closeManageCompanionsButton = document.getElementById('closeManageCompanionsButton');
    const viewPastDeathsButtonUI = document.getElementById('viewPastDeathsButtonUI');
    const closeDeathMessagesButton = document.getElementById('closeDeathMessagesButton');
    const newGameFromDeathButton = document.getElementById('newGameFromDeathButton');
    const viewPastDeathsFromDeathButton = document.getElementById('viewPastDeathsFromDeathButton');
    const closeGuildHallButton = document.getElementById('closeGuildHallButton');
    const completeGuildQuestButton = document.getElementById('completeGuildQuestButton');

    // --- Event Listeners ---
    advanceYearButtonUI.addEventListener('click', () => GameManager.advanceYear());
    saveGameButtonUI.addEventListener('click', () => {
        UIManager.logEvent("Game saved!"); 
        GameManager.save();
        UIManager.showMessageModal("Game Saved", "Your progress has been saved to your browser."); 
    });
    modalCloseButton.addEventListener('click', () => messageModal.classList.add('hidden'));
    dungeonExploreButton.addEventListener('click', () => ActionHandler.dungeonExplore());
    dungeonRestButton.addEventListener('click', () => ActionHandler.dungeonRest());
    dungeonFleeButton.addEventListener('click', () => ActionHandler.dungeonFlee());
    bondSpiritButton.addEventListener('click', () => ActionHandler.attemptBondSpirit());
    declineSpiritButton.addEventListener('click', () => ActionHandler.declineBondSpirit());
    itemBagButtonUI.addEventListener('click', () => UIManager.openItemBag());
    closeItemBagButton.addEventListener('click', () => UIManager.closeItemBag());
    buyTab.addEventListener('click', () => UIManager.switchShopTab('buy'));
    sellTab.addEventListener('click', () => UIManager.switchShopTab('sell'));
    closeShopButton.addEventListener('click', () => UIManager.closeShopModal());
    manageCompanionsButtonUI.addEventListener('click', () => UIManager.openManageCompanionsModal());
    closeManageCompanionsButton.addEventListener('click', () => UIManager.closeManageCompanionsModal());
    viewPastDeathsButtonUI.addEventListener('click', () => UIManager.openDeathMessagesModal());
    closeDeathMessagesButton.addEventListener('click', () => UIManager.closeDeathMessagesModal());
    newGameFromDeathButton.addEventListener('click', () => {
        GameManager.startNewGame(); 
    });
    viewPastDeathsFromDeathButton.addEventListener('click', () => UIManager.openDeathMessagesModal());
    closeGuildHallButton.addEventListener('click', () => UIManager.closeGuildHallModal());
    completeGuildQuestButton.addEventListener('click', () => ActionHandler.completeGuildQuest());

    // --- Initial game setup ---
    GameManager.init();
});
