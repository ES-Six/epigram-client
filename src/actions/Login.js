export const doLogin = (email, password) => ({
  type: 'DO_LOGIN',
  email,
  password,
});

export const updateEmail = email => ({
  type: 'UPDATE_EMAIL',
  email,
});

export const updatePassword = password => ({
  type: 'UPDATE_PASSWORD',
  password,
});
