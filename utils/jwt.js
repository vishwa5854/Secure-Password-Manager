const JWT           = require('jsonwebtoken');
const JWTSigningKey = require('../env').JWTSigningKey;

/**
 * This method generates a JWT token for a newly signed up user
 * @param {Object} user 
 */
const generateJWTToken = (user) => {
    try {
        let token = JWT.sign(user, JWTSigningKey, { expiresIn: '10d' });
        return token;
    } catch (err) {
        console.error('Error while generating the JWT token');
        console.error(err);
        throw err;
    }
}

/**
 * This function intercepts every API call and validates for the valid JWT token
 * @param {Request} req 
 * @param {Response} res 
 * @param {function} next 
 */
const validateJWTToken = (req, res, next) => {
    try {
        /** Parsing the JWT token from the request headers */
        const token = req.header("Authorization");

        JWT.verify(token, JWTSigningKey, (error, decoded) => {
            if (error) {
                /** Invalid token */
                res.status(401).json({
                    'status'  : 'error',
                    'message' : 'Kindly login to access this resource'
                });
                console.error(error);
            } else {
                /** Adding a user object with their details to be used in other API's */
                req.user = decoded;
                /** Delegating the user request flow to the next route or path */
                next();
            }
        });
    } catch (err) {
        /** There is no token present on the request */
        res.status(401).json({
            'status': 'error',
            'message': 'Kindly login to access this resource'
        });
    }
}

module.exports = {
    generate : generateJWTToken,
    validate :  validateJWTToken
}