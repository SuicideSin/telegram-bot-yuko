import Random, {engines} from 'random-js';
import Handler from '../../core/Handler';
import secured from '../../core/decorators/secured';
import createCommand from '../../utils/createCommand';
import dataConfig from '../../config/data';

@secured
class Dice extends Handler {
  static maxDiceCount = 3;

  randomEngine = new Random(engines.mt19937().autoSeed());

  getCommand() {
    return createCommand(['dice', '주사위'], true);
  }

  async didRecieveCommand(bot, {chat: {id: chatId}}, [, inputNumber]) {
    const diceNumber = Number.parseInt(inputNumber);
    const count = Number.isInteger(diceNumber)
      ? Math.min(Math.abs(diceNumber), Dice.maxDiceCount)
      : 1;
    const randomDices = Array.from({length: count}, () => this.randomEngine.integer(0, 5));

    await Promise.all(randomDices.map((dice) => bot.sendSticker(chatId, dataConfig.dices[dice])));
  }
}

export {
  Dice as default,
};
