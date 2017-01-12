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
winston.level = 'debug';

async function init() {
  // 스토어 초기화
  await initStore();

  // 시트 초기화
  await initSheets();

  // 봇 생성
  const bot = new Bot(sharedConfig.key);

  // 초기화 로그
  winston.info(sharedStrings.init);

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
