import {
  registerSession,
  verifySession,
} from './actions/session';
import {getStore} from '.';

async function getProperStore(username) {
  const sessions = getStore('sessions');
  const tempSessions = getStore('tempSessions');

  if (await verifySession(sessions, username)) {
    return sessions;
  }

  if (await verifySession(tempSessions, username)) {
    return tempSessions;
  }

  await registerSession(tempSessions, username);

  return tempSessions;
}

export {
  getProperStore as default,
};
