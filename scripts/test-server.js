#!//usr/bin/node
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require("fs");

const args = process.argv.slice(2);
const locHistoryFilename = args[0];
const contents = fs.readFileSync(locHistoryFilename);
const jsonContent = JSON.parse(contents);

// 1034296 total
const locations = jsonContent.locations.splice(1033996);

const processedLocations = locations.map((location) => {
  return {
    timestamp: parseInt(location.timestampMs),
    longitude: location.longitudeE7 / 10000000,
    latitude: location.latitudeE7 / 10000000,
    accuracy: location.accuracy
  }
})


// const fileUpload = require('express-fileupload');
// let csvToJson = require('convert-csv-to-json');
// const publicPath = path.join(__dirname, '..', 'dist');

// const defaultData = path.join(__dirname, 'data', 'Kaggle_data.csv');
// const fileDir = path.join(__dirname, 'data', 'data_set.csv');

const app = express();
const port = process.env.PORT || 3001;

// app.use(express.static(publicPath));
// app.use(fileUpload());
app.use(cors());

app.get('/api/points', (req, res) => {
  res.json(processedLocations);
})

// app.post('/api/upload', function(req, res) {
//
//   if (Object.keys(req.files).length == 0) {
//     return res.status(400).send('No files were uploaded.');
//   }
//
//   let uploadFile = req.files.file;
//
//   uploadFile.mv(fileDir, function(err) {
//     if (err)
//       return res.status(500).send(err);
//
//     res.send('File uploaded!');
//   });
// });

app.listen(port, () => {
  console.log(`server listening at ${port}`);
})
