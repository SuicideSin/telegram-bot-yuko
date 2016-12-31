import {makeCommand, buildHelpString} from '../utils/commons';
import strings from '../config/strings.js';

const {system: systemString} = strings;

let handler = [
  {
    target: makeCommand(['start']),
    async onEvent(bot, message) {
      let {chat: {id: chatId}} = message;
      await bot.sendMessage(chatId, systemString.introduction);
    }
  },
  {
    target: makeCommand(['help', '도움말']),
    async onEvent(bot, message) {
      let {chat: {id: chatId}} = message;
      let helpString = buildHelpString(systemString.help);

      await bot.sendMessage(chatId, helpString, {
        parse_mode: 'Markdown'
      });
    }
  }
];

export {
  handler as default
};
