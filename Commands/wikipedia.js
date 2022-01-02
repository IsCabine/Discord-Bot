const wikipedia = require('wikipedia');
const Discord = require('discord.js');
const joinArgs = require('../Functions/joinArgs');
const embed_data = require('../Functions/getData')('embed');

module.exports.run = (e, args, Client) => {
    (async () => { 
        try {
            const page = await wikipedia.page(joinArgs(args));
            const summary = await page.summary();
            const url = summary.content_urls.desktop.page;
            let extract = summary.extract;

            if(extract.length > 2048)
                extract = `${extract.substring(0, 2045)}...`;

            const embed = new Discord.RichEmbed()
                .setAuthor('📄 Wikipedia')
                .setTitle(summary.title)
                .setDescription(extract)
                .setURL(url)
                .setThumbnail(summary.thumbnail.source)
                .setFooter(embed_data.default_footer);

            e.channel.send({ embed });
        } catch(error) {
            e.channel.send('🇽 Article not found / unreadable');
        }
    })();
};