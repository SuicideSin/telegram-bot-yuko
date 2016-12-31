import {makeCommand, getUserFullName} from '../utils/commons';
import {getSessionDatabase} from '../utils/storage';

let sessionDB = getSessionDatabase();

let handler = [
  {
    target: makeCommand(['blackjack', '블랙잭']),
    async onEvent(bot, message) {
      let {chat: {id: chatId}, from: {id: targetId}, message_id: messageId} = message;
      let targetFullName = getUserFullName(targetId);

      await sessionDB.updateAsync({user: targetId}, {$set: {'stats.usingKeyboard': true}}, {});
      await bot.sendMessage(chatId, `💎 블랙잭 게임을 해양! ${targetFullName} 주인님이 주최자예양!\n같이할 분들을 멘션해주세양!`, {
        reply_to_message_id: messageId,
        reply_markup: {
          keyboard: [
            ['취소']
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
          selective: true
        }
      });
    }
  }
];

export {
  handler as default
};
