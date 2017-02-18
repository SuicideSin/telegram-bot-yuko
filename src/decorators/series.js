import HandlerError from '../core/HandlerError';

function series(queueType = 'user', maxQueue = Infinity) {
  return (target, key, descriptor) => {
    const commonSymbol = Symbol('common');
    const {value: func} = descriptor;
    const seq = new Map();

    return {
      ...descriptor,
      async value(...args) {
        const [, {from: {username}}] = args;
        const targetName = queueType === 'user' ? username : commonSymbol;

        const processSeries = async (name) => {
          const userSeq = seq.get(name);

          try {
            await func.apply(this, userSeq.shift());
          } catch (err) {
            seq.delete(name);

            throw err;
          }

          // 큐의 작업이 모두 실행되면 삭제, 아니면 계속 진행
          return userSeq.length < 1
            ? seq.delete(name)
            : processSeries(name);
        };

        // 이미 큐에 있으면 거기에 처넣고 반환
        if (seq.has(targetName)) {
          const userSeq = seq.get(targetName);

          if (userSeq.length > maxQueue) {
            throw new HandlerError('이미 큐가 꽉 찼습니다');
          }

          userSeq.push(args);

          return;
        }

        // 큐에 없으면 설정
        seq.set(targetName, [args]);

        // 큐 작업 실행
        await processSeries(targetName);
      },
    };
  };
}

export {
  series as default,
};
