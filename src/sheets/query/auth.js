import getParsedRows from '../getParsedRow';

function getCurrentSigninStatus() {
  return getParsedRows(
    '1UToDjmLTDh15Fj_YouQnVTMEptU4uyJo6l-W94xsT4k',
    'Accounts!A1:C',
  );
}

export {
  getCurrentSigninStatus, // eslint-disable-line import/prefer-default-export
};
