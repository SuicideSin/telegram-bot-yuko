class HandlerError extends Error {
  constructor(errorMessage, opts = {}) {
    super(errorMessage);
    this.opts = opts;
  }
}

export {
  HandlerError as default,
};
