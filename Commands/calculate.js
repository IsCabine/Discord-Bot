const Discord = require('discord.js');
const joinArgs = require('../Functions/joinArgs');
const mathjs = require('mathjs');
const generateEmbedColor = require('../Functions/generateEmbedColor');

const color_data = require('../Functions/getData')('colors');

module.exports.run = (e, args, Client) => {
  const embed = new Discord.RichEmbed();
  const input = joinArgs(args, 0);
  let color, output;

  embed.setTitle('\📐 Calculate');
  embed.addField('Input', input || "None");

  if(args.length > 0) {
    try {
      output = mathjs.evaluate(input).toString();
      color = generateEmbedColor();
    } catch(err) {
      color = color_data.RED;
      output = 'Syntax Error';
    }
  } else {
    color = color_data.RED;
    output = 'Calculate command requires an expression';
  }

  embed.addField('Output', output);
  embed.setColor(color);

  return { embed };
};