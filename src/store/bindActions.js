function bindActions(actions, mapStore) {
  return Object.entries(actions)
    .reduce((res, [key, action]) => {
      res[key] = async (...args) => { // eslint-disable-line no-param-reassign
        const store = await mapStore(...args);

        return action(store, ...args);
      };

      return res;
    }, {});
}

export {
  bindActions as default,
};
