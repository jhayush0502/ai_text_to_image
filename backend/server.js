require('dotenv').config();
const express = require('express');
const { AzureOpenAI } = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = 5000;

app.use(cors());

app.use(bodyParser.json());

const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT
const AZURE_OPENAI_API_KEY =process.env.AZURE_OPENAI_API_KEY  
const DEPLOYMENT_NAME = process.env.DEPLOYMENT_NAME  

function getClient() {
  return new AzureOpenAI({
    apiKey: AZURE_OPENAI_API_KEY,
    endpoint: AZURE_OPENAI_ENDPOINT,
    apiVersion: "2024-02-01",  
    deployment: DEPLOYMENT_NAME,
  });
}

app.post("/generate", async (req, res) => {
    try {
      const { prompt, size, style } = req.body;
      const n = 1;
      console.log("Received Parameters:");
      console.log("Prompt:", prompt);
      console.log("Size:", size);
      console.log("Style:", style);
  
      const client = getClient();
      const results = await client.images.generate({
        prompt,
        size,
        n,
        style
      });
  
      res.json({ url: results.data[0].url }); 
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred while generating the image" });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
