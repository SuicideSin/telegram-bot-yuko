import Handler from '../../core/Handler';
import HandlerError from '../../core/HandlerError';
import series from '../../core/decorators/series';
import createCommand from '../../utils/createCommand';
import verifyLogin from '../../utils/verifyLogin';
import {storeQuery} from '../../store';
import {sheetsQuery} from '../../sheets';
import getFullUsername from '../../utils/getFullUsername';
import authStrings from '../../strings/auth';
import commonsStrings from '../../strings/commons';

@series
class Login extends Handler {
  getCommand() {
    return createCommand(['login', '로그인']);
  }

  async didRecieveCommand(bot, {chat: {id: chatId}, from}) {
    const {message_id: messageId} = await bot.sendMessage(chatId, commonsStrings.processing);
    const {username} = from;

    // 중복 로그인 방지
    const hasSigned = await verifyLogin(username);

    if (hasSigned) {
      throw new HandlerError(authStrings.alreadySigned, {messageId});
    }

    // 계정 시트 데이터 가져오기
    const values = await sheetsQuery.getParsedRows(
      '1UToDjmLTDh15Fj_YouQnVTMEptU4uyJo6l-W94xsT4k',
      'Accounts!A1:C',
    );

    // 사용자가 있는지 확인
    const user = values.find(({id}) => id === username);

    if (user === null && typeof user !== 'object') {
      throw new HandlerError(authStrings.userNotFound, {messageId});
    }

    // 비활성화 처리
    const {enabled} = user;

    if (enabled !== '⭕') {
      throw new HandlerError(authStrings.userDisabled(getFullUsername(from)), {messageId});
    }

    // 사용자를 세션에 추가
    await storeQuery.setUser(username);
    await bot.editMessageText(authStrings.signin(getFullUsername(from)), {
      chat_id: chatId,
      message_id: messageId,
    });
  }
}

export {
  Login as default,
};
