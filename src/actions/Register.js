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

export const setPasswordDoesntMatchErorr = () => ({
  type: 'PASSWORD_DOESNT_MATCH',
});

export const setPasswordTooShortErorr = () => ({
  type: 'PASSWORD_TOO_SHORT',
});
