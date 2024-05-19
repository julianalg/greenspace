import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import Anthropic from '@anthropic-ai/sdk';
import { env } from 'process';
import Axios from 'axios'

dotenv.config();

const getPrompt = async (character, data) => {
  try {
    const response = await Axios.post('https://api.openai.com/v1/chat/completions', {
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": "You are a city planner for " + city + ". You are tasked with making green spaces. Given that the city has a " + character + " of " + data + " what should be considered about building greenspaces?"
        },
      ]
      }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer OPENAIKEY' 
      }
    });
    console.log(response.data.choices[0].message.content);
    return  response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
};

const port = 3000;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  express.static("node_modules/bootstrap/dist/")
);

const getPrediction = async (town) => {
  
  Axios.get('http://127.0.0.1:5000/' + town)
  .then(response => {
    console.log(response)
    // return response; 
  })
  .catch(error => {
    console.error(error);
  });
  
}

// Define the endpoint
app.get('/prompt', async (req, res) => {
  try {
    const prompt = await getPrompt();
    res.send(prompt);
  } catch (error) {
    res.status(500).send('Error communicating with the API');
  }
});


let city = "Pasadena";
let temperature = 0;
let airQuality = 0;
let population = 0;
let density = 50;
let precipitation = 0;
let landUse = 0;
let cities = [];

app.get('/', (req, res) => {
  Axios.get("http://127.0.0.1:5000/cities").then(response => {
      // Extracting just the values from the JSON object and converting it to an array
      cities = Object.values(response.data);
      console.log(cities);
      
      // Render the page after retrieving and processing the data
      res.render('index.ejs', {
        temperature: temperature,
        airQuality: airQuality,
        population: population,
        density: density,
        precipitation: precipitation,
        landUse: landUse,
        cities: cities
      });
  })
  .catch(error => {
    console.error(error);
    // If there's an error, render the page with empty cities array
    res.render('index.ejs', {
      temperature: temperature,
      airQuality: airQuality,
      population: population,
      density: density,
      precipitation: precipitation,
      landUse: landUse,
      cities: cities
    });
  });
});

app.get('/prompttemperature', async (req, res) => {
  try {
    const prompt = await getPrompt("temperature", temperature);
    res.send(prompt);
  } catch (error) {
    res.status(500).send('Error communicating with the API');
  }
});
app.get('/promptairquality', async (req, res) => {
  try {
    const prompt = await getPrompt("air quality", airQuality);
    res.send(prompt);
  } catch (error) {
    res.status(500).send('Error communicating with the API');
  }
});
app.get('/promptpopulation', async (req, res) => {
  try {
    const prompt = await getPrompt("population", population);
    res.send(prompt);
  } catch (error) {
    res.status(500).send('Error communicating with the API');
  }
});
app.get('/promptdensity', async (req, res) => {
  try {
    const prompt = await getPrompt("density", density);
    res.send(prompt);
  } catch (error) {
    res.send(error)
  }
});




app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


