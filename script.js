// script.js
let resourceCount = 0;
let harvesterCount = 0;
let resourcePerSecond = 0;
let unlockedTech = ['basic-survival']; // Initially unlocked tech

// Define the tech tree
const techTree = [
    {
        id: 'basic-survival',
        name: 'Basic Survival Kit',
        description: 'Unlock basic tools and supplies to survive.',
        cost: { resources: 5 },
        prerequisites: []
    },
    {
        id: 'water-purifier',
        name: 'Water Purifier',
        description: 'A device to purify alien water for safe drinking.',
        cost: { resources: 10 },
        prerequisites: ['basic-survival']
    },
    {
        id: 'food-grower',
        name: 'Food Grower',
        description: 'A small hydroponic unit to grow food.',
        cost: { resources: 15 },
        prerequisites: ['basic-survival']
    },
    {
        id: 'basic-harvester',
        name: 'Basic Harvester',
        description: 'A machine to gather resources automatically.',
        cost: { resources: 20 },
        prerequisites: ['water-purifier', 'food-grower']
    },
    {
        id: 'solar-panel',
        name: 'Solar Panel',
        description: 'Generates energy from sunlight to power machines.',
        cost: { resources: 30 },
        prerequisites: ['basic-harvester']
    },
    {
        id: 'advanced-research-lab',
        name: 'Advanced Research Lab',
        description: 'Unlocks advanced technologies by studying alien materials.',
        cost: { resources: 50 },
        prerequisites: ['solar-panel']
    },
    {
        id: 'alien-communication',
        name: 'Alien Communication Device',
        description: 'A device to send signals to your home planet or communicate with alien life.',
        cost: { resources: 100 },
        prerequisites: ['advanced-research-lab']
    }
];

// Function to update the resource display
function updateResources() {
    document.getElementById('resource-count').textContent = resourceCount;
    document.getElementById('harvester-count').textContent = harvesterCount;
    document.getElementById('build-harvester').disabled = resourceCount < 10;
}

// Function to manually gather resources
document.getElementById('gather-resources').addEventListener('click', function() {
    resourceCount += 1; // Increase resource count by 1
    updateResources();
});

// Function to build a harvester
document.getElementById('build-harvester').addEventListener('click', function() {
    if (resourceCount >= 10) {
        resourceCount -= 10; // Deduct resources
        harvesterCount += 1;
        resourcePerSecond += 1; // Each harvester adds 1 resource per second
        updateResources();
    }
});

// Function to check if the player can unlock a technology
function canUnlockTech(tech) {
    return tech.prerequisites.every(prereq => unlockedTech.includes(prereq)) &&
           resourceCount >= tech.cost.resources;
}

// Function to unlock a technology
function unlockTech(techId) {
    const tech = techTree.find(t => t.id === techId);
    if (canUnlockTech(tech)) {
        resourceCount -= tech.cost.resources;
        unlockedTech.push(tech.id);
        updateResources();
        renderTechTree();
    }
}

// Function to render the tech tree
function renderTechTree() {
    const techList = document.getElementById('tech-list');
    techList.innerHTML = ''; // Clear existing content

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

// Function for idle resource gathering
function idleResourceGathering() {
    resourceCount += resourcePerSecond;
    updateResources();
}

// Run the idle gathering every second
setInterval(idleResourceGathering, 1000);

// Initial call to display the resources and tech tree
updateResources();
renderTechTree();
