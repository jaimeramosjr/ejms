import React, { useContext } from 'react';

import { Link } from '@reach/router';
import { ExpandableNavItem } from './ExpandableNavItem';

import { ModuleContext } from 'contexts/ModuleContext';

import defaultAvatar from 'assets/images/unknown.svg';

export function Navigation({ modules })
{
  const { currentModule, updateCurrentModule } = useContext(ModuleContext);

  /* Toggling the active class of the current module's menu */
  const isActive = route => currentModule.route === route? 'active' : '';

  /* Callback for handling changing the current module */
  const onClick = route => updateCurrentModule(route);

  /* Function that returns the element for each menu */
  const menuItem = (label, icon) =>
    <>
      <i className={`menu-icon fa fa-${icon} fa-fw`}></i>
      {label}
    </>;

  return (
    <nav className="side-navbar">
      <div className="sidebar-header d-flex align-items-center">
        <div className="avatar">
          <img src={defaultAvatar} alt="" className="img-fluid rounded-circle img-thumbnail p-0"/>
        </div>
        <div className="title">
          <h1 className="h4">Admin</h1>
        </div>
      </div>
      
      <ul className="list-unstyled">
      {
        /* Mapping each item to an element */
        modules.map(({ name, icon, route, subModules }, i) =>
          /* Render a normal an expandable menu if there are subitems.
            Render a link to a route if there are none. */
          subModules?
            <ExpandableNavItem key={i} label={menuItem(name, icon)} route={route}>
              <ul className="list-unstyled">
              {
                subModules.map(({ name, icon, route }, i) =>
                  <li key={i}>
                    <Link className={isActive(route)}
                      to={route} onClick={() => onClick(route)}>
                      {menuItem(name, icon)}
                    </Link>
                    <b className="arrow"></b>
                  </li>
                )
              }
              </ul>
            </ExpandableNavItem> :
            <li key={i} className={isActive(route)}>
              <Link to={route} onClick={() => onClick(route)}>
                {menuItem(name, icon)}
              </Link>
            </li>
        )
      }
      </ul>
    </nav>
  );
}
