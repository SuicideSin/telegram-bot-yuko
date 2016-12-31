function getUserFullName({first_name: firstName = '', last_name: lastName = ''}) {
  let ret = firstName;

  if (lastName) {
    ret += ` ${lastName}`;
  }

  return ret;
}

function makeCommand(commands, acceptArgs = false) {
  let commandStr = commands.join('|');
  let args = acceptArgs ? '(?:\\s+(.*))?' : '';
  let regexp = `/(?:${commandStr})(?:@\\S+)?${args}$`;

  return new RegExp(regexp);
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
