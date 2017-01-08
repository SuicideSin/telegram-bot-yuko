import Handler from '../../core/Handler';
import createCommand from '../../utils/createCommand';
import startStrings from '../../strings/start';

class Start extends Handler {
  getCommandTarget() {
    return createCommand(['start', '시작']);
  }

  async didReceiveCommand(bot, {chat: {id: chatId}}) {
    await bot.sendMessage(chatId, startStrings.introduction, {
      parse_mode: 'Markdown',
    });
  }
}

export {
  Start as default,
};
