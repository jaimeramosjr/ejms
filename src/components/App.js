import React, { useState, Suspense } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './css/App.css';

import { Router } from '@reach/router';

import Alerts from 'react-s-alert';

import { Header } from './Header';
import { Navigation } from './Navigation';

/* Main Content Components */
import { Title } from './Title'
import { Footer } from './Footer';
import { Login } from './Login';

/* Module Context */
import { ModuleContext } from 'contexts/ModuleContext';

/* Module Config */
import { getPermittedModules } from 'modules/config';

/* Get Current Module Helper */
import { getLogin } from 'helpers';

export function App()
{
  const modules = getPermittedModules();

  /* State for checking login. */
  const [ isLoggedIn, setIsLoggedIn ] = useState(getLogin());

  /* State for the current module */
  const [ currentModule, setCurrentModule ] = useState(getCurrentModule(modules));
  if(!currentModule)
    return window.location.href = '/';

  /* Function to updpate the current module based on a given route. */
  const updateCurrentModule = route =>
  {
    for(const _module of modules)
    {
      if(_module.subModules)
      {
        for(const subModule of _module.subModules)
        {
          if(subModule.route === route)
          {
            setCurrentModule(subModule);
            break;
          }
        }
      }

      if(_module.route === route)
      {
        setCurrentModule(_module);
        break;
      }
    }
  }

  return (
    !isLoggedIn?
      <Login setIsLoggedIn={setIsLoggedIn}/> :

      <Suspense fallback={<div></div>}>
        <div className="app page">
          <ModuleContext.Provider value={{ currentModule, updateCurrentModule }}>
            <Header/>
            <div className="page-content d-flex align-items-stretch">
              <Navigation modules={modules}/>
              <div className="content-inner">
                <Title/>
                <Suspense fallback={<div><Spinner animation="border" /></div>}>
                  {/**
                    * Check https://reach.tech/router
                    * for reference on the Router component.
                    */}
                    <div className="">
                      <Router className="module-content">
                      {
                        /*
                          Go through each module and submodule and render its component
                          if it has. If it doesn't have its own component,
                          render a base template Module component.
                          (This behavior might change later on)
                        */
                        modules.map(({ component, subModules }, i) =>
                          !subModules?
                            component : subModules.map(({ component }) => component)
                        )
                      }
                      </Router>
                    </div>
                  <Footer className="footer"/>
                </Suspense>
              </div>
            </div>
            <Alerts
              stack={{ limit: 5 }}
              position="bottom-right"
              effect="scale"
              timeout={3000}
            />
          </ModuleContext.Provider>
        </div>
      </Suspense>
  );
}

/* Function to get the current module based on the current route in window.location.pathname. */
function getCurrentModule(modules)
{
  for(const _module of modules)
  {
    if(_module.subModules)
    {
      for(const subModule of _module.subModules)
      {
        if(subModule.route === window.location.pathname)
          return subModule;
      }
    }

    if(_module.route === window.location.pathname)
      return _module;
  }
}
