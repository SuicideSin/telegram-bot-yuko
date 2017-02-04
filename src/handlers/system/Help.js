import Handler from '../../core/Handler';
import createCommand from '../../utils/createCommand';
import helpStrings from '../../strings/help';

class Help extends Handler {
  getCommandTarget() {
    return createCommand(['help', '도움말']);
  }

  async didReceiveCommand(bot, {chat: {id: chatId}}) {
    await bot.sendMessage(chatId, helpStrings.introduction, {
      parse_mode: 'Markdown',
    });
  }
}

export {
  Help as default,
};
