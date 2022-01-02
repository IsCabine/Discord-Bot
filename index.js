console.clear();
console.log('App Started. Lauching Bot...\n');

const Discord = require('discord.js');
const Client = new Discord.Client({fetchAllMembers: true});
const fs = require('fs');
const config = require('./Functions/getData')('config');

const iterateDir = require('./Functions/iterateDir');
const joinArgs = require('./Functions/joinArgs');

const removeExtension = (file, extension = 'js') => file.replace(`.${extension}`, new String());
getGlobals();

Client.once('ready', () => {
  const cmds = fs.readdirSync('Commands').map(item => item.replace('.js', new String()));

  Client.on('message', e => {
    // return console.log(e.content);
    if(e.author.equals(Client.user)) return;
    if(!e.content.startsWith(config.prefix)) return;
    if(!e.guild.me.hasPermission('SEND_MESSAGES')) {
      return e.auther.send('I cannot be used in that channel.').catch(console.error);
    }

    let msg = e.content;
    let data = msg.replace(config.prefix, new String());
    let cmd = data.split(config.seperator)[0];
    let argsUnfiltered = data
      .replace(cmd, new String())
      .replace(config.seperator, new String())
      .split(config.seperator);
    cmd = cmd.toLowerCase();

    let args = new Array();
    argsUnfiltered.forEach(arg => {
      if(!arg) return;
      args.push(arg);
    });

    if(cmds.indexOf(cmd) === -1) return console.log(`[${Date.now()}] CMD: [${cmd.toUpperCase()}] NOT FOUND (in ${e.guild.id})`);
    else console.log(`[${Date.now()}] CMD: [${cmd.toUpperCase()}] called in [${e.guild.name}: #${e.channel.name}] by ${e.author.username
                      }#${e.author.discriminator} with args of [${joinArgs(args)}]`);

    let res = require(`./Commands/${cmd}`).run(e, args, Client);
    if(typeof res !== 'undefined') e.channel.send(res).catch(console.error);
  });

  iterateDir('Actions', action => {
    let name = removeExtension(action);

    console.log(`[${Date.now()}] Running Action: ${name}`);
    require(`./Actions/${name}`)().then(info => {
      console.log(` > [${Date.now()}] Action [${name}] Sucessful`);
      if(info) console.log(`   - Action Finished with Callback of: [${info}]`);
      console.log();
    }).catch(error => {
      console.log(` > [${Date.now()}] Action [${name}] Failed:\n`);
      if(info) console.error(error);
      console.log('\n\n');
    });
  });
});

function getGlobals() {
  iterateDir('Prototypes', type => {
    let typeDir = fs.readdirSync(`Prototypes/${type}`);
    typeDir.forEach(typeFile => {
      let t = removeExtension(typeFile);
      global[type].prototype[t] = require(`./Prototypes/${type}/${t}`);
    });
  });
}

Client.login(config.token).catch(console.error);