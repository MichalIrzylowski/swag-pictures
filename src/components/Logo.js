import React from 'react';

const Logo = ({logo, title}) => (
  <div className='Logo-card'>
    {logo}
    <h5>{title}</h5>
  </div>
)

export default Logo;
