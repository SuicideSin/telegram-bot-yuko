import Handler from '../../core/Handler';
import {deleteUser} from '../../store/query';
import createCommand from '../../utils/createCommand';
import verifyLogin from '../../utils/verifyLogin';
import getFullUsername from '../../utils/getFullUsername';
import authStrings from '../../strings/auth';
import commonsStrings from '../../strings/commons';

class Logout extends Handler {
  getCommand() {
    return createCommand(['logout', '로그아웃']);
  }

  async didRecieveCommand(bot, {chat: {id: chatId}, from}) {
    const {message_id: messageId} = await bot.sendMessage(chatId, commonsStrings.processing);

    const {username} = from;
    const hasSigned = await verifyLogin(username);

    if (!hasSigned) {
      await bot.editMessageText(authStrings.notSigned, {
        chat_id: chatId,
        message_id: messageId,
      });

      return;
    }

    await deleteUser(username);
    await bot.editMessageText(authStrings.signout(getFullUsername(from)), {
      chat_id: chatId,
      message_id: messageId,
    });
  }
}

export {
  Logout as default,
};
