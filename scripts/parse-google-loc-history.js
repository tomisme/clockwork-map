#!//usr/bin/node
const fs = require("fs");

const args = process.argv.slice(2);
const locHistoryFilename = args[0];
const contents = fs.readFileSync(locHistoryFilename);
const jsonContent = JSON.parse(contents);

const locations = jsonContent.locations.splice(1000000);

const processedLocations = jsonContent.locations.map((location) => {
  return {
    timestamp: parseInt(location.timestampMs),
    longitude: location.longitudeE7 / 10000000,
    latitude: location.latitudeE7 / 10000000,
    accuracy: location.accuracy
  }
})

console.log(processedLocations[0])
console.log(processedLocations[100])
