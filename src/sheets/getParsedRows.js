import _zipObject from 'lodash.zipobject';
import {getSheets} from '.';

async function getParsedRows(sheetId, range, startRow = 2) {
  const sheets = getSheets();
  const {values} = await sheets.values.get({
    spreadsheetId: sheetId,
    range,
  });

  // 첫번째 줄을 맵으로 설정
  const [map] = values;

  // 데이터 부분만 잘라내기, `startRow`를 데이터 시작점으로 설정
  const data = values.slice(startRow);

  return data.map((elem) => _zipObject(map, elem));
}

export {
  getParsedRows as default,
};
