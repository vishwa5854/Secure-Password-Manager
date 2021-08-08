const Iwr       = require('../models/iwr').Iwr;
const Crypto    = require('../utils/crypto');

const addNewEntry = async (iwr) => {
    try {
        // let lol = await Crypto.encrypt(JSON.stringify(iwr));
        
        // await new Iwr(lol).save();
        let obj = await Iwr.findOne({ _id : '610ec91b41bd4415fca06275' });
        
        let lol = await Crypto.decrypt(obj.payload, obj.iv);
        console.log(lol);
    } catch (err) {
        console.error('Error while creating a new entry');
        throw err;
    }
}

module.exports = {
    addNew : addNewEntry
};