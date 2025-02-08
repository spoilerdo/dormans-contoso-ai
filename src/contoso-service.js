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
        const response = await axios.post('https://chat.beyonder.tools/conversation', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie':
                'ARRAffinity=3a2fd09a8218955a9d75f0d5754a43057c1c3d98af105301a8c54f762259ba11; ARRAffinitySameSite=3a2fd09a8218955a9d75f0d5754a43057c1c3d98af105301a8c54f762259ba11; AppServiceAuthSession=hawwqec5aoT/+PshnQpw9MERbAn2FphqJtw2GerMMlIEauZA/chKz7mv/AcP0cFeDvHhMY1xQVYVZLUBXV6gB4UZ7TkzvndvUUoxmYpUBsrUS4j81ljrNxemZ/nRNAwWaMGDrZ+sgdayYfJgXp32YNShHkAR0c4OJ+ljW3EfRH6/WbkyJFR/KkkFN5IZELdMgMwTYg1JpmnDd28M7ftLNx9t+D9rOPJ7YdKAmq92FmlRzLmklOV/cJzl1+vgXs50YfYKhEO2jw4ShH9fY6n2okihbYhd5Cn3nWuPHtNMus79xoeuSB+Uhgk4LrwoEJHXMebmIFz0vYjNBKg2lodWNLir/ebXA30iGsIq/pUSV1axteG6o6AEz+HpGPsReVN/yGSHSVOcRvP0lFh9BWuTmUgWLGGvvMjQgv7pnnBvDr/U29326QPtmHoAEyladZGWZpXIqE4WTJvB9NmnK42x4RSx1wLlAXWnCBDJTHv2Jqk7z979RsMam3wJq5uoVfGKJsw2LbAvfEg+8HnkormtFL6th0SXsOT65OWaHUuQ52f4WL1qSuRx7F8w2YTkkB3wq4fHY4Niew4bK4s5WQi3Xla4+/I3cqOg0THLQX6gkWuAnJfuYH0llxze1Ti41qY89XiJvZUeI0bUncmpPIPyCUYqL5sOnc9BI1B1PL5bNWufbNgBKvXClX92E4Ba0gaqCd7WDo1Av+3x90sMZ7B7wCqQMxTkBbNVCHO8RcnS4yexjLHXUzLRQXnGAZuYvlSZlAtI9HL8cGXniUIo7q6SobAqWAZqIgrIvffL/n6OyBzr5PLdqLIUPcYHgw1LpjY54svVJEj/R/DbVQNa6D9vQmRy2y5g33CWuba6/VbnOL4dTzq6dwO+GuJiXdc12zjf',
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
