import pifyProto from 'pify-proto';
import Datastore from 'nedb';

class StoreBase {
  stores = {};

  get(name) {
    return this.stores[name];
  }

  create(name) {
    if (this.stores[name]) {
      return Promise.reject();
    }

    const store = this.stores[name] = pifyProto(new Datastore());

    return store.loadDatabase();
  }
}

export {
  StoreBase as default,
};
