function series(Handler) {
  return class SeriesHandler extends Handler {
    _seqTargets = new Map();

    didRecieveCommand(...args) {
      const [, {from: {username}}] = args;
      const handleSeries = () => {
        const target = this._seqTargets.get(username);

        // 큐의 작업이 모두 실행되면 삭제
        if (target.length < 1) {
          this._seqTargets.delete(username);

          return Promise.resolve();
        }

        // FIXME: Babel의 문제로 인해 임시 조치
        return super.didRecieveCommand(...target.shift())
          .catch((err) => {
            this._seqTargets.delete(username);

            throw err;
          })
          .then(() => handleSeries());
      };

      // 핸들러가 이미 실행중이면 큐에 추가
      if (this._seqTargets.has(username)) {
        this._seqTargets.get(username).push(args);

        return Promise.resolve();
      }

      // 핸들러 설정
      this._seqTargets.set(username, [args]);

      // 큐 작업 실행
      return handleSeries();
    }
  };
}

export {
  series as default,
};
