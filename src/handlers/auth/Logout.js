import Handler from '../../core/Handler';
import secured from '../../core/decorators/secured';
import {storeQuery} from '../../store';
import createCommand from '../../utils/createCommand';
import getFullUsername from '../../utils/getFullUsername';
import authStrings from '../../strings/auth';
import commonsStrings from '../../strings/commons';

@secured
class Logout extends Handler {
  getCommandTarget() {
    return createCommand(['logout', '로그아웃']);
  }

  async didReceiveCommand(bot, {chat: {id: chatId}, from}) {
    const {message_id: messageId} = await bot.sendMessage(chatId, commonsStrings.processing);
    const {username} = from;

    await storeQuery.deleteUser(username);
    await bot.editMessageText(authStrings.signout(getFullUsername(from)), {
      chat_id: chatId,
      message_id: messageId,
    });
  }
}

export {
  Logout as default,
};
