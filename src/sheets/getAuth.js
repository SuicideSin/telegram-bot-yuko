import GoogleAuth from 'google-auth-library';

function getAuth(clientSecretObj, oauthSecretObj) {
  const {
    installed: {
      client_secret: clientSecret,
      client_id: clientId,
      redirect_uris: [redirectUris],
    },
  } = clientSecretObj;

  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUris);

  oauth2Client.credentials = oauthSecretObj;

  return oauth2Client;
}

export {
  getAuth as default,
};
