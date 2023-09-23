const User          = require('../models/user').User;
const bcrypt        = require("bcryptjs");
const generateToken = require('../utils/jwt').generate;

const createNewUser = async (user) => {
    try {
        /** Let's hash the password before saving it */
        user.password = await bcrypt.hash(user.password, 2);

        console.log(`Creating a new user with user name ${user.userName}`);

        /** Creating a new user in the database */
        await new User(user).save();

        console.log(`Created a new user with user name ${user.userName}`);
    } catch (err) {
        console.error(`Error while creating a new user in service layer`);

        /** Sending custom errors instead of mongoose errors */
        if (err.message.startsWith('E11000 duplicate key error collection: iwr.user index: userName_1 dup key')) {
            err.message = 'User name already exists';
        } else if (err.message.startsWith('E11000 duplicate key error collection: iwr.user index: email_1 dup key')) {
            err.message = 'Email already exists';
        }

        throw err;
    }
}

const validateUserCredentials = async (user) => {
    try {
        let { userName, password } = user;

        /** Fetching the existing user password from the dB */
        let userFromDb = await User.findOne({ userName : userName }, 'password');

        /** If no user found */
        if (!userFromDb) {
            throw new Error('User not found');
        } else {
            let validCredentials = await bcrypt.compare(password, userFromDb.password);

            if (!validCredentials) {
                throw new Error('Invalid password');
            } else {
                /** Generating a new JWT token for authorization */
                return generateToken({ userName, _id : userFromDb["_id"] });
            }
        }
    } catch (err) {
        console.error(`Error while validating user credentials in service layer`);
        throw err;
    }
}

module.exports = {
    create   : createNewUser,
    validate : validateUserCredentials
};
