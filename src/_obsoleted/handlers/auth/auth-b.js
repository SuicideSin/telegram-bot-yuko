import {getSessionDatabase} from '../utils/storage';
import {makeCommand, getUserFullName} from '../utils/commons';
import verifyLogin from '../utils/verifyLogin';
import authKey from '../config/authKey.js';
import strings from '../config/strings.js';

const {auth: authString} = strings;

let sessionDB = getSessionDatabase();

let handler = [
  {
    target: makeCommand(['login', '로그인'], true),
    async onEvent(bot, message, match) {
      let {chat: {id: chatId}, from: target} = message;
      let {id: targetId} = target;
      let command = match[1];
      let response = authString.mismatch;

      if (typeof command != 'string') {
        throw new Error(authString.noInput);
      }

      if (await verifyLogin(targetId)) {
        throw new Error(authString.alreadySigned);
      }

      if (command == authKey) {
        let userFullName = getUserFullName(target);

        await sessionDB.insertAsync({user: targetId});
        response = authString.signin(userFullName);
      }

      await bot.sendMessage(chatId, response);
    }
  },
  {
    target: makeCommand(['logout', '로그아웃']),
    async onEvent(bot, message) {
      let {chat: {id: chatId}, from: target} = message;
      let {id: targetId} = target;
      let isSigned = await verifyLogin(targetId);

      if (!isSigned) {
        throw new Error(authString.notSigned);
      }

      let userFullName = getUserFullName(target);

      await sessionDB.removeAsync({user: targetId});
      await bot.sendMessage(chatId, authString.signout(userFullName));
    }
  }
];

export {
  handler as default
};
