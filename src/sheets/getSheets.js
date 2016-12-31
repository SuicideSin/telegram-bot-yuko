import pify from 'pify';
import {sheets} from 'googleapis';

const {spreadsheets} = sheets('v4');
const spreadsheetsP = pify({
  ...spreadsheets,
  values: pify(spreadsheets.values),
  sheets: pify(spreadsheets.sheets),
});

function getSheets() {
  return spreadsheetsP;
}

export {
  getSheets as default,
};
