import 'babel-polyfill';
import * as winston from 'winston';
import Bot from './core/Bot';
import * as handlers from './handlers';
import {registerStore} from './store';
import sharedConfig from './config/shared';
import sharedStrings from './strings/shared';

winston.level = 'debug';

async function init() {
  // 스토어 초기화
  await registerStore();

  // 봇 생성
  const bot = new Bot(sharedConfig.key);

  winston.info(sharedStrings.init);

  // 핸들러 등록
  for (const Handler of Object.values(handlers)) {
    bot.registerHandler(new Handler());
  }

  // 봇 시작
  await bot.start();

  winston.info(sharedStrings.started);
}

// 봇 시작
(async () => {
  try {
    await init();
  } catch (err) {
    winston.error(err);
  }
})();
