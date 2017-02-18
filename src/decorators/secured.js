import HandlerError from '../core/HandlerError';
import {verifySession} from '../store/actions/session';
import authStrings from '../strings/auth';

function secured(mapStore, shouldBeEvent = false) {
  return (target, key, descriptor) => {
    const {value: func} = descriptor;

    return {
      ...descriptor,
      async value(...args) {
        const [, {from: {username}}] = args;
        const store = await mapStore();
        const hasSigned = await verifySession(store, username);

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
