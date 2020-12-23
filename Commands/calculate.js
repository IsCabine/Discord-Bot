const Discord = require('discord.js');
const joinArgs = require('../Functions/joinArgs');
const mathjs = require('mathjs');
const generateEmbedColor = require('../Functions/generateEmbedColor');

const color_data = require('../Functions/getData')('colors');

module.exports.run = (e, args, Client) => ***REMOVED***
  const embed = new Discord.RichEmbed();
  const input = joinArgs(args, 0);
  let color;

  embed.setTitle('\📐 Calculate');
  embed.addField('Input', input);

  try ***REMOVED***
    const output = mathjs.evaluate(input).toString();
    color = generateEmbedColor();

    embed.addField('Output', output);
    embed.setColor(color);
  ***REMOVED*** catch(err) ***REMOVED***
    color = color_data.RED;
    embed.setColor(color);
    embed.addField('Output', 'Syntax Error');
  ***REMOVED***

  return ***REMOVED*** embed ***REMOVED***;
***REMOVED***;