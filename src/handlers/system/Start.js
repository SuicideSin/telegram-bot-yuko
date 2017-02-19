import Handler from '../../core/Handler';
import createCommand from '../../utils/createCommand';
import systemStrings from '../../strings/system';

class Start extends Handler {
  getCommandTarget() {
    return createCommand(['start', '시작']);
  }

  async didReceiveCommand(bot, {chat: {id: chatId}}) {
    await bot.sendMessage(chatId, systemStrings.start, {
      parse_mode: 'Markdown',
    });
  }
}

export {
  Start as default,
};
