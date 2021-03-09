import React, { useState } from 'react';

import './css/Datatable.css';

import DataTable from 'react-data-table-component';
import { AutoForm, AutoFormControl } from 'components/AutoForm';
import { Sidepanel, SidepanelControl } from 'components/Sidepanel';
// import { compareStrings } from 'helpers';
import { Events } from 'helpers/events';
import { alert } from 'helpers';
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
export function ImportDatatable({ fields, data, onRowClicked, onRowSelected, objectKey ,onRowChecked ,customerfields,productfields})
{
 const [ record, setRecord ] = useState({});
 const  dataType = "";
  const onCustomerClick = () =>
  {
    
    //setRecord({}); /* Reset the record in the sidepanel. */
    AutoFormControl.setTitle(`Update Customer`);
     const  dataType = "customer";

  console.log(dataType);
    SidepanelControl.open();
  };
  const onProductClick = () =>
  {
    
    //setRecord({}); /* Reset the record in the sidepanel. */
    AutoFormControl.setTitle(`Update Product  `);
     const  dataType = "product";

  console.log(dataType);
    SidepanelControl.open();
  };

 const onSidepanelToggle = isOpened =>
  {
    if(isOpened)
    {
      alert.closeAll();
      AutoFormControl.setErrors();
    }
  };
   const submit = async (record, id) => {}


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
   columns[5] = 
  {

    name: 'Product Name',
    sortable: true,
    cell: row => 

    

        <div> <a type="button" className=" mx-1"
            onClick={onProductClick}>
            { row.product_code ? row.product_code  : '---' }
          </a> </div>
    
  }

  columns[2] = 
  {

    name: 'Customer Name',
    sortable: true,
    cell: row => 

    

        <div> <a type="button" className=" mx-1"
            onClick={onCustomerClick}>
            { row.customer_code ? row.customer_code  : '---' }
          </a> </div>
    
  }

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
  const Expand = ({ data }) =>
  {
    const expandFields = fields
      .filter(({ hidden }) => hidden)
      .map(({ name, label }, i) =>
        <div key={i} className="expand-item py-2">
          <span className="font-weight-bold mr-4">{label}</span>
          <span>{data[name]}</span>
        </div>)

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
      <div>
    <DataTable
      columns={columns}
      data={tableData}
      pagination
      noHeader
      striped
      expandableRows
      expandableRowsComponent={<Expand/>}
      paginationRowsPerPageOptions={[ 10, 20, 50, 100, 300 ]}
      // selectableRows={columns[0].selector}
      clearSelectedRows={onRowChecked}
      pointerOnHover
      highlightOnHover
      defaultSortField={columns[0].selector}
      onRowClicked={data => onRowClicked(data)}
      onSelectedRowsChange={onRowSelected}
      selectableRowsComponent={checkbox}
    />
    {dataType}
     <Sidepanel widthPercentage="40" onToggle={onSidepanelToggle}>
        {
     dataType == "customer" ? 
          <AutoForm
            fields={customerfields}
            data={record}
            onCancel={() => SidepanelControl.close()}
            onSubmit={submit}
          />
          :
            <AutoForm
            fields={productfields}
            data={record}
            onCancel={() => SidepanelControl.close()}
            onSubmit={submit}
          />

        }
      </Sidepanel>
      </div>
  );
}
