import pify from 'pify';
import {sheets as googlesheets} from 'googleapis';
import sharedConfig from '../config/shared';
import getAuth from './modules/getAuth';
import applyAuth from './modules/applyAuth';

const {spreadsheets} = googlesheets('v4');
const sheetsAPI = pify({
  ...spreadsheets,
  values: pify(spreadsheets.values),
  sheets: pify(spreadsheets.sheets),
});

let sheets = null;

function getSheets() {
  return sheets;
}

async function initSheets() {
  const {sheets: {clientSecret, oauthSecret}} = sharedConfig;
  const auth = await getAuth(JSON.parse(clientSecret), JSON.parse(oauthSecret));

  sheets = applyAuth(sheetsAPI, auth);
}

export getParsedRows from './getParsedRows';

export {
  getSheets,
  initSheets,
};
