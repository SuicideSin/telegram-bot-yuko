import getParsedRows from '../getParsedRow';

function getCurrentUsers() {
  return getParsedRows(
    '1UToDjmLTDh15Fj_YouQnVTMEptU4uyJo6l-W94xsT4k',
    'Accounts!A1:C',
  );
}

export {
  getCurrentUsers, // eslint-disable-line import/prefer-default-export
};
