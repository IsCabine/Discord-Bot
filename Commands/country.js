module.exports.run = (e, args) => ***REMOVED***
  let input = Functions.joinArgs(args);
  let toReturn = `🇽 Sorry: Cannot find a country with the input of \`$***REMOVED***input***REMOVED***\``;
  if(toReturn.length > 2000) toReturn = '🇽 Sorry: Cannot find a country with that input.'

  preload_data.countries.forEach(country => ***REMOVED***
    let identifiers = [
      country.name,
      country.nativeName,
      ...country.altSpellings,
      country.capital,
      country.alpha2Code,
      country.alpha3Code,
      country.demonym
***REMOVED***;

    if(country.numericCode) identifiers.push(country.numericCode);
    identifiers = identifiers.return(id => id.toLowerCase());

    if(!identifiers.includes(input.toLowerCase())) return;

    let currencies = [
      country.currencies.length === 1 ? 'Currency' : 'Currencies',
      country.currencies.return(currency => `$***REMOVED***currency.symbol***REMOVED*** $***REMOVED***currency.name***REMOVED*** ($***REMOVED***currency.code***REMOVED***)`)
***REMOVED***;

    let embed = new Discord.RichEmbed();
    embed.setAuthor('🗺️ Country');
    embed.setTitle(country.name);
    embed.setDescription(`**Input:** $***REMOVED***input***REMOVED***`);
    embed.setColor(Functions.generateEmbedColor());
    embed.setThumbnail(`https://www.countryflags.io/$***REMOVED***country.alpha2Code***REMOVED***/flat/64.png`);
    embed.setFooter(preload_data.embed.default_footer);

    embed.addField('Alt Spellings', country.altSpellings.join(',\n'), true);
    embed.addField('Capital', country.capital, true);
    embed.addField('Population', Functions.printNumber(country.population), true);
    embed.addField('Alpha Codes', `2($***REMOVED***country.alpha2Code***REMOVED***), 3($***REMOVED***country.alpha3Code***REMOVED***)`, true);
    embed.addField('Native Name', country.nativeName, true);
    embed.addField('Borders', country.borders.join(', '), true);
    embed.addField('Languages', country.languages.return(lang => lang.name).join(', '), true);
    embed.addField('Timezones', country.timezones.length, true);
    embed.addField('ISO 3166-1 Code', country.numericCode ? country.numericCode : 'None', true);
    embed.addField('Region', country.region, true);
    embed.addField('Subregion', country.subregion, true);
    embed.addField(...currencies, true);

    toReturn = ***REMOVED***embed***REMOVED***;
  ***REMOVED***);

  return toReturn;
***REMOVED***;