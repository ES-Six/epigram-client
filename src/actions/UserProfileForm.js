import axios from 'axios';

export const updateName = name => ({
  type: 'UPDATE_NAME',
  name,
});

export const updateFirstName = firstName => ({
  type: 'UPDATE_FIRST_NAME',
  firstName,
});

export const updateAdress = adress => ({
  type: 'UPDATE_ADRESS',
  adress,
});

export const updateCity = city => ({
  type: 'UPDATE_CITY',
  city,
});

export const updateZip = zip => ({
  type: 'UPDATE_ZIP',
  zip,
});

export const updateCountry = country => ({
  type: 'UPDATE_COUNTRY',
  country,
});

export const updateUserFields = (name, firstName, adress, city, zip, country) => ({
  type: 'UPDATE_FIELDS',
  name,
  firstName,
  adress,
  city,
  zip,
  country,
});

export const fetchUser = () => (dispatch) => {
  const request = axios.get('/user');
  return request.then(
    response => dispatch(updateUserFields(
      response.data.result.name,
      response.data.result.first_name,
      response.data.result.adress,
      response.data.result.city,
      response.data.result.zip,
      response.data.result.country,
    )),
    () => dispatch(updateUserFields('', '', '', '', '', '')),
  );
};
