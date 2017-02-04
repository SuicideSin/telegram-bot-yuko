import getParsedRows from '../getParsedRow';

function lookupAuthStatus() {
  return getParsedRows(
    '1UToDjmLTDh15Fj_YouQnVTMEptU4uyJo6l-W94xsT4k',
    'Accounts!A1:C',
  );
}

export {
  lookupAuthStatus as default,
};
