import HandlerError from '../core/HandlerError';
import commonsStrings from '../strings/commons';

function wrapProcMessage(message) {
  return (target, key, descriptor) => {
    const {value: func} = descriptor;

    return {
      ...descriptor,
      async value(...args) {
        const [bot, {chat: {id: chatId}}] = args;
        const {message_id: sentMessage} = await bot.sendMessage(chatId, message);

        try {
          await func.apply(this, [sentMessage, ...args]);
        } catch (err) {
          if (err instanceof HandlerError) {
            throw HandlerError.from(err, {messageId: sentMessage});
          }

          logger.error(err);
          throw new HandlerError(commonsStrings.error, {messageId: sentMessage});
          // 이 부분에서 일반 에러를 잡더라도 모두 한가지 메시지로 바꿔버린다. 그렇다고 메시지를 쓰면 그대로 나간다.
          // 적절한 해결책이 필요하다
        }
      },
    };
  };
}

export {
  wrapProcMessage as default,
};
