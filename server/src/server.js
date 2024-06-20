// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

const apiKey = 'your_openai_api_key';

app.use(express.json());
app.use(cors());

app.post('/decode', (req, res) => {
    const idiom = req.body.idiom;

    axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: `What does the idiom "${idiom}" mean?`,
        max_tokens: 50
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => {
        res.json(response.data.choices[0].text.trim());
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('Something went wrong');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
