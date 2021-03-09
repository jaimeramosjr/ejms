import React, { useState, useEffect } from 'react';

import './css/Sidepanel.css';

import OffCanvas from 'react-offcanvas/lib/OffCanvas';
import OffCanvasMenu from 'react-offcanvas/lib/OffCanvasMenu';

import { Events } from 'helpers/events';

/* Initialize events for the Sidepanel */
const SidepanelEvents = new Events();

/* Controls for the Sidepanel */
export const SidepanelControl =
{
  /* Open the Sidepanel */
  open: () => SidepanelEvents.trigger('toggle', true),

  /* Close the Sidepanel */
  close: () => SidepanelEvents.trigger('toggle', false),

  /* Toggle the Sidepanel */
  toggle: state => SidepanelEvents.trigger('toggle', state),
};

/* Standard sizes for the Sidepanel */
export const SidepanelSize =
{
  small: 30,
  medium: 50,
  large: 80,
};

/**
 * @typedef SidepanelProps
 * @property {number} widthPercentage
 * @property {function} onToggle
 */

/** @param {SidepanelProps} */
export function Sidepanel(
{
  children,
  widthPercentage = 30,
  onToggle = () => {},
})
{ 
  /* State for opening the sidepanel. */
  const [ opened, setOpened ] = useState(false);

  /* Get the width of the module area for the sidepanel width. */
  const [ sidepanelWidth, setSidepanelWidth ] = useState(350);
  useEffect(() =>
  {
    const moduleAreaWidth = document.querySelector('.module-content').clientWidth;
    setSidepanelWidth(moduleAreaWidth * (widthPercentage / 100));
  }, [ widthPercentage ]);

  /* Listen for events on toggling the sidepanel. */
  SidepanelEvents.listen('toggle', state => setOpened(state !== undefined? state : !opened));

  useEffect(() =>
  {
    onToggle(opened);
  }, [ opened, onToggle ]);

  return (
    /* Check https://github.com/vutran/react-offcanvas
      for reference on the OffCanvas components. */
    <OffCanvas
      width={sidepanelWidth}
      isMenuOpened={opened}
      position="right"
      effect="overlay"
    >
      <OffCanvasMenu className="sidepanel">
        <button type="button" className="close"
          onClick={() => setOpened(false)}>
          <span>×</span>
        </button>
        {children}
      </OffCanvasMenu>
    </OffCanvas>
  );
}
