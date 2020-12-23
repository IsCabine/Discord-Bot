const request = require('request');

module.exports = url => ***REMOVED***
  let promise = new Promise((resolve, reject) => ***REMOVED***
    request(url, (error, response, body) => ***REMOVED***
      if(error) ***REMOVED***
        reject();
        console.log(`[$***REMOVED***Date.now()***REMOVED***] Error recieved from request module:`);
        throw new Error(error);
      ***REMOVED***
  
      try ***REMOVED***
        let json = JSON.parse(body);
        resolve(json);
      ***REMOVED*** catch(err) ***REMOVED***
        reject();
        console.log(`[$***REMOVED***Date.now()***REMOVED***] JSON [$***REMOVED***body***REMOVED***] is invalid.`);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***);

  return promise;
***REMOVED***