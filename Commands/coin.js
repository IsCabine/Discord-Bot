const random = require('../Functions/random');

const randZero = max => random(0, max) == 0;

module.exports.run = (e, args, Client) => {
    const flip = randZero(6000) ? 'Side' : randZero(1) ? 'Heads' : 'Tails';
    return `🪙 ${flip}`;
};