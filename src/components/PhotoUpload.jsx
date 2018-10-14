import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import connect from 'react-redux/es/connect/connect';
import { translate } from 'react-translate';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MenuBar from './MenuBar';

import {
  updateTitle,
  updateDescription,
  uploadPhoto,
  updateSelectedCategory,
} from '../actions/PhotoUpload';

const styles = () => ({
  loginHorizontalCentering: {
    margin: 'auto',
    'max-width': '500px',
  },
  userContainer: {
    'text-align': 'center',
  },
  inputFile: {
    display: 'none',
  },
});

class PhotoUpload extends PureComponent {
  componentDidMount() {
    const { categories } = this.props;
    const { dispatch } = this.props;

    if (categories.length > 0 && categories[0]) {
      dispatch(updateSelectedCategory(categories[0].id));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.selectedCategory === 0 && nextProps.categories.length > 0) {
      dispatch(updateSelectedCategory(nextProps.categories[0].id));
    }
  }

  render() {
    const { classes } = this.props;
    const { history } = this.props;
    const { isUploading } = this.props;
    const { selectedCategory } = this.props;
    const { title } = this.props;
    const { description } = this.props;
    const { categories } = this.props;
    const { dispatch } = this.props;
    const { t } = this.props;

    const handleChange = action => (event) => {
      dispatch(action(event.target.value));
    };

    const handleFile = () => {
      const titleInput = global.document.getElementById('upload-form-title');
      const descriptionInput = global.document.getElementById('upload-form-description');
      const fileInput = global.document.getElementById('contained-button-file');
      const form = global.document.querySelector('#upload-form');
      if (form.checkValidity()) {
        const uploadFormData = new global.FormData(form);
        uploadFormData.append('file', fileInput.files[0]);
        dispatch(uploadPhoto(selectedCategory, uploadFormData, (response) => {
          if (response.status === 201) {
            history.push('/account');
          }
        }));
      } else {
        if (titleInput.validity.valueMissing) {
          titleInput.setCustomValidity(t('MISSING_TITLE'));
          titleInput.reportValidity();
          titleInput.setCustomValidity('');
          return;
        }

        if (descriptionInput.validity.valueMissing) {
          descriptionInput.setCustomValidity(t('MISSING_DESCRIPTION'));
          descriptionInput.reportValidity();
          descriptionInput.setCustomValidity('');
        }
      }
    };

    return (
      <div>
        <MenuBar history={history} />
        <div className={classes.userContainer}>
          <h3>{t('UPLOAD_FORM_TITLE')}</h3>
          <form
            id="upload-form"
            className={classes.container}
          >
            <Grid item xs={12}>
              <TextField
                id="filled-select-categories"
                select
                label={t('CATEGORY_SELECT')}
                className={classes.textField}
                value={selectedCategory}
                onChange={handleChange(updateSelectedCategory)}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText={t('CATEGORY_SELECT_HELPER_TEXT')}
                margin="normal"
                variant="filled"
              >
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {t(category.name)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="upload-form-title"
                required
                label={t('TITLE')}
                type="text"
                className={classes.textField}
                margin="normal"
                value={title}
                onChange={handleChange(updateTitle)}
                name="title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="upload-form-description"
                label={t('DESCRIPTION')}
                className={classes.textField}
                type="text"
                multiline
                rows="4"
                margin="normal"
                value={description}
                onChange={handleChange(updateDescription)}
                name="description"
              />
            </Grid>
            <br />
            <br />
            <Grid item xs={12}>
              <label htmlFor="contained-button-file">
                <input
                  required
                  accept="image/jpeg,image/png"
                  className={classes.inputFile}
                  id="contained-button-file"
                  type="file"
                  onChange={handleFile}
                />
                <Button variant="contained" color="primary" component="span" className={classes.button} disabled={isUploading}>
                  {t('UPLOAD_BTN')}
                </Button>
              </label>
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isUploading: state.PhotoUpload.isUploading,
  categories: state.MenuBar.categories,
  title: state.PhotoUpload.title,
  description: state.PhotoUpload.description,
  selectedCategory: state.PhotoUpload.selectedCategory,
});

PhotoUpload.defaultProps = {
  isUploading: false,
  categories: [],
  title: '',
  description: '',
  selectedCategory: 0,
};

PhotoUpload.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  isUploading: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()),
  title: PropTypes.string,
  description: PropTypes.string,
  selectedCategory: PropTypes.number,
  t: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'PhotoUpload',
  }),
  connect(mapStateToProps),
  translate('UploadForm'),
)(PhotoUpload);
