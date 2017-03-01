import Handler from '../../core/Handler';
import createCommand from '../../utils/createCommand';
import strings from '../../config/strings';

class Help extends Handler {
  getCommandTarget() {
    return createCommand(['help', '도움말']);
  }

  async didReceiveCommand(bot, {chat: {id: chatId}}) {
    await bot.sendMessage(chatId, strings.system.help, {
      parse_mode: 'Markdown',
    });
  }
}

export {
  Help as default,
};
