import Handler from '../core/Handler';
import {getProperStore, bindActions} from '../store';
import * as counterActions from '../store/actions/counter';
import createCommand from '../utils/createCommand';

const counter = bindActions(counterActions, (username) => getProperStore(username));

class Test extends Handler {
  getCommandTarget() {
    return createCommand(['test', '테스트'], true);
  }

  async didReceiveCommand(bot, {chat: {id: chatId}, from: {username}}, [, input]) {
    switch (input) {
      case '+': {
        await counter.add(username);
        await bot.sendMessage(chatId, `추가: ${JSON.stringify(await counter.getCounter(username))}`);

        break;
      }
      case '-': {
        await counter.sub(username);
        await bot.sendMessage(chatId, `빼기: ${JSON.stringify(await counter.getCounter(username))}`);

        break;
      }
      default: {
        await bot.sendMessage(chatId, JSON.stringify(await counter.getCounter(username)));
      }
    }
  }
}

export {
  Test as default,
};
