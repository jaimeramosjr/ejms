import React from 'react';

const Orders = React.lazy(() => import('modules/Orders'));
const _AutoFormDev = React.lazy(() => import('modules/_AutoFormDev'));
const _APITest = React.lazy(() => import('modules/_APITest'));

/**
 * @typedef Module
 * @property {Module[]} [permission]
 * @property {string} route
 * @property {string} name
 * @property {string} icon
 * @property {string} [path]
 * @property {import('react').Component} [component]
 * @property {Module[]} [subModules]
 */

/* List all module definitions */
/** @type {Module[]} */
const modules = 
[
 {
        route: '/orders',
        name: 'Orders',
        icon: 'shopping-cart',
        component: <Orders path="/orders" key="orders"/>
      },
];

/* Filter modules by permissions. */
export function getPermittedModules()
{
  const permissions = JSON.parse(localStorage.getItem('permissions')) || [ '/' ];
  const permittedModules = [];
  for(const _module of modules)
  {
     permittedModules.push(_module);
    continue;

    // if(permissions.includes(_module.route))
    // {
    //   if(!_module.subModules)
    //   {
    //     permittedModules.push(_module);
    //     continue;
    //   }
    // }
  
    if(_module.subModules)
    {
      const permittedSubModules = [];
      for(const subModule of _module.subModules)
      {
        if(permissions.includes(subModule.route))
          permittedSubModules.push(subModule);
      }
        
      if(permittedSubModules.length !== 0)
      {
        _module.subModules = permittedSubModules;
        permittedModules.push(_module);
      }
    }
  }

  return permittedModules;
}
