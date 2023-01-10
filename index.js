require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json())
app.use(cors())
const port = process.env.API_PORT || 8087;


const configuration = new Configuration({
    organization: 'org-auFlb8jXAWyNqMf63GRMuP1m',
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);


// create a simple express api that calls the function above

app.post('/', async (req, res) => {
    const { message, currentModel } = req.body;
    console.log(message, "message");
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5
    });

    res.json({
        message: response.data.choices[0].text,
    })
});

app.get('/models', async (req, res) => {
   const response = await openai.listEngines();
   console.log(response.data.data);
   res.json({
       models: response.data.data
   })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
