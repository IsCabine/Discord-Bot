const path = require('path');
const fs = require('fs');

module.exports = (dir, callback, root = path.join(__dirname, '..')) => ***REMOVED***
  if(!fs.existsSync(`$***REMOVED***dir***REMOVED***/`)) throw new Error(`Directory [$***REMOVED***dir***REMOVED***] not found from [$***REMOVED***root***REMOVED***]`);
  const directory = fs.readdirSync(path.join(root, dir));
  directory.forEach(callback);
***REMOVED***;