module.exports.run = (e, args) => ***REMOVED***
  let arg = Functions.joinArgs(args);
  let key = config.dictionary_token;
  let restrictedRexExp = /\&|\?|\=|\/|\\|:|"|<|>|\||\./;
  let hasDisallowedChar = restrictedRexExp.test(arg);
  let api_url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/$***REMOVED***arg***REMOVED***?key=$***REMOVED***key***REMOVED***`;

  if(args.length < 1) return '🇽 You must supply a word to define';
  if(hasDisallowedChar) return '🇽 This word has a blocked character. :(\n   | Inputs to this command cannot contain `&, ?, =, /, \\, :, ", <, >, |, or .`'
  Functions.fetchAPI(api_url).then(fetched => ***REMOVED***
    if(fetched.length < 1) return e.channel.send(`🇽 The word \`$***REMOVED***arg***REMOVED***\` is not recognized.`);

    let maxDefinitions = index = 0;
    let names = fetched.return(def => def.meta.id.split(':')[0]);

    names.forEach(name => ***REMOVED***
      if(names[0] === name) maxDefinitions++;
    ***REMOVED***);

    let color = preload_data.colors[preload_data.embed_colors.random()];
    let runGenerateEmbed = () => generateEmbed(fetched, index, arg, maxDefinitions, color);
    let embed = runGenerateEmbed();

    e.channel.send(embed).then(message => ***REMOVED***
      if(maxDefinitions === 1) return;

      message.react('◀').then(() => message.react('▶').then(() => ***REMOVED***
        let onReactionUpdate = (reaction, user) => ***REMOVED***
          if(user.id !== e.author.id) return;
          if(reaction.message.id !== message.id) return;
          
          switch(reaction.emoji.name) ***REMOVED***
          case '◀':
            if(index === 0) index = maxDefinitions - 1;
            else index--;

            message.edit(runGenerateEmbed());
            break;
          case '▶':
            if(index + 1 === maxDefinitions) index = 0;
            else index++;
            
            message.edit(runGenerateEmbed());
            break;
          ***REMOVED***
        ***REMOVED***;

        Client.on('messageReactionAdd', onReactionUpdate);
        Client.on('messageReactionRemove', onReactionUpdate);
      ***REMOVED***));
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***;

function generateEmbed(fetched, index, arg, maxDefinitions, color) ***REMOVED***
  let data = fetched[index];
  if(data.shortdef.length < 1) return `🇽 Cannot parse definition of \`$***REMOVED***arg***REMOVED***\`.`;

  let embedTitle = data.meta.id.toProperCase();
  if(data.date) embedTitle += ` ($***REMOVED***data.date.split('***REMOVED***')[0]***REMOVED***)`;

  let definition = new String();
  let defNumber = 0;
  data.shortdef.forEach(def => ***REMOVED***
    defNumber++;
    definition += `$***REMOVED***defNumber***REMOVED***. $***REMOVED***def***REMOVED***\n`;
  ***REMOVED***);

  let embed = new Discord.RichEmbed();
  embed.setAuthor(`\📙 Define`);
  embed.setTitle(embedTitle);
  embed.setDescription(`($***REMOVED***data.fl.toProperCase()***REMOVED***)`);
  embed.addField('Definition', definition);
  embed.setFooter(`Defintion $***REMOVED***index + 1***REMOVED***/$***REMOVED***maxDefinitions***REMOVED***\n$***REMOVED***preload_data.embed_footer***REMOVED***`);
  embed.setColor(color);

  return ***REMOVED***embed***REMOVED***;
***REMOVED***;