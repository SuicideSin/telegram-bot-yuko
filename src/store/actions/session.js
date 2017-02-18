function registerSession(store, username) {
  return store.insert({username});
}

function unregisterSession(store, username) {
  return store.remove({username});
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
