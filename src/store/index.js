import storeConfig from '../config/store';
import StoreBase from './StoreBase';

const store = new StoreBase();

function getStore(name) {
  return store.get(name);
}

function createStore(name) {
  return store.create(name);
}

function registerStore() {
  const storePromises = storeConfig.stores
    .map((elem) => createStore(elem));

  return Promise.all(storePromises);
}

export {
  getStore,
  createStore,
  registerStore,
};
