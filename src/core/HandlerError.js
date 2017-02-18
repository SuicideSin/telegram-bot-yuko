class HandlerError extends Error {
  static from(error, opts) {
    const {message, opts: errOpts = {}} = error;

    return new HandlerError(message, {
      ...errOpts,
      ...opts,
    });
  }

  constructor(message, opts = {}) {
    super(message);
    this.opts = opts;
  }
}

export {
  HandlerError as default,
};
