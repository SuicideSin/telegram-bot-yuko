import pifyProto from 'pify-proto';
import Datastore from 'nedb';

class StoreBase {
  stores = new Map();

  get(name) {
    return this.stores.get(name);
  }

  async create(name, options) {
    if (this.stores.has(name)) {
      throw new Error(`Store ${name} already exist.`);
    }

    const store = pifyProto(new Datastore(options));

    this.stores.set(name, store);
    await store.loadDatabase();

    return store;
  }
}

export {
  StoreBase as default,
};
