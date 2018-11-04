import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import compose from 'recompose/compose';
import connect from 'react-redux/es/connect/connect';
import { translate } from 'react-translate';
import PhotoUploadFormContainer from '../containers/PhotoUploadFormContainer';
import MenuBar from './MenuBar';

const styles = () => ({
  loginHorizontalCentering: {
    margin: 'auto',
    'max-width': '500px',
  },
  paper: {
    marginTop: '100px',
    padding: '10px',
    margin: '15px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%',
    textAlign: 'center',
    height: '500px',
  },
  userContainer: {
    'text-align': 'center',
  },
  inputFile: {
    display: 'none',
  },
  menuProps: {
    display: 'block',
  },
});

const PhotoUpload = (props) => {
  const { classes } = props;
  const { history } = props;

  return (
    <div>
      <MenuBar history={history} />
      <Paper className={classes.paper}>
        <PhotoUploadFormContainer classes={classes} history={history} />
      </Paper>
    </div>
  );
};

const mapStateToProps = state => ({
  isUploading: state.PhotoUpload.isUploading,
  categories: state.MenuBar.categories,
  title: state.PhotoUpload.title,
  description: state.PhotoUpload.description,
  selectedCategory: state.PhotoUpload.selectedCategory,
});

PhotoUpload.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'PhotoUpload',
  }),
  connect(mapStateToProps),
  translate('UploadForm'),
)(PhotoUpload);
