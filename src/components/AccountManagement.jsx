import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import connect from 'react-redux/es/connect/connect';
import { translate } from 'react-translate';
import AccountContainer from '../containers/AccountContainer';
import MenuBar from './MenuBar';


const styles = theme => ({
  userContainer: {
    'text-align': 'center',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: '100px',
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    margin: '15px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%',
    textAlign: 'center',
    height: '500px',
  },
  photoContainer: {
    width: '290px',
    height: '250px',
    position: 'relative',
  },
  photos: {
    width: 'auto',
    'max-width': '250px',
    'max-height': '250px',
    overflow: 'auto',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  photoTitle: {
    height: '28px',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    overflow: 'hidden',
  },
  photoDescription: {
    height: '75px',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
    'text-overflow': 'ellipsis',
    width: '300px',
    'word-wrap': 'break-word',
  },
  loginHorizontalCentering: {
    margin: 'auto',
    'max-width': '500px',
  },
  largeButton: {
    width: '142px',
  },
  rightButton: {
    'text-align': 'center',
    'margin-right': 'auto',
  },
  leftButton: {
    'text-align': 'center',
    'margin-left': 'auto',
  },
  container: {
    margin: '20px',
  },
  accountButton: {
    width: '150px',
  },
  rmLinkStyle: {
    'text-decoration': 'none',
    color: 'black',
  },
});

const AccountManagement = (props) => {
  const { classes } = props;
  const { history } = props;

  return (
    <div>
      <MenuBar history={history} />
      <Paper className={classes.paper}>
        <AccountContainer classes={classes} history={history} />
      </Paper>
    </div>
  );
};

const mapStateToProps = state => ({
  translationsOverride: state.MenuBar.translationsOverride,
});

AccountManagement.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'AccountManagement',
  }),
  connect(mapStateToProps),
  translate('AccountManagement'),
)(AccountManagement);
