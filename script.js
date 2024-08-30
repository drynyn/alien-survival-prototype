// script.js

let resourceCount = 0;
let mineralCount = 0; // New mineral resource
let harvesterCount = 0;
let resourcePerSecond = 0;

// Zones data
const zones = {
    1: { surveyed: false, minerals: 0 },
    2: { surveyed: false, minerals: 0 },
    3: { surveyed: false, minerals: 0 }
};

// Function to update the resource display
function updateResources() {
    document.getElementById('resource-count').textContent = resourceCount;
    document.getElementById('mineral-count').textContent = mineralCount; // Update minerals display
    document.getElementById('build-harvester').disabled = resourceCount < 10;
}

// Function to manually gather resources
document.getElementById('gather-resources').addEventListener('click', function () {
    resourceCount += 1; // Increase resource count by 1
    updateResources();
});

// Function to build a harvester
document.getElementById('build-harvester').addEventListener('click', function () {
    if (resourceCount >= 10) {
        resourceCount -= 10; // Deduct resources
        harvesterCount += 1;
        resourcePerSecond += 1; // Each harvester adds 1 resource per second
        updateResources();
    }
});

// Function for idle resource gathering
function idleResourceGathering() {
    resourceCount += resourcePerSecond;
    updateResources();
}

// Run the idle gathering every second
setInterval(idleResourceGathering, 1000);

// Function to handle zone surveys
function surveyZone(zoneId) {
    if (!zones[zoneId].surveyed) {
        // Randomly determine the amount of minerals in this zone (1 to 5)
        let mineralsFound = Math.floor(Math.random() * 5) + 1;
        zones[zoneId].minerals = mineralsFound;
        zones[zoneId].surveyed = true;
        mineralCount += mineralsFound; // Add minerals to player inventory

        document.getElementById('zone-result').textContent = `Zone ${zoneId} surveyed: Found ${mineralsFound} minerals!`;
    } else {
        document.getElementById('zone-result').textContent = `Zone ${zoneId} has already been surveyed. Found ${zones[zoneId].minerals} minerals.`;
    }

    updateResources();
}

// Add event listeners for survey buttons
const surveyButtons = document.getElementsByClassName('survey-zone');
for (let button of surveyButtons) {
    button.addEventListener('click', function () {
        let zoneId = this.getAttribute('data-zone');
        surveyZone(zoneId);
    });
}

// Initial call to display the resources
updateResources();
