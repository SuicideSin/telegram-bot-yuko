import {storeQuery} from '../store';

async function verifyLogin(username) {
  const user = await storeQuery.getUser(username);

  return user !== null && typeof user === 'object';
}

export {
  verifyLogin as default,
};
