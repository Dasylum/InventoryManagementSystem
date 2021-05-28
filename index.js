const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app.js');

app.listen(5050, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})