import Handler from '../../core/Handler';
import getFullUsername from '../../utils/getFullUsername';
import systemStrings from '../../strings/system';

class Welcome extends Handler {
  getEventTarget() {
    return ['new_chat_participant'];
  }

  async didRecieveEvent(bot, {chat: {id: chatId}, new_chat_member: newMember}) {
    const {username} = newMember;
    const {username: botname} = await bot.getMe();
    const message = botname === username
      ? systemStrings.hello
      : systemStrings.memberJoin(getFullUsername(newMember));

    await bot.sendMessage(chatId, message);
  }
}

export {
  Welcome as default,
};
