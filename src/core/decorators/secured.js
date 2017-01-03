import authStrings from '../../strings/auth';
import HandlerError from '../../core/HandlerError';
import verifyLogin from '../../utils/verifyLogin';

function secured(Handler) {
  return class SecuredHandler extends Handler {
    didRecieveCommand(...args) {
      const [, {from: {username}}] = args;

      // FIXME: Babel의 문제로 인해 임시 조치
      return this._verifyUser(username)
        .then(() => super.didRecieveCommand(...args));
    }

    didRecieveEvent(...args) {
      const [, {from: {username}}] = args;

      // FIXME: Babel의 문제로 인해 임시 조치
      return this._verifyUser(username, true)
        .then(() => super.didRecieveEvent(...args));
    }

    async _verifyUser(username, event = false) {
      const hasSigned = await verifyLogin(username);

      if (!hasSigned) {
        throw new HandlerError(authStrings.notSigned, {event});
      }
    }
  };
}

export {
  secured as default,
};
