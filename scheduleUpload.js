
/* test data som körts i postman, (grupp 3 WS-REST 17 gruppen.) Funkar även med flera lektioner i en array
{
    "context_code": "group_155510",
    "title": "Julafton",
    "location_name": "Farmor",
    "description": "äta julmat, träffa tomten",
    "start_at": "2023-12-24T10:00:00Z",
    "end_at": "2023-12-24T12:00:00Z",
    "token": "3755~dUCiGlfsC3tsm8yDBBeqcXBbzjLYWxNFO5aDUZN6T9YGZ9tW7f23J4MriNijqQ3q"
}
*/

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.use(express.json());

router.post('/saveSchema', async (req, res, next) => {
    try {
        let { body } = req;

        if (!Array.isArray(body) || body.length === 0) {
            body = [body];
        }

        const results = await Promise.all(body.map(async (event) => {
            const {
                context_code,
                title,
                location_name,
                description,
                start_at,
                end_at,
                token
            } = event;

            const apiCanvas = 'https://ltu.instructure.com/api/v1/calendar_events.json';

            const formData = new URLSearchParams();
            formData.append('calendar_event[context_code]', context_code);
            formData.append('calendar_event[title]', title);
            formData.append('calendar_event[location_name]', location_name);
            formData.append('calendar_event[description]', description);
            formData.append('calendar_event[start_at]', start_at);
            formData.append('calendar_event[end_at]', end_at);

            try {
                const response = await fetch(apiCanvas, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                return await response.json();
            } catch (error) {
                console.error('Error:', error);
                return { error: 'Error creating event' };
            }
        }));

        res.status(201).json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;