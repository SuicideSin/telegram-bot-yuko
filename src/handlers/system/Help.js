import Handler from '../../core/Handler';
import createCommand from '../../utils/createCommand';
import helpStrings from '../../strings/help';

class Start extends Handler {
  getCommand() {
    return createCommand(['help', '도움말']);
  }

  async didRecieveCommand(bot, {chat: {id: chatId}}) {
    await bot.sendMessage(chatId, helpStrings.introduction, {
      parse_mode: 'Markdown',
    });
  }
}

export {
  Start as default,
};
