import HandlerError from '../core/HandlerError';
import authStrings from '../strings/auth';

function secured(verifyFunc, shouldBeEvent = false) {
  return (target, key, descriptor) => {
    const {value: func} = descriptor;

    return {
      ...descriptor,
      async value(...args) {
        const [, {from: {username}}] = args;
        const hasSigned = await verifyFunc(username);

        if (!hasSigned) {
          throw new HandlerError(authStrings.notSigned, {event: shouldBeEvent});
        }

        return func.apply(this, args);
      },
    };
  };
}

export {
  secured as default,
};
