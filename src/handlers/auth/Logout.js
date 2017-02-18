import Handler from '../../core/Handler';
import bindActions from '../../decorators/bindActions';
import secured from '../../decorators/secured';
import series from '../../decorators/series';
import wrapProcMessage from '../../decorators/wrapProcMessage';
import {getStore} from '../../store';
import * as sessionActions from '../../store/actions/session';
import createCommand from '../../utils/createCommand';
import getFullname from '../../utils/getFullname';
import authStrings from '../../strings/auth';
import commonsStrings from '../../strings/commons';

// 1. 시트 API와 사용상 부조화 - 문제가 좀 있어보임
// 2. 데코레이터가 너무 많고 더러움 - 어느정도 필요한 것일 수도 있음
// 3. 데코레이터를 위해 import가 늘어남 - 이건 확실히 좋지 않음
// 4. 일단 로그인 로직을 데코레이터에 넣지 않는건 맞음
// 5. 근데 꼭 데코레이터를 써야 하는 이유는?

// TODO: series 함수 형태로 만들고, 클래스가 아닌 함수를 받게 한다. 여러 명, 한 명 기준과 최대 큐를 정의할 수 있게 한다.

// 그리고 무엇보다 저렇게 스토어를 함수로 보내는게 맘에 안듬

@secured(() => getStore('sessions'))
@bindActions(() => getStore('sessions'), () => sessionActions)
class Logout extends Handler {
  getCommandTarget() {
    return createCommand(['logout', '로그아웃']);
  }

  @series()
  @wrapProcMessage(commonsStrings.processing)
  async didReceiveCommand(messageId, bot, {chat: {id: chatId}, from}) {
    const {username} = from;

    await this.actions.unregisterSession(username);
    await bot.editMessageText(authStrings.signout(getFullname(from)), {
      chat_id: chatId,
      message_id: messageId,
    });
  }
}

export {
  Logout as default,
};
