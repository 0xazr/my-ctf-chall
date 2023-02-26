const express        = require('express');
const router         = express.Router();
const bot            = require('../helper/bot');

let db;

const response = data => ({ message: data });

router.get('/', (req, res) => {
	return res.render('index.html');
});

router.post('/visit', async (req, res) => {
    try {
        const { url } = req.body;
        if (url) {
            await bot.visit(url)
            .then(() => res.send({
                "message": "Paste reported. Admin will check it soon.",
                "success": "true"
            }))
            .catch(() => res.status(404).send(response('An error occurred')));
        } else {
            return res.status(401).send(response('Please fill out all the required fields!'));
        }
    } catch (error) {
        return res.status(500).send(response('Internal server error'));
    }
})

module.exports = database => { 
	db = database;
	return router;
};