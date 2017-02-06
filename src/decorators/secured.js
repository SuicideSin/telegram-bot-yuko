import HandlerError from '../core/HandlerError';
import {verifySignin} from '../store/query/auth';
import authStrings from '../strings/auth';

function secured(Handler) {
  const ensureLogin = async (username, errorOpts) => {
    const hasSigned = await verifySignin(username);

    if (!hasSigned) {
      throw new HandlerError(authStrings.notSigned, errorOpts);
    }
  };

  return class SecuredHandler extends Handler {
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
