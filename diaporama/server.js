const express = require('express');
const fetch = require('node-fetch'); // Pour faire des requêtes HTTP depuis Node.js

const app = express();
const port = 3000;

app.use(express.json());

app.get('/medias/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await fetch(`http://${IPAPI}:${portAPI}/medias/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'API-Key': clefAPI,
            },
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
