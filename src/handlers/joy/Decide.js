import Random, {engines} from 'random-js';
import Handler from '../../core/Handler';
import secured from '../../decorators/secured';
import createCommand from '../../utils/createCommand';

class Decide extends Handler {
  randomEngine = new Random(engines.mt19937().autoSeed());

  getCommandTarget() {
    return createCommand(['decide', '결정'], true);
  }

  @secured()
  async didReceiveCommand(bot, {chat: {id: chatId}}, [, rawInput]) {
    const input = rawInput.split(' ');
    const {length: inputLength} = input;
    const randNum = this.randomEngine.integer(0, inputLength - 1);

    await bot.sendMessage(chatId, input[randNum]);
  }
}

export {
  Decide as default,
};
