export const doLogin = (successCallback, errorCallback) => ({
  type: 'DO_LOGIN',
  successCallback,
  errorCallback,
});

export const updateEmail = email => ({
  type: 'UPDATE_EMAIL',
  email,
});

export const updatePassword = password => ({
  type: 'UPDATE_PASSWORD',
  password,
});
