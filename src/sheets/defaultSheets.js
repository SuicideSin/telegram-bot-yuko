import sharedConfig from '../config/shared';
import getAuth from './getAuth';
import getSheets from './getSheets';

const sheets = getSheets();
let auth = null;

async function getValues(sheetId, range) {
  const {values} = await sheets.values.get({
    auth,
    spreadsheetId: sheetId,
    range,
  });

  return values;
}

async function initSheets() {
  const {sheets: {clientSecretPath, oauthSecretPath}} = sharedConfig;

  auth = await getAuth(clientSecretPath, oauthSecretPath);
}

export {
  getValues,
  initSheets,
};
