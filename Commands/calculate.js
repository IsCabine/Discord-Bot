module.exports.run = (e, args) => ***REMOVED***
  const embed = new Discord.RichEmbed();
  const input = Functions.joinArgs(args, 0);
  let color;

  embed.setTitle('\📐 Calculate');
  embed.addField('Input', input);

  try ***REMOVED***
    let output = mathjs.evaluate(input).toString();
    color = Functions.generateEmbedColor();

    embed.addField('Output', output);
    embed.setColor(color);
  ***REMOVED*** catch(err) ***REMOVED***
    color = preload_data.colors.RED;
    embed.setColor(color);
    embed.addField('Output', 'Syntax Error');
  ***REMOVED***

  return ***REMOVED***embed***REMOVED***;
***REMOVED***;