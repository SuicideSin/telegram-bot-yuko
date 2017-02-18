import pifyProto from 'pify-proto';
import Datastore from 'nedb';

class StoreBase {
  stores = new Map();

  get(name) {
    return this.stores.get(name);
  }

  async create(name, options) {
    if (this.stores.has(name)) {
      throw new Error(`스토어 ${name} 가 이미 존재합니다`);
    }

    const store = pifyProto(new Datastore(options));

    await store.loadDatabase();
    this.stores.set(name, store);

    return store;
  }
}

export {
  StoreBase as default,
};
