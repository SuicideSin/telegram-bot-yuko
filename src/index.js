import 'babel-polyfill';
import './env';
import * as winston from 'winston';
import Bot from './core/Bot';
import * as handlers from './handlers';
import {initStore} from './store';
import {initSheets} from './sheets';
import sharedConfig from './config/shared';
import sharedStrings from './strings/shared';

// 디버그 설정
if (process.env.NODE_ENV === 'development') {
  winston.level = 'debug';
}

// 봇 초기화
async function init() {
  // 스토어 및 시트 초기화
  await initStore();
  await initSheets();

  // 봇 생성
  const bot = new Bot(sharedConfig.key);

  // 핸들러 등록
  for (const Handler of Object.values(handlers)) {
    bot.registerHandler(new Handler());
  }

  // 봇 시작
  await bot.start();

  // 시작 로그
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
