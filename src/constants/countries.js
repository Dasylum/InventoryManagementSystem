const fs = require('fs');
const Papa = require('papaparse');
const path = require('path');

const csvData = fs.readFileSync(
    path.join(__dirname, "..", "..", 'db', 'db', 'sources', 'countries.csv'),
    'utf8'
);

const countries = Papa.parse(csvData, {
    header: true,
})

module.exports = countries.data.map(({"English Name": name}) => {
    if (name) return {name}
})