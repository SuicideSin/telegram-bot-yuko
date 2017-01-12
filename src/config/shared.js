const shared = {
  key: process.env.BOT_TOKEN || botToken(),
  sheets: {
    clientSecret: process.env.SHEETS_CLIENT_SECRET || sheetsClientSecret(),
    oauthSecret: process.env.SHEETS_OAUTH_SECRET || sheetsOauthSecret(),
  },
};

function botToken() {
  throw new Error('Environment variable `BOT_TOKEN` should be exist');
}

function sheetsClientSecret() {
  throw new Error('Environment variable `SHEETS_CLIENT_SECRET` should be exist');
}

function sheetsOauthSecret() {
  throw new Error('Environment variable `SHEETS_OAUTH_SECRET` should be exist');
}

export {
  shared as default,
};
