import _merge from 'lodash.merge';

async function add(store, username) {
  const counter = await getCounter(store, username);

  return setCounter(store, username, {
    count: counter.count + 1,
  });
}

async function sub(store, username) {
  const counter = await getCounter(store, username);

  return setCounter(store, username, {
    count: counter.count - 1,
  });
}

async function getCounter(store, username) {
  const [user] = await store.find({username});

  const defaults = {
    count: 0,
  };

  return _merge(defaults, user.counter);
}

async function setCounter(store, username, val) {
  const [user] = await store.find({username});
  const counter = await getCounter(username);

  return store.update(user, {
    $set: {
      counter: _merge(counter, val),
    },
  });
}

export {
  add,
  sub,
  getCounter,
  setCounter,
};
