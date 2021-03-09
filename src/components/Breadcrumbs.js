import React, { useContext } from 'react';

import { Link } from '@reach/router';

import { ModuleContext } from 'contexts/ModuleContext';

export function Breadcrumbs()
{
  const { currentModule, updateCurrentModule } = useContext(ModuleContext);

  const onClick = route => updateCurrentModule(route);

  const breadcrumb = (route, label, key) =>
  {
    return (
      <li key={key} className="breadcrumb-item">
        <Link to={route} onClick={() => onClick(route)}>
          {label}
        </Link>
      </li>
    )
  };

  return (
      <ul className="breadcrumb p-0 mt-2">
        {breadcrumb('/', <><i className="fa fa-home mr-1"></i>Home</>)}
        {
          currentModule.route.split('/').slice(1).map((route, i) =>
            breadcrumb(currentModule.route, route, i))
        }
      </ul>
    
  );
}
