import authStrings from '../../strings/auth';
import HandlerError from '../../core/HandlerError';
import verifyLogin from '../verifyLogin';

function secured(Handler) {
  return class extends Handler {
    didRecieveCommand(...args) {
      const [, {from: {username}}] = args;

      // FIXME: babel의 문제로 인해 임시 조치
      return this._verifyUser(username)
        .then(() => super.didRecieveCommand(...args));
    }

    async _verifyUser(username) {
      const isSigned = await verifyLogin(username);

      if (!isSigned) {
        throw new HandlerError(authStrings.notSigned);
      }
    }
  };
}

export {
  secured as default,
};
