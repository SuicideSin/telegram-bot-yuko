function createCommand(commands, acceptArgs = false) {
  const commandStr = commands.join('|');
  const args = acceptArgs ? '(?:\\s+(.*))?' : '';
  const regexp = `/(?:${commandStr})(?:@\\S+)?${args}$`;

  return new RegExp(regexp);
}

export {
  createCommand as default,
};
