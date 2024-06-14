import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, color, onClick, width, height, className }) => {
  return (
    <div
      className={`button-container-main ${color} ${className}`}
      onClick={onClick}
      style={{ width: width, height: height }}
    >
      <div
        className={`button-text ${
          color === 'white' ? 'black-text' : 'white-text'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['white', 'black', 'green']).isRequired,
  onClick: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
