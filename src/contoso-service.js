const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle the POST request
app.post('/proxy', async (req, res) => {
    try {
        const cookie = `${req.body.cookie}`;
        delete req.body.cookie;

        const response = await axios.post('https://chat.beyonder.tools/conversation', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie,
            }
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            res.status(500).json({ message: 'No response received from the server', error: error.message });
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).json({ message: 'Error in making the request', error: error.message });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
