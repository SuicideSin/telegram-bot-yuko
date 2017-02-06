function getFullname({first_name: firstName = '', last_name: lastName}) {
  return `${firstName}${lastName ? ` ${lastName}` : ''}`;
}

export {
  getFullname as default,
};
