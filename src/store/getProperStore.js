import {
  registerSession,
  verifySession,
} from './actions/session';
import {getStore} from '.';

async function getProperStore(username) {
  const session = getStore('session');
  const temp = getStore('temp');

  if (await verifySession(session, username)) {
    return session;
  }

  if (await verifySession(temp, username)) {
    return temp;
  }

  await registerSession(temp, username);

  return temp;
}

export {
  getProperStore as default,
};
