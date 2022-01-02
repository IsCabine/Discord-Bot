const embed_data = require('../Functions/getData')('embed');
const Discord = require('discord.js');
const generateEmbedColor = require('../Functions/generateEmbedColor');
const joinArgs = require('../Functions/joinArgs');

module.exports.run = (e, args, Client) => {
  let arg = joinArgs(args);
  let embed = new Discord.RichEmbed();
  let output = arg.reverse();
  let color = generateEmbedColor();

  if(arg.length <= 1024) {
    embed.setTitle(`🔃 Reverse`);
    embed.addField('Input', arg);
    embed.addField('Output', output);
    embed.setFooter(embed_data.default_footer);
    embed.setColor(color);

    return { embed };
  } else {
    return `🔃 ${output}`;
  }
};