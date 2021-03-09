import React from 'react';

import './css/DatatableSearch.css';

export function DatatableSearch({ onSearch })
{
  return (
    <div className="d-flex">
      <input className="d-block form-control" placeholder="Search"/>
      <button className="btn btn-primary datatable-search-button"
        onClick={({ target }) => onSearch(target.value)}>
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
}
