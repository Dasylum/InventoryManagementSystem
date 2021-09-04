const jwt = require('jsonwebtoken');
const { errorHandler } = require('../middlewares');

function sign(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d',
        }, (error, token) => {
            if (error) return reject(error)
            return resolve(token)
        })
    })
}

function verify(req, res, next) {
    try {
        if(req.headers['authorization']){
            const token = req.headers['authorization'].split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if(error){
                    throw error;
                }
                next();
            })
        }
        else{
            let error = new Error();
            error.message = "Unauthorized"
            throw error;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sign,
    verify
}