import HandlerError from '../core/HandlerError';
import {getStore, bindActions} from '../store';
import * as sessionActions from '../store/actions/session';
import strings from '../config/strings';

const session = bindActions(sessionActions, () => getStore('session'));

function secured(verifyFunc = session.existSession, shouldBeEvent = false) {
  return (target, key, descriptor) => {
    const {value: func} = descriptor;

    return {
      ...descriptor,
      async value(...args) {
        const [, {from: {username}}] = args;
        const hasSigned = await verifyFunc(username);

        if (!hasSigned) {
          throw new HandlerError(strings.auth.notSigned, {event: shouldBeEvent});
        }

        return func.apply(this, args);
      },
    };
  };
}

export {
  secured as default,
};
