import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { env } from 'process';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});


const port = 3000;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  express.static("node_modules/bootstrap/dist/")
);
const getPrompt = async (character, data, town) => {
  console.log("Running getPrompt...");
    const msg = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 2000,
      temperature: 0,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'You are a city planner for the city of Los Angeles. You have to consider building further greenspace in the town of ' + town + ". Given that this city has a " + character + " of " + data + ", why should greenspace be build in this region?"
            },
          ],
        },
      ],
    });
    console.log('API response:', msg);
    return msg.content[0].content[0].text;
  };  
  
  // Define the endpoint
  app.get('/prompt', async (req, res) => {
    try {
      const prompt = await getPrompt();
      res.send(prompt);
    } catch (error) {
      res.status(500).send('Error communicating with the API');
    }
  });
  
  
  let town = "Pasadena";
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

  app.get('/temperature-prompt', async (req, res) => {
    try {
      const prompt = await getPrompt("temperature", temperature);
      res.send(prompt);
    } catch (error) {
      res.status(500).send('Error communicating with the API');
    }
  });
  
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  