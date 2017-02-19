import storeConfig from '../config/store';
import StoreBase from './modules/StoreBase';

const store = new StoreBase();

function getStore(name) {
  return store.get(name);
}

function initStore() {
  const storePromises = storeConfig.stores
    .map(({name, options, indexingRules}) => createStore(name, options, indexingRules));

  return Promise.all(storePromises);
}

async function createStore(name, options, indexingRules) {
  const createdStore = await store.create(name, options);

  if (Array.isArray(indexingRules)) {
    await Promise.all(indexingRules.map((opts) => createdStore.ensureIndex(opts)));
  }

  return createdStore;
}

export bindActions from './bindActions';
export getProperStore from './getProperStore';

export {
  getStore,
  initStore,
};
