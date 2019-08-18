module.exports.run = (e, args) => ***REMOVED***
  let arg = Functions.joinArgs(args);
  let embed = new Discord.RichEmbed();
  let output = arg.reverse();
  let color = preload_data.colors[preload_data.embed_colors.random()];

  if(arg.length <= 1024) ***REMOVED***
    embed.setTitle(`🔃 Reverse`);
    embed.addField('Input', arg);
    embed.addField('Output', output);
    embed.setFooter(preload_data.embed_footer);
    embed.setColor(color);

    return ***REMOVED***embed***REMOVED***;
  ***REMOVED*** else ***REMOVED***
    return `🔃 $***REMOVED***output***REMOVED***`;
  ***REMOVED***
***REMOVED***;