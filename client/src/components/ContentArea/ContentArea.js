import React from 'react';
import PropTypes from 'prop-types';

const ContentArea = props => (
  <div style={{ marginLeft: 256 }}>
    {props.children}
  </div>
);

ContentArea.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentArea;
