import {getUser} from '../store/query';

async function verifyLogin(username) {
  const user = await getUser(username);

  return user !== undefined && user !== null;
}

export {
  verifyLogin as default,
};
