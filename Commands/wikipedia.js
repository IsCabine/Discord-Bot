const wikipedia = require('wikipedia');
const Discord = require('discord.js');
const joinArgs = require('../Functions/joinArgs');
const embed_data = require('../Functions/getData')('embed');

module.exports.run = (e, args, Client) => ***REMOVED***
    (async () => ***REMOVED*** 
        try ***REMOVED***
            const page = await wikipedia.page(joinArgs(args));
            const summary = await page.summary();
            const url = summary.content_urls.desktop.page;
            let extract = summary.extract;

            if(extract.length > 2048)
                extract = `$***REMOVED***extract.substring(0, 2045)***REMOVED***...`;

            const embed = new Discord.RichEmbed()
                .setAuthor('📄 Wikipedia')
                .setTitle(summary.title)
                .setDescription(extract)
                .setURL(url)
                .setThumbnail(summary.thumbnail.source)
                .setFooter(embed_data.default_footer);

            e.channel.send(***REMOVED*** embed ***REMOVED***);
        ***REMOVED*** catch(error) ***REMOVED***
            e.channel.send('🇽 Article not found / unreadable');
        ***REMOVED***
    ***REMOVED***)();
***REMOVED***;