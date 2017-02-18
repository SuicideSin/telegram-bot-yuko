function bindActions(mapStore, mapActions) {
  return (Handler) => class BindedHandler extends Handler {
    actions = Object.entries(mapActions())
      .reduce((res, [key, prop]) => {
        res[key] = async (...args) => { // eslint-disable-line no-param-reassign
          const store = await mapStore();

          return prop(store, ...args);
        };

        return res;
      }, {});
  };
}

export {
  bindActions as default,
};
