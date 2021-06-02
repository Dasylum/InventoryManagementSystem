const path = require('path');
const fs = require('fs');
const Papa = require('papaparse');

const csvData = fs.readFileSync(
    path.join(__dirname, "..", "..", 'db', 'db', 'sources', 'states.csv'),
    'utf8'
);

const states = Papa.parse(csvData, {
    header: true,
})


module.exports = states.data.map(({Name: name}) => {
    if (name) return {name}
});