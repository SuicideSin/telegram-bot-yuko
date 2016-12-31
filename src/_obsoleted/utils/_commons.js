function getUserFullName({first_name: firstName = '', last_name: lastName = ''}) {
  let ret = firstName;

  if (lastName) {
    ret += ` ${lastName}`;
  }

  return ret;
}

function buildHelpString(options = {}) {
  let {title = '', description = '', footer = ''} = options;
  return `*${title}*\n\n${description}\n\n${footer}`;
}

export {
  getUserFullName,
  makeCommand,
  buildHelpString
};
