import Handler from '../../core/Handler';
import series from '../../decorators/series';
import secured from '../../decorators/secured';
import {getStore, bindActions} from '../../store';
import * as sessionActions from '../../store/actions/session';
import createCommand from '../../utils/createCommand';
import getFullname from '../../utils/getFullname';
import strings from '../../config/strings';

const actions = bindActions(sessionActions, () => getStore('session'));

class Logout extends Handler {
  getCommandTarget() {
    return createCommand(['logout', '로그아웃']);
  }

  @series()
  @secured()
  async didReceiveCommand(bot, {chat: {id: chatId}, from}) {
    const {username} = from;
    const {message_id: messageId} = await bot.sendMessage(chatId, strings.common.processing);

    await actions.unregisterSession(username);
    await bot.editMessageText(strings.auth.signout(getFullname(from)), {
      chat_id: chatId,
      message_id: messageId,
    });
  }
}

export {
  Logout as default,
};
