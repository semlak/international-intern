import React from 'react';
import PropTypes from 'prop-types';

const ContentArea = props => (
  <div>
    {props.children}
  </div>
);

ContentArea.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentArea;
