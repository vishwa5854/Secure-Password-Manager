const router = require('express').Router();
const User   = require('../services/user');

/** This route creates a new user */
router.post('/signUp', async (req, res) => {
    try {
        let user = req.body;

        /** Invalid request body */
        if (!user || !user.userName || !user.email || !user.password) {
            res.status(400).json({ status : 'error', message : 'Missing required fields.' });
        }

        await User.create(user);

        res.status(201).json({ status : 'success', message : 'created' });
    } catch (err) {
        console.error(`Error while creating a new user`);
		console.error(err);
        res.status(500).json({ status : 'error', message : err.message });
    }
});

/** This route validates user credentials and generates a token for the client */
router.post('/login', async (req, res) => {
    try {
        let user = req.body;

        /** Invalid request body */
        if (!user || !user.userName || !user.password) {
            res.status(400).json({ status : 'error', message : 'Missing username or password.' });
        }

        let token = await User.validate(user);

        res.status(200).json({ status : 'success', data : token });
    } catch (err) {
        let statusCode = 500;

        if (err.message === 'User not found') {
            statusCode = 404;
        } else if (err.message === 'Invalid password') {
            statusCode = 401;
        }

        console.error(`Error while validating user credentials`);
		console.error(err);
        
        res.status(statusCode).json({ status : 'error', message : err.message });
    }
});

module.exports = router;