import TelegramBot from 'node-telegram-bot-api';
import commonsStrings from '../strings/commons';
import HandlerError from './HandlerError';

class Bot extends TelegramBot {
  _handlers = new Set();

  async start() {
    // 미처리 메시지 초기화
    await this.getUpdates();

    // 봇 정보
    logger.status('Bot information:', await this.getMe());

    // 폴링 시작
    this.startPolling();

    // 핸들러 초기화
    for (const handler of this._handlers) {
      const command = handler.getCommandTarget();

      // 커맨드 등록
      if (command) {
        this.onText(command, this._wrapErrorHandler(
          (message, match) => handler.didReceiveCommand(this, message, match),
        ));
      }

      // 이벤트 핸들러 등록
      for (const event of handler.getEventTarget()) {
        this.on(event, this._wrapErrorHandler(
          (message) => handler.didReceiveEvent(this, message, event),
        ));
      }
    }

    this.on('polling_error', (err) => logger.error(err));
    this.on('webhook_error', (err) => logger.error(err));
  }

  registerHandler(handler) {
    this._handlers.add(handler);
  }

  startPolling() {
    super.startPolling({
      interval: 0,
    });
  }

  _wrapErrorHandler(handler) {
    return async (...args) => {
      try {
        await handler(...args);
      } catch (err) {
        const [message] = args;
        const {chat: {id: chatId}} = message;
        const {opts: {event, messageId} = {}} = err;
        const errorMessage = err instanceof HandlerError
          ? err.message
          : commonsStrings.error;

        // 이벤트인 경우 건너뛰기
        if (event === null || typeof event !== 'object') {
          // 적절히 처리한 오류 메시지를 보냄
          if (messageId !== undefined && messageId !== null) {
            await this.editMessageText(errorMessage, {
              chat_id: chatId,
              message_id: messageId,
            });
          } else {
            await this.sendMessage(chatId, errorMessage);
          }
        }

        // 전체 오류 메시지를 로그에 기록
        const log = event
          ? (...logArgs) => logger.event(...logArgs)
          : (...logArgs) => logger.command(...logArgs);

        log(err.stack, message);
      }
    };
  }
}

export {
  Bot as default,
};
