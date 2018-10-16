import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import axios from 'axios';
import compose from 'recompose/compose';
import { translate } from 'react-translate';

import {
  updateAdress,
  updateCity,
  updateZip,
  updateCountry,
  updateName,
  updateFirstName,
  fetchUser,
} from '../actions/UserProfileForm';

class UserProfileFormContainer extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUser());
  }

  render() {
    const { classes } = this.props;
    const { formError } = this.props;
    const { adress } = this.props;
    const { city } = this.props;
    const { zip } = this.props;
    const { name } = this.props;
    const { firstName } = this.props;
    const { country } = this.props;
    const { history } = this.props;
    const { t } = this.props;
    const { dispatch } = this.props;

    const handleChange = action => (event) => {
      dispatch(action(event.target.value));
    };

    let errorField = null;
    if (formError) {
      errorField = <h4 className={classes.error}>{t('FIELDS_REQUIRED')}</h4>;
    }

    const handleFormSubmit = (e) => {
      e.preventDefault();
      axios.patch('/user', {
        adress,
        city,
        zip,
        name,
        first_name: firstName,
        country,
      }).then(() => {
        history.push('/account');
      }).catch(() => {

      });
    };

    return (
      <div>
        {errorField}
        <form
          onSubmit={handleFormSubmit}
        >
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label={t('NAME')}
                type="text"
                className={classes.textField}
                margin="normal"
                value={name}
                onChange={handleChange(updateName)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label={t('FIRST_NAME')}
                type="text"
                className={classes.textField}
                margin="normal"
                value={firstName}
                onChange={handleChange(updateFirstName)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                label={t('ADRESS')}
                type="text"
                className={classes.textField}
                margin="normal"
                value={adress}
                onChange={handleChange(updateAdress)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label={t('CITY')}
                className={classes.textField}
                type="text"
                autoComplete="current-password"
                margin="normal"
                value={city}
                onChange={handleChange(updateCity)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label={t('ZIP')}
                className={classes.textField}
                type="text"
                autoComplete="current-password"
                margin="normal"
                value={zip}
                onChange={handleChange(updateZip)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label={t('COUNTRY')}
                className={classes.textField}
                type="text"
                autoComplete="current-password"
                margin="normal"
                value={country}
                onChange={handleChange(updateCountry)}
              />
            </Grid>
            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              className={classes.btnCentered}
              color="primary"
            >
              {t('SUBMIT_BTN')}
            </Button>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginError: state.UserProfileForm.formError,
  translationsOverride: state.MenuBar.translationsOverride,
  adress: state.UserProfileForm.adress,
  city: state.UserProfileForm.city,
  zip: state.UserProfileForm.zip,
  country: state.UserProfileForm.country,
  name: state.UserProfileForm.name,
  firstName: state.UserProfileForm.firstName,
});

UserProfileFormContainer.defaultProps = {
  formError: false,
  adress: '',
  city: '',
  zip: '',
  country: '',
  name: '',
  firstName: '',
};

UserProfileFormContainer.propTypes = {
  classes: PropTypes.shape({
    error: PropTypes.string.isRequired,
    textField: PropTypes.string.isRequired,
    btnCentered: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  formError: PropTypes.bool,
  name: PropTypes.string,
  firstName: PropTypes.string,
  adress: PropTypes.string,
  city: PropTypes.string,
  zip: PropTypes.string,
  country: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  translate('UserProfileForm'),
)(UserProfileFormContainer);
