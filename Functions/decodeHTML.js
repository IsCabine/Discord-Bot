const html_data = require('./getData')('html_entities');

module.exports = text => ***REMOVED***
    for(let i in html_data) ***REMOVED***
        text = text.replaceAll(i, html_data[i]);
        // text = text.split(i).join(html_data[i]);
    ***REMOVED***
    
    return text;
***REMOVED***;