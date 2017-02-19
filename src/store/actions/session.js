import {getStore} from '..';

function registerSession(username) {
  const store = getStore('session');

  return store.insert({username});
}

function unregisterSession(username) {
  const store = getStore('session');

  return store.remove({username});
}

async function verifySession(username) {
  const store = getStore('session');
  const [user] = await store.find({
    username,
  });

  return user !== null && typeof user === 'object';
}

export {
  registerSession,
  unregisterSession,
  verifySession,
};
