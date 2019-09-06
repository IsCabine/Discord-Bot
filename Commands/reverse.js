module.exports.run = (e, args) => ***REMOVED***
  let arg = Functions.joinArgs(args);
  let embed = new Discord.RichEmbed();
  let output = arg.reverse();
  let color = Functions.generateEmbedColor();

  if(arg.length <= 1024) ***REMOVED***
    embed.setTitle(`🔃 Reverse`);
    embed.addField('Input', arg);
    embed.addField('Output', output);
    embed.setFooter(preload_data.embed.default_footer);
    embed.setColor(color);

    return ***REMOVED***embed***REMOVED***;
  ***REMOVED*** else ***REMOVED***
    return `🔃 $***REMOVED***output***REMOVED***`;
  ***REMOVED***
***REMOVED***;