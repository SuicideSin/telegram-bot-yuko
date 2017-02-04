import pify from 'pify';
import {sheets as googlesheets} from 'googleapis';
import sharedConfig from '../config/shared';
import getAuth from './getAuth';

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

  sheets = applyAuth(sheetsAPI, await getAuth(JSON.parse(clientSecret), JSON.parse(oauthSecret)));
}

function applyAuth(api, auth) {
  return Object.keys(api)
    .reduce((res, elem) => {
      const {[elem]: target} = api;

      if (typeof target === 'function') {
        res[elem] = (opts) => target.apply(res, [{ // eslint-disable-line no-param-reassign
          ...opts,
          auth,
        }]);
      } else if (target !== null && typeof target === 'object') {
        res[elem] = applyAuth(target, auth); // eslint-disable-line no-param-reassign
      } else {
        res[elem] = target; // eslint-disable-line no-param-reassign
      }

      return res;
    }, {});
}

export {
  getSheets,
  initSheets,
};
