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
        const [{chat: {id: chatId}}] = args;
        const message = err instanceof HandlerError
          ? err.message
          : commonsStrings.error;

        await this.sendMessage(chatId, message);
        winston.error(err);
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
