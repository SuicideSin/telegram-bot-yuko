import Promise from 'bluebird';
import NeDBStore from 'nedb';

Promise.promisifyAll(NeDBStore.prototype, {multiArgs: true});

let sessionStorage = new NeDBStore();

function getSessionDatabase() {
  return sessionStorage;
}

async function initSessionDatabase() {
  await sessionStorage.loadDatabase();
}

export {
  getSessionDatabase,
  initSessionDatabase
};
