import {getStore} from '..';

function signin(username) {
  const store = getStore('users');

  return store.insert({username});
}

function signout(username) {
  const store = getStore('users');

  return store.delete({username});
}

async function verifySignin(username) {
  const store = getStore('users');
  const [user] = await store.find({
    username,
  });

  return user !== null && typeof user === 'object';
}

export {
  signin,
  signout,
  verifySignin,
};
