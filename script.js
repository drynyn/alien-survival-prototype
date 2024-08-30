// script.js

let resourceCount = 0;
let unlockedTech = ['basic-survival']; // Initially, only the basic survival kit is unlocked
const techTree = [
    { id: 'basic-survival', name: 'Basic Survival Kit', description: 'Unlock basic tools and supplies to survive.', cost: { resources: 5 }, prerequisites: [] },
    { id: 'water-purifier', name: 'Water Purifier', description: 'A device to purify alien water for safe drinking.', cost: { resources: 10 }, prerequisites: ['basic-survival'] },
    { id: 'food-grower', name: 'Food Grower', description: 'A small hydroponic unit to grow food.', cost: { resources: 15 }, prerequisites: ['basic-survival'] },
    { id: 'basic-harvester', name: 'Basic Harvester', description: 'A machine to gather resources automatically.', cost: { resources: 20 }, prerequisites: ['water-purifier', 'food-grower'] },
    { id: 'solar-panel', name: 'Solar Panel', description: 'Generates energy from sunlight to power machines.', cost: { resources: 30 }, prerequisites: ['basic-harvester'] },
    { id: 'advanced-research-lab', name: 'Advanced Research Lab', description: 'Unlocks advanced technologies by studying alien materials.', cost: { resources: 50 }, prerequisites: ['solar-panel'] },
    { id: 'alien-communication', name: 'Alien Communication Device', description: 'A device to send signals to your home planet or communicate with alien life.', cost: { resources: 100 }, prerequisites: ['advanced-research-lab'] }
];

function updateResources() {
    document.getElementById('resource-count').textContent = resourceCount;
    document.getElementById('build-harvester').disabled = resourceCount < 10;
}

function canUnlockTech(tech) {
    return tech.prerequisites.every(prereq => unlockedTech.includes(prereq)) && resourceCount >= tech.cost.resources;
}

function unlockTech(techId) {
    const tech = techTree.find(t => t.id === techId);
    if (canUnlockTech(tech)) {
        resourceCount -= tech.cost.resources;
        unlockedTech.push(tech.id);
        updateResources();
        renderTechTree();
    }
}

function renderTechTree() {
    const techList = document.getElementById('tech-list');
    techList.innerHTML = '';

    techTree.forEach(tech => {
        const techItem = document.createElement('div');
        techItem.className = 'tech-item';
        techItem.innerHTML = `
            <p><strong>${tech.name}</strong>: ${tech.description}</p>
            <p>Cost: ${tech.cost.resources} resources</p>
            <button ${!canUnlockTech(tech) ? 'disabled' : ''} onclick="unlockTech('${tech.id}')">
                Unlock
            </button>
        `;
        techList.appendChild(techItem);
    });
}

document.getElementById('gather-resources').addEventListener('click', function() {
    resourceCount += 1;
    updateResources();
});

document.getElementById('build-harvester').addEventListener('click', function() {
    if (resourceCount >= 10) {
        resourceCount -= 10;
        unlockTech('basic-harvester');
    }
});

function idleResourceGathering() {
    resourceCount += 1; // Simplified for the prototype
    updateResources();
}

setInterval(idleResourceGathering, 1000);

updateResources();
renderTechTree();
