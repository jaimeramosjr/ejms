import React from 'react';

export function Alert({ level = 'info', message })
{
  let icon =
    level === 'success'?
      'check-circle' :
    level === 'warning'?
      'exclamation-triangle' :
    level === 'error'?
      'exclamation-circle' :
      'info-circle';

  return (
    <div className="d-flex align-items-center">
      <div className="mr-2">
        <i className={`fa fa-${icon} s-alert-icon mr-1`}></i>
      </div>
      <div>{message}</div>
    </div>
  );
}
