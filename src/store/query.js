import {getStore} from '.';

async function getUser(username) {
  const store = await getStore('users');
  const [uzer] = await store.find({
    id: username,
  });

  return uzer;
}

async function setUser(username) {
  const store = await getStore('users');

  return store.insert({id: username});
}

async function updateUser(username, data) {
  const store = await getStore('users');

  return store.update({id: username}, data);
}

async function deleteUser(username) {
  const store = await getStore('users');

  return store.remove({id: username});
}

export {
  getUser,
  setUser,
  updateUser,
  deleteUser,
};
