import Handler from '../core/Handler';
import * as sessionActions from '../store/actions/session';
import secured from '../decorators/secured';
import createCommand from '../utils/createCommand';

class Test2 extends Handler {
  getCommandTarget() {
    return createCommand(['test', '테스트']);
  }

  @secured(sessionActions.verifySession)
  async didReceiveCommand(bot, {chat: {id: chatId}}) {
    await bot.sendMessage(chatId, '히이이익..!');
  }
}

export {
  Test2 as default,
};
