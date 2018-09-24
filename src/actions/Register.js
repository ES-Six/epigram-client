export const doRegistration = successCallback => ({
  type: 'DO_REGISTRATION',
  successCallback,
});

export const updateEmail = email => ({
  type: 'UPDATE_EMAIL',
  email,
});

export const updatePassword = password => ({
  type: 'UPDATE_PASSWORD',
  password,
});

export const updatePasswordConfirmation = password => ({
  type: 'UPDATE_PASSWORD_CONFIRMATION',
  password,
});


export const setEmailAlreadyUsedErorr = () => ({
  type: 'EMAIL_ALREADY_USED',
});
