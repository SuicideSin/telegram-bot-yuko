import _zipObject from 'lodash.zipobject';
import {getValues} from './defaultSheets';

async function getParsedRows(sheetId, range, startRow = 2) {
  const values = await getValues(sheetId, range);

  // 첫번째 줄을 맵으로 설정
  const [map] = values;

  // 데이터 부분만 잘라내기, `startRow`를 데이터 시작점으로 설정
  const data = values.slice(startRow);

  return data.map((elem) => _zipObject(map, elem));
}

export {
  getParsedRows, // eslint-disable-line import/prefer-default-export
};
