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

export const setLoginError = error => ({
  type: 'LOGIN_ERROR',
  error,
});
