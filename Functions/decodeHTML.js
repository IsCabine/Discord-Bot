const html_data = require('./getData')('html_entities');

module.exports = text => {
    for(let i in html_data) {
        text = text.replaceAll(i, html_data[i]);
        // text = text.split(i).join(html_data[i]);
    }
    
    return text;
};