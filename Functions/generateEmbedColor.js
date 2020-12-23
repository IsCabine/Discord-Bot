const getData = require('./getData');
const color_data = getData('colors');
const embed_data = getData('embed');

module.exports = () => color_data[embed_data.colors.random()];