import React from 'react';
import PropTypes from 'prop-types';

const style = { 
  paddingTop: '100px'
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
