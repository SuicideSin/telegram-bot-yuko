class Handler {
  getCommand() {
    return null;
  }

  getEventTarget() {
    return [];
  }

  didRecieveCommand(/* bot, message, match */) { /* empty */ }

  didRecieveEvent(/* bot, message, type */) { /* empty */ }
}

export {
  Handler as default,
};