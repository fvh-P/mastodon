import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';
import FoldButton from '../../../components/fold_button';
import Foldable from '../../../components/foldable';

const messages = defineMessages({
  toggle_visible: { id: 'media_gallery.toggle_visible', defaultMessage: 'Toggle visibility' },
});

@injectIntl
export default class Announcements extends React.PureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    announcements: ImmutablePropTypes.list.isRequired,
  };

  state = {
    bodyHeight: null,
  };

  componentDidMount () {
    const doc = document.getElementsByClassName('announcements');
    this.setState({
      bodyHeight: doc ? doc[0].clientHeight - 34 : null,
    });
  }

  render () {
    const { intl, visible, onToggle, announcements } = this.props;

    const body = () => {
      return (
        announcements.map((announcement, idx) => (
          <li key={idx}>
            <div className='announcements__body'>
              <p dangerouslySetInnerHTML={{ __html: announcement.get('body') }} />
              <div className='links'>
                {announcement.get('links').map((link, i) => {
                  if (link.get('url').indexOf('/') === 0) {
                    return (
                      <Link to={link.get('url')} key={i}>{link.get('text')}</Link>
                    );
                  } else {
                    return (
                      <a href={link.get('url')} target='_blank' key={i}>{link.get('text')}</a>
                    );
                  }
                })}
              </div>
            </div>
          </li>
        ))
      );
    };

    return (
      <div className='compose__extra'>
        <div className='compose__extra__header'>
          <i className='fa fa-bell' />
          <FormattedMessage id='announcement.title' defaultMessage='information' />
          <div className='compose__extra__header__fold__icon'>
            <FoldButton title={intl.formatMessage(messages.toggle_visible)} icon='caret-up' onClick={onToggle} size={20} animate active={visible} />
          </div>
        </div>
        <Foldable isVisible={visible} fullHeight={this.state.bodyHeight} minHeight={0} >
          <ul className='announcements'>
            {body}
          </ul>
        </Foldable>
      </div>
    );
  }

}
