const Discord = require('discord.js');
const Trivia = require('trivia-api')
const trivia = new Trivia(***REMOVED***encoding: 'url3986'***REMOVED***);
const decodeHTML = require('../Functions/decodeHTML');
const getData = require('../Functions/getData');

const embed_data = getData('embed');
const color_data = getData('colors');

module.exports.run = (e, args, Client) => ***REMOVED***
  trivia.getQuestions().then(questions => ***REMOVED***
    if(questions.response_code !== 0) ***REMOVED***
      e.channel.send('🇽 Cannot get trivia question.');
      throw new Error(`Error ($***REMOVED***questions.response_code***REMOVED***): Cannot fetch trivia question.`);
    ***REMOVED***

    let question = questions.results[0];
    let isTF = question.correct_answer === 'True' || question.correct_answer === 'False';
    let embed = new Discord.RichEmbed();

    embed.setColor(color_data.PURPLE);
    embed.setFooter(embed_data.default_footer);
    embed.setTitle('\\🃏 Trivia');
    embed.addField('Category', question.category, true);
    embed.addField('Difficulty', question.difficulty.toProperCase(), true);
    
    if(isTF) ***REMOVED***
      embed.addField('Type', 'True/False', true);
    ***REMOVED*** else ***REMOVED***
      embed.addField('Type', 'Multiple Choice', true);
    ***REMOVED***

    embed.addField('Question', decodeHTML(question.question));

    let answers = ***REMOVED***
      '🇦': null,
      '🇧': null,
      '🇨': null,
      '🇩': null
    ***REMOVED***;

    let letters = ***REMOVED***
      '🇦': 'A',
      '🇧': 'B',
      '🇨': 'C',
      '🇩': 'D'
    ***REMOVED***;

    let correctLetter = Object.keys(answers)[Math.floor(Math.random() * 4)];

    if(!isTF) ***REMOVED***
      console.log(question.incorrect_answers);

      answers[correctLetter] = question.correct_answer;
      let inAnsInd = 0;

      for(let i in answers) ***REMOVED***
        if(answers[i] !== null) continue;
        answers[i] = question.incorrect_answers[inAnsInd];
        inAnsInd++;
      ***REMOVED***

      let ansStr = new String();
      for(let i in answers) ***REMOVED***
        ansStr += `$***REMOVED***letters[i]***REMOVED***. $***REMOVED***answers[i]***REMOVED***\n`;
      ***REMOVED***

      embed.addField('Answer Choices', decodeHTML(ansStr));
    ***REMOVED***

    e.channel.send(***REMOVED***embed***REMOVED***).then(msg => ***REMOVED***
      if(isTF) (async () => ***REMOVED***
        await msg.react('🇹').catch(console.error);
        await msg.react('🇫').catch(console.error);
        addReactionListeners();
      ***REMOVED***)();
      else (async () => ***REMOVED***
        await msg.react('🇦').catch(console.error);
        await msg.react('🇧').catch(console.error);
        await msg.react('🇨').catch(console.error);
        await msg.react('🇩').catch(console.error);
        addReactionListeners();
      ***REMOVED***)();

      setTimeout(() => ***REMOVED***
        removeReactionListener();
        if(!msg.deletable) return;
        msg.delete().catch(console.error);
      ***REMOVED***, embed_data.timer_duration);

      function onReactionUpdate(reaction, user) ***REMOVED***
        if(user.id !== e.author.id) return;
        if(reaction.message.id !== msg.id) return;

        let emoji = reaction.emoji.name;
        let isAnswer = Object.keys(answers).includes(emoji);

        if(!isTF) ***REMOVED***
          if(isAnswer) ***REMOVED***
            if(answers[emoji] === question.correct_answer) ***REMOVED***
              embed.setColor(color_data.GREEN);
              embed.setTitle('\\🃏 Trivia         \\✅');
            ***REMOVED*** else ***REMOVED***
              embed.setColor(color_data.RED);
              embed.addField('Said', decodeHTML(`$***REMOVED***letters[emoji]***REMOVED***. $***REMOVED***answers[emoji]***REMOVED***`), true);
              embed.setTitle('\\🃏 Trivia         \\❌');
            ***REMOVED***

            removeReactionListener();
            embed.addField('Answer', decodeHTML(`$***REMOVED***letters[correctLetter]***REMOVED***. $***REMOVED***question.correct_answer***REMOVED***`), true);
            msg.edit(***REMOVED***embed***REMOVED***);
          ***REMOVED***
        ***REMOVED*** else ***REMOVED***
          let onCorrect = correct => ***REMOVED***
            embed.setColor(color_data.GREEN);
            embed.setTitle('\\🃏 Trivia         \\✅');
            embed.addField('Answer', correct, true);
          ***REMOVED***;

          let onIncorrect = (said, correct) => ***REMOVED***
            embed.setColor(color_data.RED);
            embed.addField('Said', said, true);
            embed.addField('Answer', correct, true);
            embed.setTitle('\\🃏 Trivia         \\❌');
          ***REMOVED***;

          if(emoji === '🇹') ***REMOVED***
            if(question.correct_answer === 'True') onCorrect('True');
            else onIncorrect('True', 'False');

            msg.edit(***REMOVED***embed***REMOVED***);
            removeReactionListener();
          ***REMOVED***

          if(emoji === '🇫') ***REMOVED***
            if(question.correct_answer === 'False') onCorrect('False')
            else onIncorrect('False', 'True');

            msg.edit(***REMOVED***embed***REMOVED***);
            removeReactionListener();
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

      function addReactionListeners() ***REMOVED***
        Client.on('messageReactionAdd', onReactionUpdate);
        Client.on('messageReactionRemove', onReactionUpdate);
      ***REMOVED***

      function removeReactionListener() ***REMOVED***
        Client.removeListener('messageReactionAdd', onReactionUpdate);
        Client.removeListener('messageReactionRemove', onReactionUpdate);

        msg.reactions.forEach(reaction => ***REMOVED***
          if(!['🇹', '🇫', '🇦', '🇧', '🇨', '🇩'].includes(reaction.emoji.name)) return;

          if(e.guild.me.hasPermission('MANAGE_MESSAGES')) ***REMOVED***
            reaction.users.forEach(user => ***REMOVED***
              reaction.remove(user).catch(console.error);
            ***REMOVED***);
          ***REMOVED***else ***REMOVED***
            reaction.remove().catch(console.error);
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***).catch(console.error);
  ***REMOVED***);
***REMOVED***;