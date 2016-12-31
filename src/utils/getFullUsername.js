function getFullUsername({first_name: firstName = '', last_name: lastName}) {
  return firstName + (lastName ? ` ${lastName}` : '');
}

export {
  getFullUsername as default,
};
