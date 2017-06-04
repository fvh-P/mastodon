import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import ColumnCollapsable from '../../../components/column_collapsable';
import SettingToggle from '../../notifications/components/setting_toggle';
import SettingText from './setting_text';

const messages = defineMessages({
  filter_regex: { id: 'community.column_settings.filter_regex', defaultMessage: 'Filter out by regular expressions' },
  settings: { id: 'community.settings', defaultMessage: 'Column settings' },
});

class ColumnSettings extends React.PureComponent {

  static propTypes = {
    settings: ImmutablePropTypes.map.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  render () {
    const { settings, onChange, onSave, intl } = this.props;

    return (
      <ColumnCollapsable icon='sliders' title={intl.formatMessage(messages.settings)} fullHeight={100} onCollapse={onSave}>
        <div className='column-settings__outer'>
          <span className='column-settings__section'><FormattedMessage id='community.column_settings.advanced' defaultMessage='Advanced' /></span>

          <div className='column-settings__row'>
            <SettingText settings={settings} settingKey={['regex', 'body']} onChange={onChange} label={intl.formatMessage(messages.filter_regex)} />
          </div>
        </div>
      </ColumnCollapsable>
    );
  }

}

export default injectIntl(ColumnSettings);
