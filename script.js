// script.js

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
