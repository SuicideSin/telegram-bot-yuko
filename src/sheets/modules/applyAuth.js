function applyAuth(api, auth) {
  return Object.keys(api)
    .reduce((res, elem) => {
      const {[elem]: target} = api;

      if (typeof target === 'function') {
        res[elem] = (opts) => target.apply(res, [{ // eslint-disable-line no-param-reassign
          ...opts,
          auth,
        }]);
      } else if (target !== null && typeof target === 'object') {
        res[elem] = applyAuth(target, auth); // eslint-disable-line no-param-reassign
      } else {
        res[elem] = target; // eslint-disable-line no-param-reassign
      }

      return res;
    }, {});
}

export {
  applyAuth as default,
};
