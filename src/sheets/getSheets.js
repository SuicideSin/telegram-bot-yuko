import pify from 'pify';
import {sheets} from 'googleapis';

function getSheets() {
  const {spreadsheets} = sheets('v4');

  return pify({
    ...spreadsheets,
    values: pify(spreadsheets.values),
    sheets: pify(spreadsheets.sheets),
  });
}

export {
  getSheets as default,
};
