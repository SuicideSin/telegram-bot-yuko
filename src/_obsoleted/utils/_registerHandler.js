import verifyLogin from '../utils/verifyLogin';
import strings from '../config/strings.js';

const {auth: authString} = strings;

function registerHandler(bot, handler, options = {}) {
  let {isSession = false, insecure = false} = options; // 위에 써도 되지만 간결한 코드를 위해 이곳에..
  let handlerFunc = isSession ? 'on' : 'onText';

  for (let elem of handler) {
    bot[handlerFunc](elem.target, (...args) => {
      // nested async function
      (async () => {
        let [{chat: {id: chatId}, from: {id: targetId}}] = args;

        try {
          // insecure일 땐 건너뛰고 아니라면 verify
          if (!insecure && !(await verifyLogin(targetId))) {
            throw new Error(authString.notSigned);
          }

          await elem.onEvent(bot, ...args); // Promise를 반환하는 함수가 아니여도 됨, 하지만 가능하면 async로..
        } catch (error) {
          if (!isSession) {
            await bot.sendMessage(chatId, error.message);
          }

          console.error(error);
        }
      })();
    });
  }
}

export {
  registerHandler as default
};
