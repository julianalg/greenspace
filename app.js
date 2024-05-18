const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const ejs = require('ejs');

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);

let temperature = 0;
let airQuality = 0;
let population = 0; 
let childrenAndPets = 0;
let existingVegation = 0;
let precipation = 0;
let mentalHealth = 0;
let landUse = 0;

app.get('/', (req, res) => {
    res.render('index.ejs', {temperature: temperature, airQuality: airQuality, population: population, childrenAndPets: childrenAndPets, existingVegation: existingVegation, precipation: precipation, mentalHealth: mentalHealth, landUse: landUse});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

