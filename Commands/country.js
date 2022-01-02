const joinArgs = require('../Functions/joinArgs');
const Discord = require('discord.js');
const generateEmbedColor = require('../Functions/generateEmbedColor');
const printNumber = require('../Functions/printNumber');
const getData = require('../Functions/getData');

const country_data = getData('countries');
const embed_data = getData('embed');

module.exports.run = (e, args, Client) => {
  const input = joinArgs(args);
  let toReturn = `🇽 Sorry: Cannot find a country with the input of \`${input}\``;
  
  if(toReturn.length > 2000) toReturn = '🇽 Sorry: Cannot find a country with that input.'

  country_data.forEach(country => {
    let identifiers = [
      country.name,
      country.nativeName,
      ...country.altSpellings,
      country.capital,
      country.alpha2Code,
      country.alpha3Code,
      country.demonym
    ];

    if(country.numericCode) identifiers.push(country.numericCode);
    identifiers = identifiers.map(id => id.toLowerCase());

    if(!identifiers.includes(input.toLowerCase()))  return;

    const currencies = [
      country.currencies.length === 1 ? 'Currency' : 'Currencies',
      country.currencies.map(currency => `${currency.symbol} ${currency.name} (${currency.code})`)
    ];

    const embed = new Discord.RichEmbed();

    embed.setAuthor('🗺️ Country');
    embed.setTitle(country.name);
    embed.setDescription(`**Input:** ${input}`);
    embed.setColor(generateEmbedColor());
    embed.setThumbnail(`https://www.countryflags.io/${country.alpha2Code}/flat/64.png`);
    embed.setFooter(embed_data.default_footer);

    embed.addField('Alt Spellings', country.altSpellings.join(',\n'), true);
    embed.addField('Capital', country.capital, true);
    embed.addField('Population', printNumber(country.population), true);
    embed.addField('Alpha Codes', `2(${country.alpha2Code}), 3(${country.alpha3Code})`, true);
    embed.addField('Native Name', country.nativeName, true);
    embed.addField('Borders', country.borders.join(', '), true);
    embed.addField('Languages', country.languages.map(lang => lang.name).join(', '), true);
    embed.addField('Timezones', country.timezones.length, true);
    embed.addField('ISO 3166-1 Code', country.numericCode ? country.numericCode : 'None', true);
    embed.addField('Region', country.region, true);
    embed.addField('Subregion', country.subregion, true);
    embed.addField(...currencies, true);

    toReturn = {embed};
  });

  return toReturn;
};