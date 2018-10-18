import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import connect from 'react-redux/es/connect/connect';
import { translate } from 'react-translate';
import { fetchStats } from '../actions/PlatformStatistics';

class PlatformStatistics extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchStats());
  }

  render() {
    const { stats } = this.props;
    const { t } = this.props;


    return (
      <div>
        <h2>{t('PLATFORM_STATISTICS')}</h2>
        <div>
          {stats.map(categoryStat => (
            <p key={categoryStat.id}>
              {t('CATEGORY_TOTAL_PHOTOS', { name: t(categoryStat.name), total: categoryStat.total_photos })}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.AccountManagement.isFetching,
  stats: state.PlatformStatistics.stats,
  translationsOverride: state.MenuBar.translationsOverride,
});

PlatformStatistics.defaultProps = {
  stats: [],
};

PlatformStatistics.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    total_photos: PropTypes.number.isRequired,
  })),
  dispatch: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  translate('Home'),
)(PlatformStatistics);
