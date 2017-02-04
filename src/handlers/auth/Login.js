import Handler from '../../core/Handler';
import HandlerError from '../../core/HandlerError';
import series from '../../decorators/series';
import {verifySignin, signin} from '../../store/query/auth';
import {getCurrentSigninStatus} from '../../sheets/query/auth';
import createCommand from '../../utils/createCommand';
import getFullname from '../../utils/getFullname';
import authStrings from '../../strings/auth';
import commonsStrings from '../../strings/commons';

@series
class Login extends Handler {
  getCommandTarget() {
    return createCommand(['login', '로그인']);
  }

  async ensureUserNotSigned(username, errorOpts) {
    // 중복 로그인 방지
    const hasSigned = await verifySignin(username);

    if (hasSigned) {
      throw new HandlerError(authStrings.alreadySigned, errorOpts);
    }
  }

  async ensureUserExist(username, fullname, errorOpts) {
    // 계정 데이터 가져오기
    const values = await getCurrentSigninStatus();
    const user = values.find(({id}) => id === username);
    const {enabled} = user;

    // 사용자가 있는지 확인
    if (user === null || typeof user !== 'object') {
      throw new HandlerError(authStrings.userNotFound, errorOpts);
    }

    // 비활성화 처리
    if (enabled !== '⭕') {
      throw new HandlerError(authStrings.userDisabled(fullname), errorOpts);
    }
  }

  async didReceiveCommand(bot, {chat: {id: chatId}, from}) {
    const {message_id: messageId} = await bot.sendMessage(chatId, commonsStrings.processing);
    const {username} = from;
    const fullname = getFullname(from);

    // 중복 로그인 방지
    await this.ensureUserNotSigned(username, {messageId});

    // 계정 시트 확인
    await this.ensureUserExist(username, fullname, {messageId});

    // 사용자 등록
    await signin(username);
    await bot.editMessageText(authStrings.signin(fullname), {
      chat_id: chatId,
      message_id: messageId,
    });
  }
}

export {
  Login as default,
};
