class Handler {
  getCommandTarget() {
    return null;
  }

  getEventTarget() {
    return [];
  }

  didReceiveCommand(/* bot, message, match */) { /* empty */ }

  didReceiveEvent(/* bot, message, type */) { /* empty */ }
}

export {
  Handler as default,
};
