import Handler from '../../core/Handler';
import HandlerError from '../../core/HandlerError';
import series from '../../decorators/series';
import {getStore, bindActions} from '../../store';
import * as sessionActions from '../../store/actions/session';
import {getCurrentUsers} from '../../sheets/actions/auth';
import createCommand from '../../utils/createCommand';
import getFullname from '../../utils/getFullname';
import strings from '../../config/strings';

const actions = bindActions(sessionActions, () => getStore('session'));

class Login extends Handler {
  getCommandTarget() {
    return createCommand(['login', '로그인']);
  }

  // 중복 로그인 방지
  async ensureUserNotSigned(username, errorOpts) {
    const hasSigned = await actions.existSession(username);

    if (hasSigned) {
      throw new HandlerError(strings.auth.alreadySigned, errorOpts);
    }
  }

  // 사용자가 있는지 확인하고 비활성화 처리
  async ensureUserExist(username, fullname, errorOpts) {
    const values = await getCurrentUsers();
    const user = values.find(({id}) => id === username);

    if (!user) {
      throw new HandlerError(strings.auth.userNotFound, errorOpts);
    }

    if (user.enabled !== '⭕') {
      throw new HandlerError(strings.auth.userDisabled(fullname), errorOpts);
    }
  }

  @series()
  async didReceiveCommand(bot, {chat: {id: chatId}, from}) {
    const {username} = from;
    const fullname = getFullname(from);
    const {message_id: messageId} = await bot.sendMessage(chatId, strings.common.processing);

    // 중복 로그인 방지
    await this.ensureUserNotSigned(username, {messageId});

    // 계정 시트 확인
    await this.ensureUserExist(username, fullname, {messageId});

    // 사용자 등록
    await actions.registerSession(username);
    await bot.editMessageText(strings.auth.signin(fullname), {
      chat_id: chatId,
      message_id: messageId,
    });
  }
}

export {
  Login as default,
};
