import TelegramBot from 'node-telegram-bot-api';
import winston from 'winston';
import commonsStrings from '../strings/commons';
import HandlerError from './HandlerError';

class Bot extends TelegramBot {
  _handlers = new Set();

  constructor(key) {
    super(key, {
      polling: {
        interval: 0,
      },
    });
  }

  async start() {
    // 미처리 메시지 초기화
    await this._clearUnhandledMessages();

    // 핸들러 초기화
    for (const handler of this._handlers) {
      const command = handler.getCommand();

      // 커맨드 등록
      if (command) {
        this.onText(command, this._wrapErrorHandler(
          (message, match) => handler.didRecieveCommand(this, message, match),
        ));
      }

      // 이벤트 핸들러 등록
      for (const event of handler.getEventTarget()) {
        this.on(event, this._wrapErrorHandler(
          (message) => handler.didRecieveEvent(this, message, event),
        ));
      }
    }
  }

  registerHandler(handler) {
    this._handlers.add(handler);
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
        if (!event) {
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
        winston.error(`${event ? '[EVENT]' : '[COMMAND]'} ${err.message.replace(/\n/, ' ')} ${JSON.stringify(message)}`);
      }
    };
  }

  _clearUnhandledMessages() {
    return this.getUpdates();
  }
}

export {
  Bot as default,
};
