module.exports = function(action) ***REMOVED***
  if(typeof action !== 'function') ***REMOVED***
    throw new TypeError('Argument 0 of <Array>.return must be of type \'Function\'');
  ***REMOVED***

  let res = new Array();
  this.forEach(item => ***REMOVED***
    res.push(action(item));
  ***REMOVED***);

  return res;
***REMOVED***;