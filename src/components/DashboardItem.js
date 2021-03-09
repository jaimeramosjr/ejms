import React, { useContext } from 'react';

import './css/DashboardItem.css';

import { Link } from '@reach/router';

import { ModuleContext } from 'contexts/ModuleContext';

export function DashboardItem({ name, icon, route })
{
  const { updateCurrentModule } = useContext(ModuleContext);

  return (
   <div></div>
  );
}
