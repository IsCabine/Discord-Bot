const path = require('path');
const random = require('../Functions/random');

module.exports.run = (e, args, Client) => {
    let numbers = [
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
    ];

    let num = numbers[random(0, 5)];
    let file = path.join(__dirname, '..', 'Files', 'Images', 'Die', num + '.png');

    return { file };
};