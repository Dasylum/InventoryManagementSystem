const app = require('express')();

const db = require('./db/db');

app.listen(8080, () => {
    console.log("Server running on port 8080...")
})