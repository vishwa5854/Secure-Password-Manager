const router     = require('express').Router();
const Iwr        = require('../services/iwr');
const validators = require('../validators/iwr');

router.get('/all', async (req, res) => {
    try {
        let all = await Iwr.getAll(req.user._id);

        res.status(200).json({ status : 'success', data : { docs : all } });
    } catch (err) {
        res.status(500).json({ status : 'error', message : err.message });
    }
});

router.post('/add', validators.newEntryValidator, async (req, res) => {
    try {
        let _id = await Iwr.add(req.body, req.user._id);

        res.status(200).json({ status : 'success', data : { _id } });
    } catch (err) {
        res.status(500).json({ status : 'error', message : err.message });
    }
});

router.patch('/update/:iwrId', validators.updateValidator, async (req, res) => {
    try {
        let iwrId = req.params.iwrId;
    
        await Iwr.update(iwrId, req.body);
    
        res.status(200).json({ status : 'success' });
    } catch (err) {
        res.status(500).json({ status : 'error', message : err.message });
    }
});

router.delete('/delete/:iwrId', validators.deleteValidator, async (req, res) => {
    try {
        let iwrId = req.params.iwrId;

        await Iwr.delete(iwrId);
    
        res.status(200).json({ status : 'success' });
    } catch (err) {
        res.status(500).json({ status : 'error', message : err.message });
    }
});

module.exports = router;