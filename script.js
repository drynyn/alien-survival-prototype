// script.js
let resourceCount = 0;
let harvesterCount = 0;
let resourcePerSecond = 0;

// Function to update the resource display
function updateResources() {
    document.getElementById('resource-count').textContent = resourceCount;
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

// Function for idle resource gathering
function idleResourceGathering() {
    resourceCount += resourcePerSecond;
    updateResources();
}

// Run the idle gathering every second
setInterval(idleResourceGathering, 1000);

// Initial call to display the resources
updateResources();
