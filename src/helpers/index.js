import React from 'react';
import Alerts from 'react-s-alert';
import { Alert }from 'components/Alert';

/**
 * Lowercases and trims then compares the string parameters.
 * 
 * @param {string} a The first string.
 * @param {string} b The second string.
 * @returns {boolean} `true` if the first simplified string has a match in
 *  the second simplified string.
 */
export function compareStrings(a, b)
{
  a = a.trim().toLowerCase();
  b = b.trim().toLowerCase();
  return a.includes(b);
}

/**
 * Alert helper functions (to include an icon before the alert messages).
 * 
 */
export const alert =
{
  /** @param {string} message */
  info: message => Alerts.info(<Alert level="info" message={message}/>),
  
  /** @param {string} message */
  success: message => Alerts.success(<Alert level="success" message={message}/>),

  /** @param {string} message */
  warning: message => Alerts.warning(<Alert level="warning" message={message}/>),

  /** @param {string} message */
  error: message => Alerts.error(<Alert level="error" message={message}/>),

  closeAll: () => Alerts.closeAll(),
}

/**
 * Gets the authentication token from local storage
 * 
 */
export function getLogin()
{
  return localStorage.getItem('bG9naW4=');
}

/**
 * Function for logging out
 * 
 */
export function logout()
{
  localStorage.removeItem('bG9naW4=');
  window.location.href = '/';
}
