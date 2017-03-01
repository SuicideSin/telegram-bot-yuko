import Handler from '../../core/Handler';
import createCommand from '../../utils/createCommand';
import strings from '../../config/strings';

class Start extends Handler {
  getCommandTarget() {
    return createCommand(['start', '시작']);
  }

  async didReceiveCommand(bot, {chat: {id: chatId}}) {
    await bot.sendMessage(chatId, strings.system.start, {
      parse_mode: 'Markdown',
    });
  }
}

export {
  Start as default,
};
