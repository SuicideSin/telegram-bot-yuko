import Handler from '../../base/Handler';
import createCommand from '../../utils/createCommand';
import {setUser} from '../../store/query';
import {getDefaultAuth, getSheets} from '../../sheets';

class Login extends Handler {
  getCommandTarget() {
    return createCommand(['login', '로그인']);
  }

  async didRecieveCommand(bot, {chat: {id: chatId}, from: {username}}) {
    const sheets = getSheets();
    const auth = await getDefaultAuth();

    const {values} = await sheets.values.get({
      auth,
      spreadsheetId: '1UToDjmLTDh15Fj_YouQnVTMEptU4uyJo6l-W94xsT4k',
      range: 'Accounts!A2:C',
    });

    const user = values.find(([id]) => id === username);

    if (user) {
      const [, description] = user;

      await bot.sendMessage(chatId, `사용자를 찾았어욧!: ${username} | ${description}`);
      await setUser(username);

      return;
    }

    await bot.sendMessage(chatId, '사용자를 못찾았어욧..');
  }
}

export {
  Login as default,
};
