import React, { useContext } from 'react';

import { Breadcrumbs } from './Breadcrumbs';

import { ModuleContext } from 'contexts/ModuleContext';

export function Title()
{
  const { currentModule } = useContext(ModuleContext);

  return (
    <div className="page-header-container">
      <header className="page-header">
        <div className="container-fluid justify-content-between">
          <h2 className="no-margin-bottom">
            {currentModule.name}
          </h2>
          <Breadcrumbs/>
        </div>
      </header>
    </div>
  );
}
