function series(Handler) {
  return class extends Handler {
    _seqTargets = new Map();

    didRecieveCommand(...args) {
      const [, {from: {username}}] = args;
      const wrapHandler = () => {
        const target = this._seqTargets.get(username);

        if (target.length < 1) {
          this._seqTargets.delete(username);

          return Promise.resolve();
        }

        // FIXME: babel의 문제로 인해 임시 조치
        return super.didRecieveCommand(...target.shift())
          .then(() => wrapHandler());
      };

      if (!this._seqTargets.has(username)) {
        this._seqTargets.set(username, [args]);
        wrapHandler();

        return;
      }

      this._seqTargets.get(username).push(args); // FIXME: 여기 좀 맘에 안드는데 if-else
    }
  };
}

export {
  series as default,
};
