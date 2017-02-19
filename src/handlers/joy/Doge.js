import Random, {engines} from 'random-js';
import Handler from '../../core/Handler';
import secured from '../../decorators/secured';
import createCommand from '../../utils/createCommand';
import dataConfig from '../../config/data';

class Doge extends Handler {
  static maxDogeCount = 3;

  randomEngine = new Random(engines.mt19937().autoSeed());

  getCommandTarget() {
    return createCommand(['doge', '도기'], true);
  }

  @secured()
  async didReceiveCommand(bot, {chat: {id: chatId}}, [, inputNumber]) {
    const diceNumber = Number.parseInt(inputNumber);
    const count = Number.isInteger(diceNumber)
      ? Math.min(Math.abs(diceNumber), Doge.maxDogeCount)
      : 1;
    const randomDices = Array.from({length: count}, () => this.randomEngine.integer(0, dataConfig.doges.length - 1));

    await Promise.all(randomDices.map((dice) => bot.sendSticker(chatId, dataConfig.doges[dice])));
  }
}

export {
  Doge as default,
};
