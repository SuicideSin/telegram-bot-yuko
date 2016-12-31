import sharedConfig from '../config/shared';
import getAuth from './getAuth';

function getDefaultAuth() {
  const {sheets: {clientSecretPath, oauthSecretPath}} = sharedConfig;

  return getAuth(clientSecretPath, oauthSecretPath);
}

export {
  getDefaultAuth as default,
};
