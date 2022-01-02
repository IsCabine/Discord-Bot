const request = require('request');
const Discord = require('discord.js');
const joinArgs = require('../Functions/joinArgs');
const { JSDOM } = require('jsdom');
const generateEmbedColor = require('../Functions/generateEmbedColor');
const embed_data = require('../Functions/getData')('embed');
const decodeHTML = require('../Functions/decodeHTML');

module.exports.run = (e, args, Client) => {
    const joined = joinArgs(args);
    const link = `http://songsear.ch/q/${encodeURIComponent(joined)}`;

    request(link, (err, response, body) => {
        if(err) {
            e.channel.send('An Error has Occured.').catch(new Function());
            throw new Error('Cannot Get Page in Lyrics Command');
        }

        let lyricPage = new JSDOM(body);
        let lyricWindow = lyricPage.window;
        let lyricDocument = lyricWindow.document;

        let heads = lyricDocument.getElementsByClassName('head');
        let result = new Array();

        for(let i = 0; i < 5 && i < heads.length; i++) {
            let title = decodeHTML(heads[i].getElementsByTagName('h2')[0].firstChild.innerHTML);
            let author = decodeHTML(heads[i].getElementsByTagName('h3')[0].innerHTML
                .replace('<span class="by">by</span>', new String())
                .replace('<b>', new String()).replace('</b>', new String())
                .replace(/ /g, new String()).replace(/\t/g, new String()));

            result.push([title, `By ${author}`, false]);
        }
      
        const embed = new Discord.RichEmbed()
            .setTitle('\\🎵 FindSong')
            .setColor(generateEmbedColor())
            .setFooter(embed_data.default_footer)
            .setDescription(`**Input:** ${joined}`);
        
        for(let i of result)
            embed.addField(...i);

        e.channel.send(result.length > 0 ? { embed } : 'No Songs Found').catch(console.error);
    });
}