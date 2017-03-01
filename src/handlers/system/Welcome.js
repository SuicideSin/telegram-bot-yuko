import Handler from '../../core/Handler';
import getFullname from '../../utils/getFullname';
import strings from '../../config/strings';

class Welcome extends Handler {
  getEventTarget() {
    return ['new_chat_participant'];
  }

  async didReceiveEvent(bot, {chat: {id: chatId}, new_chat_member: newMember}) {
    const {username} = newMember;
    const {username: botname} = await bot.getMe();
    const message = botname === username
      ? strings.system.hello
      : strings.system.memberJoin(getFullname(newMember));

    await bot.sendMessage(chatId, message);
  }
}

export {
  Welcome as default,
};
