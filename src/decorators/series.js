function series(Handler) {
  return class SeriesHandler extends Handler {
    _seqTarget = new Map();

    didReceiveCommand(...args) {
      const [, {from: {username}}] = args;
      const handleSeries = () => {
        const target = this._seqTarget.get(username);

        // 큐의 작업이 모두 실행되면 삭제
        if (target.length < 1) {
          this._seqTarget.delete(username);

          return Promise.resolve();
        }

        // FIXME: Babel의 문제로 인해 임시 조치
        return super.didReceiveCommand(...target.shift())
          .catch((err) => {
            this._seqTarget.delete(username);

            throw err;
          })
          .then(handleSeries);
      };

      // 핸들러가 이미 실행중이면 큐에 추가
      if (this._seqTarget.has(username)) {
        this._seqTarget.get(username).push(args);

        return Promise.resolve();
      }

      // 핸들러 설정
      this._seqTarget.set(username, [args]);

      // 큐 작업 실행
      return handleSeries();
    }
  };
}

export {
  series as default,
};
