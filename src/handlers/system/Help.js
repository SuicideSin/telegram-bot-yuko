import Handler from '../../core/Handler';
import createCommand from '../../utils/createCommand';
import systemStrings from '../../strings/system';

class Help extends Handler {
  getCommandTarget() {
    return createCommand(['help', '도움말']);
  }

  async didReceiveCommand(bot, {chat: {id: chatId}}) {
    await bot.sendMessage(chatId, systemStrings.help, {
      parse_mode: 'Markdown',
    });
  }
}

export {
  Help as default,
};
