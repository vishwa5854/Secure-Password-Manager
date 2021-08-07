const mongoose = require('mongoose');
const dbUrl    = require('../env').DB_URL;

const initialiseDbConnection = () => {
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
        if (err) {
            console.error(`Couldn't connect to dB on : ${dbUrl}`);
            console.error(err);
        } else {
            console.log("Established a connection to dB");
        }
    });

    mongoose.connection.on('open', () => {
        console.log(`Succesfully connected to db`);
    });
}

module.exports = { initialiseDbConnection };