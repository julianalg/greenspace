import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const port = 3000;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  express.static("node_modules/bootstrap/dist/")
);

const runPrompt = async () => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
  }
};

let temperature = 0;
let airQuality = 0;
let population = 0;
let childrenAndPets = 0;
let existingVegetation = 0;
let precipitation = 0;
let mentalHealth = 0;
let landUse = 0;

app.get('/', (req, res) => {
  res.render('index.ejs', {
    temperature: temperature,
    airQuality: airQuality,
    population: population,
    childrenAndPets: childrenAndPets,
    existingVegetation: existingVegetation,
    precipitation: precipitation,
    mentalHealth: mentalHealth,
    landUse: landUse
  });
});

app.get('/temperature', (req, res) => {
  runPrompt();
  res.send('Temperature request processed');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});