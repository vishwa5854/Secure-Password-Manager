const router = require('express').Router();
const addNewEntry = require('../services/iwr').addNew;

router.get('/all', async (req, res) => {});

router.post('/add', async (req, res) => {
    await addNewEntry(req.body);
});

router.patch('/update', async (req, res) => {});

router.delete('/delete', async (req, res) => {});

module.exports = router;