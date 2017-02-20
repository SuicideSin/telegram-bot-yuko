import {getSession, setSession} from './session';

async function add(store, username) {
  const counter = await getCounter(store, username);

  return setCounter(store, username, {
    count: counter.count + 1,
  });
}

async function sub(store, username) {
  const counter = await getCounter(store, username);

  return setCounter(store, {username}, {
    count: counter.count - 1,
  });
}

async function getCounter(store, username) {
  const {counter} = await getSession(store, username);
  const defaults = {
    count: 0,
  };

  return {
    ...defaults,
    ...counter,
  };
}

async function setCounter(store, username, val) {
  const counter = await getCounter(store, username);

  return setSession(store, username, {
    counter: {
      ...counter,
      val,
    },
  });
}

async function makeCancellable(store, username) {
  const {cancellable} = await getSession(store, username);

  return setSession(store, username, {
    cancellable: [
      ...cancellable,
      {
        name: '카운터 (Counter)',
        cleanTargets: ['counter'],
      },
    ],
  });
}

export {
  add,
  sub,
  getCounter,
  setCounter,
  makeCancellable,
};
