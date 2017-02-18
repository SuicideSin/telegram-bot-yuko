import HandlerError from '../core/HandlerError';
import {verifySession} from '../store/actions/session';
import authStrings from '../strings/auth';

function secured(mapStore) {
  const ensureLogin = async (username, errorOpts) => {
    const store = await mapStore();
    const hasSigned = await verifySession(store, username);

    if (!hasSigned) {
      throw new HandlerError(authStrings.notSigned, errorOpts);
    }
  };

  return (Handler) => class SecuredHandler extends Handler {
    didReceiveCommand(...args) {
      const [, {from: {username}}] = args;

      // FIXME: Babel의 이슈로 인해 임시 조치
      return ensureLogin(username)
        .then(() => super.didReceiveCommand(...args));
    }

    didReceiveEvent(...args) {
      const [, {from: {username}}] = args;

      // FIXME: Babel의 이슈로 인해 임시 조치
      return ensureLogin(username, {event: true})
        .then(() => super.didReceiveEvent(...args));
    }
  };
}

export {
  secured as default,
};
