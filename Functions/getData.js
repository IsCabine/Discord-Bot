const path = require('path');
const fs = require('fs');

module.exports = file => {
    const dir = file == 'config' ? ['config.json'] : ['Preload_Data', `${file}.json`];

    return JSON.parse(fs.readFileSync(path.join(__dirname, '..',  ...dir), 'utf8'));
};