const getData = require('../Functions/getData');
const joinArgs = require('../Functions/joinArgs');
const fetchAPI = require('../Functions/fetchAPI');
const generateEmbedColor = require('../Functions/generateEmbedColor');

const embed_data = getData('embed');
const langs_data = getData('translate_langs');
const config = getData('config');

module.exports.run = (e, args, Client) => {
  let key = config.lang_token;
  let arg = joinArgs(args, 1);
  let text = encodeURIComponent(arg);
  let word1 = args[0].toLowerCase();
  let language = langs_data[word1] || Object.values(langs_data).find(lang => lang === word1);

  if(!language) return '🇽 This language name/code is invalid, formatted incorrect, or not supported. :(';
  let lang = Object.keys(langs_data).find(langCode => langs_data[langCode] === language);

  let api_url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=${lang}`;

  let messageError = (err = '🇽 An error has occurred :(') => e.channel.send(err).catch(console.error);
  let sentError = error => {
    messageError();
    console.error(error);
  };

  fetchAPI(api_url).then(fetched => {
    if(fetched.code !== 200) {
      console.log(`An error has been thrown: [Invalid Status Code: ${fetched.code}]`);
      return messageError();
    }

    let translation = fetched.text[0];
    if(translation.length <= 1024 && arg.length <= 1024) {
      let embed = new Discord.RichEmbed();
      let color = generateEmbedColor();

      embed.setTitle(`🈵 Translate (${fetched.lang})`);
      embed.addField('Input', arg);
      embed.addField('Output', translation);
      embed.setFooter(embed_data.default_footer);
      embed.setColor(color);

      e.channel.send({embed}).catch(console.error);
    }else if(translation.length <= 1997) {
      e.channel.send(`🈵 ${translation}`).catch(console.error);
    }else if(translation.length <= 2000) {
      e.channel.send(translation).catch(console.error);
    } else if(translation.length <= 3997) {
      let message1 = translation.substring(0, 1997);
      let message2 = translation.substring(1997);
      
      e.channel.send(message1).catch(sentError).then(() => e.channel.send(message2).catch(sentError));
    } else {
      messageError('🇽 Translation exceeds character limit of 3997 :(');
      console.log('An error has been thrown: [Translation exceeds character limit of 3997]');
    }
  }).catch(() => {
    messageError();
  });
};