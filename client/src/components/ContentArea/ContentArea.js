import React from 'react';
import PropTypes from 'prop-types';

const style = { 
  marginLeft: 156, 
  marginTop: 36,
  padding: 24, 
}

const ContentArea = props => (
  <div style={style}>
    {props.children}
  </div>
);

ContentArea.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentArea;
