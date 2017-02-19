function registerSession(store, username) {
  return store.insert({username});
}

async function unregisterSession(store, username) {
  const [user] = await store.find({
    username,
  });

  return store.remove(user);
}

async function verifySession(store, username) {
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
