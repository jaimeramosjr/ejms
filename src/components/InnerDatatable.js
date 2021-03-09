import React, { useState } from 'react';

import './css/Datatable.css';

import DataTable from 'react-data-table-component';

// import { compareStrings } from 'helpers';
import { Events } from 'helpers/events';

/* Initialize events for the Datatable */
const DatatableEvents = new Events();

/* Controls for the Datatable */
export const DatatableControl =
{
  /* Clear the selected rows. */
  clearSelection: () => DatatableEvents.trigger('clear'),

  /* Setting the search filter. */
  setSearch: filter => DatatableEvents.trigger('search', filter),
}

/**
 * @typedef DatatableProps
 * @property {[]} fields
 * @property {[]} data
 * @property {string} filter
 * @property {function} onRowClicked
 * @property {function} onRowSelected
 * @property {boolean} clearSelected
 * @property {[]}
 */
/** @param {DatatableProps} */
export function InnerDatatable({ fields, data, onRowClicked, onRowSelected, objectKey ,onRowChecked })
{
  // columns = window.innerWidth < 1024? columns.slice(0, 3) : columns;
  const columns = fields
    .filter(({ hidden, noDisplay }) => !hidden && !noDisplay)
    .map(field =>
    ({
      name: field.label,
      selector: field.name,
      sortable: true,
      cell: row =>
      {
        const data = row[field.name];
        const cell =
          field.cell?
            field.cell(data) :
          Array.isArray(data)?
            data.join(', ') :
            data;
          
        return cell || data;
      }
    }));

  /* Centering first ID column */
  columns[0].center = true;

  let tableData = data;

  if (objectKey in data) {
    tableData = data[objectKey];
  }
  
  /* Handle filtering the data if filter is provided. */
  DatatableEvents.listen('search', filter =>
  {
    console.log('re-implement searching');
    // if(filter && filter.length !== 0)
    //   tableData = data.filter(item =>
    //   {
    //     const conditions = [];
    //     for(const { selector } of columns)
    //     {
    //       if(item[selector] === undefined)
    //         continue;
          
    //       conditions.push(compareStrings(item[selector], filter));
    //     }
        
    //     return conditions.some(condition => condition);
    //   });
  });

  /* state for clearing the selected rows. */
  const [ clearSelected, setClearSelected ] = useState();

  /* Handle clearing of the selected rows. */
  DatatableEvents.listen('clear', () => setClearSelected(!clearSelected))

  /* Expandable Row component */
  const Expand = ({ tableData }) =>
  {
    const expandFields =  <DataTable
      columns={columns}
      data={data}
      pagination
      noHeader
      striped
      paginationRowsPerPageOptions={[ 10, 20, 50, 100, 300 ]}
      selectableRows={columns[0].selector}
      clearSelectedRows={onRowChecked}
      pointerOnHover
      highlightOnHover
      defaultSortField={columns[0].selector}
      onRowClicked={data => onRowClicked(data)}
      onSelectedRowsChange={onRowSelected}
      selectableRowsComponent={checkbox}

    />

    return <div className="p-2 pl-3">{expandFields}</div>;
  };

  /* Checkbox component */
  const checkbox = React.forwardRef(({ onClick, ...rest }, ref) =>
  (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        ref={ref}
        {...rest}
      />
      <label className="custom-control-label" onClick={onClick} />
    </div>
  ));

  return (
    /**
      * Check https://github.com/jbetancur/react-data-table-component
      * for reference on the DataTable component.
      */
    <DataTable
      columns={columns}
      data={tableData}
      pagination
      noHeader
      striped
      expandableRows
      expandableRowsComponent={<Expand/>}
      paginationRowsPerPageOptions={[ 10, 20, 50, 100, 300 ]}
      selectableRows={columns[0].selector}
      clearSelectedRows={onRowChecked}
      pointerOnHover
      highlightOnHover
      defaultSortField={columns[0].selector}
      onRowClicked={data => onRowClicked(data)}
      onSelectedRowsChange={onRowSelected}
      selectableRowsComponent={checkbox}
    />
  );
}
