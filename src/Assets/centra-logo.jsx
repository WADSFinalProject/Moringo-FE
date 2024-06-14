// centra-logo.svg
import * as React from 'react';
import PropTypes from 'prop-types';

function CentraLogo({ fill, stroke }) {
  return (
    <svg
      width='41'
      height='41'
      viewBox='0 0 41 41'
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M19.6994 37.194C16.2753 37.2044 12.9723 35.9274 10.4456 33.6165C7.91885 31.3055 6.35294 28.1294 6.05843 24.7179C5.76391 21.3064 6.7623 17.9089 8.85558 15.1991C10.9489 12.4893 13.9841 10.6651 17.3594 10.0885C28.4746 7.94348 31.3996 6.92947 35.2997 2.09338C37.2497 5.99345 39.1998 10.2445 39.1998 17.6937C39.1998 28.4188 29.8786 37.194 19.6994 37.194Z'
        stroke={stroke}
        strokeWidth='3.35048'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.14941 39.1439C2.14941 33.2938 5.75698 28.6918 12.0556 27.4437C16.7747 26.5077 21.6498 23.5437 23.5998 21.5936'
        stroke={stroke}
        strokeWidth='3.35048'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default CentraLogo;

CentraLogo.propTypes = {
  fill: PropTypes.oneOf(['white', 'black']).isRequired,
  stroke: PropTypes.oneOf(['white', 'black']).isRequired,
};
