const Discord = require('discord.js');
const generateEmbedColor = require('../Functions/generateEmbedColor');
const joinArgs = require('../Functions/joinArgs');
const getData = require('../Functions/getData');

const embed_data = getData('embed');
const config = getData('config');

module.exports.run = (e, args, Client) => {
    if(!config.ownerIDs.includes(e.author.id)) {
        return "🇽 You do not have permission to use this command";
    }

    let input = joinArgs(args);

    let embed = new Discord.RichEmbed();
    let color = generateEmbedColor();

    embed.setTitle(`🖥️ Eval`);
    embed.addField('Input', input);
    embed.addField('Output', eval(input));
    embed.setFooter(embed_data.default_footer);
    embed.setColor(color);

    return {embed};
};