const Iwr       = require('../models/iwr').Iwr;
const Crypto    = require('../utils/crypto');

const add = async (body, userId) => {
    try {
        let encryptedPayload = await Crypto.encrypt(JSON.stringify(body));
        
        let { _id } = await new Iwr({ payload : encryptedPayload.encrypted, iv : encryptedPayload.iv, userId }).save();
        
        return _id;
    } catch (err) {
        console.error('Error while creating a new entry');
        throw err;
    }
}

const update = async (_id, updateObject) => {
    try {
        let encryptedPayload = await Crypto.encrypt(JSON.stringify(updateObject));

        await Iwr.findByIdAndUpdate({ _id }, { payload : encryptedPayload.encrypted, iv : encryptedPayload.iv });
    } catch (err) {
        console.error(`Error while updating ${_id}`);
        throw err;
    }
}

const deleteIwr = async (_id) => {
    try {
        await Iwr.findOneAndDelete({ _id });
    } catch (err) {
        console.error(`Error while deleting ${_id}`);
        throw err;
    }
}

const getAll = async (userId) => {
    try {
        let all = await Iwr.find({ userId });

        all = JSON.parse(JSON.stringify(all));

        for (let i = 0; i < all.length; i++) {
            all[i] = JSON.parse(await Crypto.decrypt(all[i].payload, all[i].iv));
        }

        return all;
    } catch (err) {
        console.error(`Error while getting all for ${userId}`);
        throw err;
    }
}

module.exports = { add, update, delete : deleteIwr, getAll };