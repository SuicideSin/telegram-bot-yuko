import {makeCommand} from '../utils/commons';
import {getSessionDatabase} from '../utils/storage';
import strings from '../config/strings.js';

const {cancel: cancelString} = strings;

let sessionDB = getSessionDatabase();

let handler = [
  {
    target: makeCommand(['cancel', '취소']),
    async onEvent(bot, message) {
      let {chat: {id: chatId}, from: {id: targetId}, message_id: messageId} = message;
      let [{status: currentStatus}] = await sessionDB.findAsync({user: targetId});
      let response = cancelString.noTask;

      if (currentStatus) {
        await sessionDB.updateAsync({user: targetId}, {$unset: {status: true}}, {});
        response = cancelString.success;
      }

      await bot.sendMessage(chatId, response, {
        reply_to_message_id: messageId
      });
    }
  }
];

export {
  handler as default
};
