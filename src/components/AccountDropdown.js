import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

import { logout } from 'helpers';

import defaultAvatar from 'assets/images/unknown.svg';

export function AccountDropdown()
{
  return (
    <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
      <Dropdown>
        <Dropdown.Toggle as="div">
          <img width="25" className="rounded-circle mr-2" src={defaultAvatar} alt="User" />
          <span className="d-none d-sm-inline-block">Account</span>
          <i className="fa fa-angle-down ml-2"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            // maps each dropdown item into it's own dropdown item component
            [
              {
                label: 'Change Password',
                icon: 'lock',
                url: '*url*',
                onClick: () => {},
              },
              {
                label: 'Change Profile',
                icon: 'user',
                url: '*url*',
                onClick: () => {},
              },
              {
                label: 'Change Photo',
                icon: 'file-image',
                url: '*url*',
                onClick: () => {},
              },
              {
                label: 'Logout',
                icon: 'power-off',
                url: '',
                onClick: logout,
              }
            ].map(({ label, url, icon, onClick }) =>
              <Dropdown.Item key={label} onClick={onClick}>
                <div href={url}>
                  <span className={`fa fa-${icon} mr-2`}></span>
                  {label}
                </div>
              </Dropdown.Item>)
          }
        </Dropdown.Menu>
      </Dropdown>
    </ul>
  );
}
