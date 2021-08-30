const config = require('./config');

const app = require('./src/app.js');

app.listen(5050, () => {
    console.log(`Server running on port ${config.port}`);
})