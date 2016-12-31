import {readFile} from 'fs';
import pify from 'pify';
import mem from 'mem';
import GoogleAuth from 'google-auth-library';

const readFileP = pify(readFile);

async function getAuthInner(clientSecretPath, oauthSecretPath) {
  const {
    installed: {
      client_secret: clientSecret,
      client_id: clientId,
      redirect_uris: [redirectUris],
    },
  } = JSON.parse(await readFileP(clientSecretPath, 'utf8'));

  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUris);

  oauth2Client.credentials = JSON.parse(await readFileP(oauthSecretPath, 'utf8'));

  return oauth2Client;
}

const getAuth = mem(getAuthInner);

export {
  getAuth as default,
};
