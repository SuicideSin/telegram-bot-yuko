import Handler from '../../core/Handler';
import secured from '../../decorators/secured';
import series from '../../decorators/series';
import * as sessionActions from '../../store/actions/session';
import createCommand from '../../utils/createCommand';
import getFullname from '../../utils/getFullname';
import authStrings from '../../strings/auth';
import commonsStrings from '../../strings/commons';

// 하나로 정리 - 아예 시트 로직과 같이 만들고 그냥 데코레이터는 해당 함수를 받아서 처리하도록 하자

class Logout extends Handler {
  getCommandTarget() {
    return createCommand(['logout', '로그아웃']);
  }

  @series()
  @secured(sessionActions.verifySession)
  async didReceiveCommand(bot, {chat: {id: chatId}, from}) {
    const {message_id: messageId} = await bot.sendMessage(chatId, commonsStrings.processing);
    const {username} = from;

    await sessionActions.unregisterSession(username);
    await bot.editMessageText(authStrings.signout(getFullname(from)), {
      chat_id: chatId,
      message_id: messageId,
    });
  }
}

export {
  Logout as default,
};
