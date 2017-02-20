function registerSession(store, username) {
  return store.insert({username});
}

async function unregisterSession(store, username) {
  const session = await getSession(store, username);

  return store.remove(session);
}

async function existSession(store, username) {
  const session = await getSession(store, username);

  return session !== null && typeof session === 'object';
}

async function getSession(store, username) {
  const [session] = await store.find({username});

  return session;
}

async function setSession(store, username, val) {
  const session = await getSession(store, username);

  return store.update(session, {$set: val});
}

export {
  registerSession,
  unregisterSession,
  existSession,
  getSession,
  setSession,
};
