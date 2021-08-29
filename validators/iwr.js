module.exports = {
    newEntryValidator : (req, res, next) => {
        if (req.body.userName && req.body.password && req.body.website) {
            next(); 
        } else { 
            res.status(400).json({ status : 'error', message : 'Invalid body' }); 
        }
    },
    updateValidator   : (req, res, next) => {
        if (req.body.userName && req.body.password && req.body.website) { 
            if (req.params.iwrId) {
                next();
            } 
        } else { 
            res.status(400).json({ status : 'error', message : 'Invalid body' });
        }
    },
    deleteValidator   : (req, res, next) => {
        if (req.params.iwrId) {
            next();
        } else {
            res.status(400).json({ status : 'error', message : 'Invalid body' });
        }
    }
}