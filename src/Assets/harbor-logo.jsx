// centra-logo.svg
import * as React from 'react';
import PropTypes from 'prop-types';

function HarborLogo({ fill, stroke }) {
  return (
    <svg
      width='47'
      height='38'
      viewBox='0 0 47 38'
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M38.5071 11.4017C38.289 10.8062 37.8936 10.2919 37.3742 9.92805C36.8547 9.56423 36.2362 9.36843 35.602 9.36705H32.3184C32.0259 9.36705 31.7763 9.1556 31.7282 8.86711L30.3492 0.593325C30.3011 0.304831 30.0515 0.0933838 29.7591 0.0933838H20.883C20.5133 0.0933838 20.2321 0.425361 20.2929 0.790045L21.6062 8.67039C21.667 9.03507 21.3858 9.36705 21.0161 9.36705H18.4079C18.1154 9.36705 17.8658 9.1556 17.8177 8.86711L16.4387 0.593325C16.3907 0.304831 16.1411 0.0933838 15.8486 0.0933838H6.97252C6.60281 0.0933838 6.32158 0.425361 6.38236 0.790045L7.69575 8.67039C7.75653 9.03507 7.47531 9.36705 7.10559 9.36705H4.05231C3.72188 9.36705 3.45401 9.63491 3.45401 9.96535V17.2696C3.45401 17.6 3.18615 17.8679 2.85571 17.8679H0.961095C0.630662 17.8679 0.362793 18.1358 0.362793 18.4662V36.5897C0.362793 36.9202 0.630661 37.188 0.961094 37.188H41.2219C41.493 37.188 41.7301 37.0059 41.8 36.744L45.8337 21.6322L46.5554 18.605C46.645 18.229 46.3599 17.8679 45.9734 17.8679H41.2775C41.0259 17.8679 40.8012 17.7105 40.7152 17.4741L38.5071 11.4017ZM27.1404 3.1846C27.4329 3.1846 27.6825 3.39605 27.7306 3.68454L28.5616 8.67038C28.6224 9.03507 28.3411 9.36705 27.9714 9.36705H25.3631C25.0706 9.36705 24.821 9.1556 24.773 8.8671L23.942 3.88126C23.8813 3.51658 24.1625 3.1846 24.5322 3.1846H27.1404ZM13.2299 3.1846C13.5224 3.1846 13.772 3.39605 13.8201 3.68454L14.6511 8.67038C14.7119 9.03507 14.4306 9.36705 14.0609 9.36705H11.4526C11.1601 9.36705 10.9105 9.1556 10.8625 8.8671L10.0315 3.88126C9.97076 3.51658 10.252 3.1846 10.6217 3.1846H13.2299ZM6.54523 13.0566C6.54523 12.7261 6.8131 12.4583 7.14353 12.4583H35.183C35.4346 12.4583 35.6593 12.6157 35.7452 12.8521L37.5691 17.8679H6.54523V13.0566ZM42.8422 20.9591L39.5325 33.6495C39.4638 33.913 39.2258 34.0968 38.9535 34.0968H4.05232C3.72188 34.0968 3.45401 33.8289 3.45401 33.4985V20.9591H42.8422Z'
        stroke={stroke}
      />
      <path
        d='M10.5669 26.3204C10.5669 27.174 11.2589 27.866 12.1125 27.866C12.9661 27.866 13.6581 27.174 13.6581 26.3204C13.6581 25.4668 12.9661 24.7748 12.1125 24.7748C11.2589 24.7748 10.5669 25.4668 10.5669 26.3204Z'
        stroke={stroke}
      />
      <path
        d='M16.7495 26.3204C16.7495 27.174 17.4415 27.866 18.2951 27.866C19.1487 27.866 19.8407 27.174 19.8407 26.3204C19.8407 25.4668 19.1487 24.7748 18.2951 24.7748C17.4415 24.7748 16.7495 25.4668 16.7495 26.3204Z'
        stroke={stroke}
      />
      <path
        d='M22.9316 26.3204C22.9316 27.174 23.6236 27.866 24.4773 27.866C25.3309 27.866 26.0229 27.174 26.0229 26.3204C26.0229 25.4668 25.3309 24.7748 24.4773 24.7748C23.6236 24.7748 22.9316 25.4668 22.9316 26.3204Z'
        stroke={stroke}
      />
      <path
        d='M29.1143 26.3204C29.1143 27.174 29.8063 27.866 30.6599 27.866C31.5135 27.866 32.2055 27.174 32.2055 26.3204C32.2055 25.4668 31.5135 24.7748 30.6599 24.7748C29.8063 24.7748 29.1143 25.4668 29.1143 26.3204Z'
        stroke={stroke}
      />
      <path
        d='M35.2969 26.3204C35.2969 27.174 35.9889 27.866 36.8425 27.866C37.6961 27.866 38.3881 27.174 38.3881 26.3204C38.3881 25.4668 37.6961 24.7748 36.8425 24.7748C35.9889 24.7748 35.2969 25.4668 35.2969 26.3204Z'
        stroke={stroke}
      />
    </svg>
  );
}

export default HarborLogo;

HarborLogo.propTypes = {
  fill: PropTypes.oneOf(['white', 'black']).isRequired,
  stroke: PropTypes.oneOf(['white', 'black']).isRequired,
};
