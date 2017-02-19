async function add(store, username) {
  const [user] = await store.find({
    username,
  });

  const counter = {
    count: 0,
    ...user.counter,
  };

  store.update(user, {
    $set: {
      counter: {
        ...counter,
        count: counter.count++,
      },
    },
  });
}

async function sub(store, username) {

}

async function getCounter(store, username) {
  const [user] = await store.find({
    username,
  });

  return {
    count: 0,
    ...user.counter,
  };
}

export {
  add,
  sub,
  getCount,
};
