import React from 'react';
import PropTypes from 'prop-types';
import Motion from '../features/ui/util/optional_motion';
import spring from 'react-motion/lib/spring';

const Foldable = ({ fullHeight, minHeight, isVisible, children }) => {
  const defaultHeight = () => {
    if (isVisible && fullHeight) {
      return fullHeight;
    }
    else if (isVisible) {
      return 'auto';
    }

    return minHeight;
  };

  return (
    <Motion defaultStyle={{ height: defaultHeight() }} style={{ height: spring(defaultHeight()) }}>
      {({ height }) =>
        (<div style={{ height: `${isVisible && !fullHeight ? 'auto' : `${height}px`}`, overflow: 'hidden' }}>
          {children}
        </div>)
      }
    </Motion>
  );
};

Foldable.propTypes = {
  fullHeight: PropTypes.number.isRequired,
  minHeight: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Foldable;
