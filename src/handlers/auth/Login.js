import Handler from '../../core/Handler';
import {setUser} from '../../store/query';
import createCommand from '../../utils/createCommand';
import verifyLogin from '../../utils/verifyLogin';
import {getDefaultAuth, getSheets} from '../../sheets';
import series from '../../utils/decorators/series';
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
    const hasAlreadySigned = await verifyLogin(username);

    if (hasAlreadySigned) {
      await bot.editMessageText(authStrings.alreadySigned, {
        chat_id: chatId,
        message_id: messageId,
      });

      return;
    }

    // 계정 시트 후려오기
    const sheets = getSheets();
    const auth = await getDefaultAuth();
    const {values} = await sheets.values.get({
      auth,
      spreadsheetId: '1UToDjmLTDh15Fj_YouQnVTMEptU4uyJo6l-W94xsT4k',
      range: 'Accounts!A2:C',
    });

    // 사용자를 찾음
    const user = values.find(([id]) => id === username);

    // 못 찾음
    if (!user) {
      await bot.editMessageText(authStrings.userNotFound, {
        chat_id: chatId,
        message_id: messageId,
      });

      return;
    }

    // 비활성화 처리
    const [,, hasDisabled] = user;

    if (hasDisabled) {
      await bot.editMessageText(authStrings.userDisabled(getFullUsername(from)), {
        chat_id: chatId,
        message_id: messageId,
      });

      return;
    }

    await setUser(username);
    await bot.editMessageText(authStrings.signin(getFullUsername(from)), {
      chat_id: chatId,
      message_id: messageId,
    });
  }
}

export {
  Login as default,
};
