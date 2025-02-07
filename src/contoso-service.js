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
                'ARRAffinity=6aa9de1849984fc20ab00fee1f8a1ffc08885c40b0a9f32af11d32027b98a51e; ARRAffinitySameSite=6aa9de1849984fc20ab00fee1f8a1ffc08885c40b0a9f32af11d32027b98a51e; AppServiceAuthSession=Yy/irIWIvBzyqpahm+jrgDK0xXdMJ+RSB+Uo0oCbCUOakLXEqXBdTC+PqpeojtnjNZ1Dy4OlPu3o4Px66Q5BuVBBVb/YX1C4t933Il2srMRf3xyUcqBU3JhK3GYlZr3QRuIe18eeEqHTdVq8OyTQgUH+drviIl6ZVmgv3HM5rZMOJLuHUwU+2UOyWLwFLosOOBm/U1x+ngKYJr1GpLUsAiWitmUUuK312WSzm7HfsCij0BJ/bpG6LzxdnADy2WUZ5881H5f+JGn6VJXdn5hsgrb3LDja75k3lJrtfWEEvFMHpS5cKiG6FP0Aj8r29gFTDrGrA31ZcNm+ZtUxshyIuNZ63sMPftVWftNnG7By7XqxFWBEKe3a2Cc8iia+FA/j0CMTq3YIULrfuScHsT/YAlODEaysiPHxKajjs48W6xAMv80aLPv8ncL2eoljDhPUGpvzDbcIIadNnE7IRmspArROGZQKaeqjnkJN2m0i71cj9vRGC0HoRH3wyZCLYAncxEbS4st5yea3NUqgjY5KkU3ek1d8dgIyWfJIRbJp9AdWV8dYYEwuKpS1DOsEFrlIkAjP4HSFL+MxkAuf2i5tPt4syHV2yyyzjUzxGPmiXNqbdjOrGsuEgATnFNB+5o5/DULLrYmYPi7+NetPJV/Nax/hpokyxNs2DPZL49PIxM7ZeaTa9iL2+K+PzgaX/CFdFHzGFD9pnyrKGyf06t3Fsgu+pYlp3ia5eqFoRLlTOhHTy5SDSdxbq0sFX+xwJl41+AzUIZpXhcUzlteZW0jCAY+G25qTf0Tn8v3FHanPyZMwXAfUpzP2nCsZkIexzE32e4oQfMOO3rolXpeFEgw23ZEGaBjdsqrlBiqABdWunhk=',
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
