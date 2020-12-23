const Discord = require('discord.js');
const joinArgs = require('../Functions/joinArgs');
const mathjs = require('mathjs');
const generateEmbedColor = require('../Functions/generateEmbedColor');

const color_data = require('../Functions/getData')('colors');

module.exports.run = (e, args, Client) => ***REMOVED***
  const embed = new Discord.RichEmbed();
  const input = joinArgs(args, 0);
  let color, output;

  embed.setTitle('\📐 Calculate');
  embed.addField('Input', input || "None");

  if(args.length > 0) ***REMOVED***
    try ***REMOVED***
      output = mathjs.evaluate(input).toString();
      color = generateEmbedColor();
    ***REMOVED*** catch(err) ***REMOVED***
      color = color_data.RED;
      output = 'Syntax Error';
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
    color = color_data.RED;
    output = 'Calculate command requires an expression';
  ***REMOVED***

  embed.addField('Output', output);
  embed.setColor(color);

  return ***REMOVED*** embed ***REMOVED***;
***REMOVED***;