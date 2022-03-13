"use strict";

let cors = require('cors');

class Cors {
    constructor() {
        this.corsConfiguration = (app) => {
            app.use((req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', '*');
                res.setHeader('Strict-Transport-Security', 'max-age=157680000');
                res.setHeader('X-Frame-Options', 'DENY');
                res.setHeader('X-XSS-Protection', '1; mode=block');
                next();
            })
        }
    }
}

module.exports = Cors;
