import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { translate } from 'react-translate';
import { toggleDrawer } from '../actions/MenuBar';

const HomeContainer = (props) => {
  const { classes, t } = props;

  const setDrawerOpened = open => () => {
    props.dispatch(toggleDrawer(open));
  };

  return (
    <Grid className={classes.loginHorizontalCentering} item xs={12} sm={6} md={6}>
      <Grid container spacing={24}>
        <Grid className={classes.buttonCentered} item md={4} sm={4} xs={12}>
          <Button onClick={setDrawerOpened(true)} className={classes.largeButton} type="submit" variant="contained" color="primary">{t('BROWSE_PHOTOS')}</Button>
        </Grid>
        <Grid className={classes.buttonCentered} item md={4} sm={4} xs={12}>
          <Button component={Link} to="/account" className={classes.largeButton} type="submit" variant="contained" color="primary">{t('MANAGE_ACCOUNT')}</Button>
        </Grid>
        <Grid className={classes.buttonCentered} item md={4} sm={4} xs={12}>
          <Button component={Link} to="/upload" className={classes.largeButton} type="submit" variant="contained" color="primary">{t('UPLOAD_PHOTOS')}</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  translationsOverride: state.MenuBar.translationsOverride,
});

HomeContainer.propTypes = {
  classes: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  translate('HomeContainer'),
)(HomeContainer);
