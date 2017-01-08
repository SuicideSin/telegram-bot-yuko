import Handler from '../core/Handler';
import secured from '../core/decorators/secured';
import createCommand from '../utils/createCommand';

@secured
class Test extends Handler {
  getCommandTarget() {
    return createCommand(['test', '테스트']);
  }

  async didReceiveCommand(bot, {chat: {id: chatId}}) {
    await bot.sendMessage(chatId, '히이이익..!');
  }
}

export {
  Test as default,
};
