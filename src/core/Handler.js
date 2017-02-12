class Handler {
  getCommandTarget() {
    return null;
  }

  getEventTarget() {
    return [];
  }

  didReceiveCommand(/* bot, message, match */) { /* noop */ }

  didReceiveEvent(/* bot, message, type */) { /* noop */ }
}

export {
  Handler as default,
};
