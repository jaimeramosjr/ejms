import React, { useState, useEffect } from 'react';

import './css/ExpandableNavItem.css';

import Collapse from 'react-bootstrap/Collapse';

export function ExpandableNavItem({ label, children, route })
{
  const [ opened, setOpened ] = useState();

  useEffect(() =>
  {
    setOpened(route === `/${window.location.pathname.split('/')[1]}`);
  }, [ route, window.location.pathname ]);

  return (
    <li className="sidebar-item">
      {/* eslint-disable-next-line */}
        <a onClick={() => setOpened(!opened)}>
          {label}
          <i className={'sidebar-item-arrow float-right fa fa-'
            + (opened? 'chevron-down' : 'chevron-left')}></i>
        </a>

      {/**
        * Check https://react-bootstrap.netlify.com/utilities/transitions/
        * for reference on the Collapse component.
        */} 
      <Collapse in={opened}>
        {children}
      </Collapse>
    </li>
  );
}
