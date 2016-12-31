import Promise from 'bluebird';
import Random from 'random-js';
import {makeCommand} from '../utils/commons';
import dices from '../config/dices.js';

const maxDiceCount = 3;

let random = new Random(Random.engines.mt19937().autoSeed());

let handler = [
  {
    target: makeCommand(['dice', '주사위'], true),
    async onEvent(bot, message, match) {
      let {chat: {id: chatId}} = message;
      let command = Number.parseInt(match[1]);
      let count = Number.isInteger(command)
        ? Math.min(Math.abs(command), maxDiceCount)
        : 1;

      let randomDices = Array.from({length: count}, () => random.integer(0, 5));

      await Promise.map(randomDices, (dice) => {
        return bot.sendSticker(chatId, dices[dice]);
      });
    }
  }
];

export {
  handler as default
};
