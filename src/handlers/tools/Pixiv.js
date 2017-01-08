import {get} from 'got';
import PixivAPI from 'pixiv-api-client';
import Handler from '../../core/Handler';
import secured from '../../core/decorators/secured';
import createCommand from '../../utils/createCommand';

@secured
class Pixiv extends Handler {
  static maxCount = 5;

  pixiv = new PixivAPI();

  getCommandTarget() {
    return createCommand(['pixiv', '픽시브'], true);
  }

  async didReceiveCommand(bot, {chat: {id: chatId}}, match) {
    await bot.sendChatAction(chatId, 'upload_photo');

    const [, inputNumber] = match;
    const diceNumber = Number.parseInt(inputNumber);
    const count = Number.isInteger(diceNumber)
      ? Math.min(Math.abs(diceNumber), Pixiv.maxCount)
      : 1;

    const {illusts} = await this.pixiv.illustRecommendedPublic();
    const data = illusts
      .map(({id, image_urls: {large}}) => ({id, uri: large}))
      .slice(0, count);

    await Promise.all(data.map(async ({id, uri}) => {
      const illustPageURI = `http://www.pixiv.net/member_illust.php?mode=medium&illust_id=${id}`;
      const {body: photo} = await get(uri, {
        encoding: null,
        headers: {
          referer: illustPageURI,
        },
      });

      return bot.sendPhoto(chatId, photo, {
        caption: illustPageURI,
      });
    }));
  }
}

export {
  Pixiv as default,
};
