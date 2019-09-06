module.exports.run = (e, args) => ***REMOVED***
  let key = config.lang_token;
  let arg = Functions.joinArgs(args, 1);
  let text = encodeURIComponent(arg);
  let word1 = args[0].toLowerCase();
  let langs = preload_data.translate_langs;
  let language = langs[word1] || Object.values(langs).find(lang => lang === word1);

  if(!language) return '🇽 This language name/code is invalid, formatted incorrect, or not supported. :(';
  let lang = Object.keys(langs).find(langCode => langs[langCode] === language);

  let api_url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=$***REMOVED***key***REMOVED***&text=$***REMOVED***text***REMOVED***&lang=$***REMOVED***lang***REMOVED***`;
  
  let messageError = (err = '🇽 An error has occurred :(') => e.channel.send(err).catch(console.error);
  let sentError = error => ***REMOVED***
    messageError();
    console.error(error);
  ***REMOVED***;

  Functions.fetchAPI(api_url).then(fetched => ***REMOVED***
    if(fetched.code !== 200) ***REMOVED***
      console.log(`An error has been thrown: [Invalid Status Code: $***REMOVED***fetched.code***REMOVED***]`);
      return messageError();
    ***REMOVED***

    let translation = fetched.text[0];
    if(translation.length <= 1024 && arg.length <= 1024) ***REMOVED***
      let embed = new Discord.RichEmbed();
      let color = Functions.generateEmbedColor();

      embed.setTitle(`🈵 Translate ($***REMOVED***fetched.lang***REMOVED***)`);
      embed.addField('Input', arg);
      embed.addField('Output', translation);
      embed.setFooter(preload_data.embed.default_footer);
      embed.setColor(color);

      e.channel.send(***REMOVED***embed***REMOVED***).catch(console.error);
    ***REMOVED***else if(translation.length <= 1997) ***REMOVED***
      e.channel.send(`🈵 $***REMOVED***translation***REMOVED***`).catch(console.error);
    ***REMOVED***else if(translation.length <= 2000) ***REMOVED***
      e.channel.send(translation).catch(console.error);
    ***REMOVED*** else if(translation.length <= 3997) ***REMOVED***
      let message1 = translation.substring(0, 1997);
      let message2 = translation.substring(1997);
      
      e.channel.send(message1).catch(sentError).then(() => e.channel.send(message2).catch(sentError));
    ***REMOVED*** else ***REMOVED***
      messageError('🇽 Translation exceeds character limit of 3997 :(');
      console.log('An error has been thrown: [Translation exceeds character limit of 3997]');
    ***REMOVED***
  ***REMOVED***).catch(() => ***REMOVED***
    messageError();
  ***REMOVED***);
***REMOVED***;