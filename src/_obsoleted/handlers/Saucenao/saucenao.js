import {makeCommand} from '../utils/commons';
import {getSessionDatabase} from '../utils/storage';
import strings from '../config/strings.js';

const {saucenao: saucenaoString} = strings;

let sessionDB = getSessionDatabase();

let handler = [
  {
    target: makeCommand(['sauce', '소스']),
    async onEvent(bot, message) {
      let {chat: {id: chatId}, from: {id: targetId}, message_id: messageId} = message;

      await sessionDB.updateAsync({user: targetId}, {$set: {'status.type': 'sauce'}}, {});
      await bot.sendMessage(chatId, saucenaoString.search, {
        reply_to_message_id: messageId,
        reply_markup: {
          force_reply: true,
          selective: true
        }
      });
    }
  }
];

export {
  handler as default
};
