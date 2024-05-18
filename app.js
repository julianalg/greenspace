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
  apiKey: env.ANTHROPIC_API_KEY
});


const port = 3000;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  express.static("node_modules/bootstrap/dist/")
);
const getPrompt = async () => {
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
              text: 'You are a city planner in a city of 100,000 people. You are tasked with designing a new park in a neighborhood. Given that the neighborhood\'s temperature is 90 degrees Fahrenheit, the air quality is poor, the population is 10,000, the neighborhood has many children and pets, there is existing vegetation, the precipitation is 10 inches per year, the mental health of the residents is poor, and the land use is residential, what are the most important factors to consider when designing the park?',
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
  
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  
  