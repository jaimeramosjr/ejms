import React, { useState, useEffect } from 'react';

import './css/Module.css';

import { Datatable, DatatableControl } from 'components/Datatable';
import { CustomDatatable } from 'components/CustomDatatable';
import { useDatatableSelection } from 'components/hooks/useDatatableSelection';

import { Modal, ModalControl } from 'components/Modal';
import { AutoForm, AutoFormControl } from 'components/AutoForm';
import { Sidepanel, SidepanelControl } from 'components/Sidepanel';

import { DatatableSearch } from 'components/DatatableSearch';

import { apiService } from 'services/apiService';
import { apiCustomService } from 'services/apiCustomService';
import { alert } from 'helpers';
import { onRowSelected, ids } from 'components/CustomModule';
/**
 * @typedef Field
 * @property {string} name The name of the field.
 * @property {string} label The label for the field to be displayed in the UI.
 * @property {any} [default] The default value of the field.
 * @property {string} [type] The type of the field's input.
 * @property {string[]} [choices] Choices for select, checkboxes and radios.
 * @property {string[]} [richTextAreaOptions] Options for the Rich Text Area (TinyMCE).
 * @property {boolean} [hidden] If the field should be shown in the row's expandable area.
 * @property {boolean} [noDisplay] If the fiels should not be shown in the table.
 * @property {boolean} [noInput] If the field should not be in the form.
 * @property {boolean} [noAPI] If the field is not a field in the API (or database) as well.
 * @property {Function} [cell] A function for providing a custom cell for the field in the table.
 */

/**
 * @typedef ModuleProps
 * @property {string} name
 * @property {string} singularName
 * @property {FormSize} formSize
 * @property {Function} [customSidepanelContent]
 * @property {Field[]} fields
 * @property {string} api
 * @property {string} objectKey
 */

/** @param {ModuleProps} */
 
export function CustomScheduleModule(
{
  name,
  singularName,
  formSize,
  customSidepanelContent,
  fields,
  api,
  objectKey,
  schedulefields,
})
{

  const [ datafields, setDatafields ] = useState([]);
  
  /* State for the module's data */
  const [ data, setData ] = useState([]);

  /* States for the usage of the AutoForm component. */
  const [ record, setRecord ] = useState({});
  
  /* Selection of the rows of the table  */
  const { selectedRows, setSelectedRows } = useDatatableSelection();
  const { selectedCustomRows, setSelectedCustomRows } = useState({});

  /* Effect for getting the data from the API. */
  useEffect(() =>
  {
    async function getData()
    {
      
      const apiResponse = await apiService.get(api);
     
      console.log('useEffect', apiResponse);
      
      // if(!apiResponse.success)
      //   return alert.error(apiResponse.message || `Cannot get the ${name}. An error occurred.`);

      // for(const record of apiResponse.data)
      // {
      //   for(const { name, modifyData } of fields)
      //   {
      //     if(modifyData)
      //       record[name] = modifyData(record, apiResponse.data);
      //   }
      // }

      setData(apiResponse);
    }
    getData();
  }, [ api, name ]);

  /* Listen for Sidepanel toggling. */
  const onSidepanelToggle = isOpened =>
  {
    if(isOpened)
    {
      alert.closeAll();
      AutoFormControl.setErrors();
    }
  };

  /* Pressing the add button */
  const onAdd = () =>
  {
    
     console.log(onRowSelected);
     
    setRecord({}); /* Reset the record in the sidepanel. */
    setDatafields(fields);
    AutoFormControl.setTitle(`Add ${singularName}`);
    SidepanelControl.open();
  };

   const onAssign = () =>
  {

    //setRecord({}); /* Reset the record in the sidepanel. */
    AutoFormControl.setTitle(`Assign Schedule`);
  

    //setChoices(schedulefields);
    setDatafields(schedulefields);
    console.log(schedulefields);
    SidepanelControl.open();
  };

const onRowClicked = clickedRow =>
  {
    console.log('abc');
    AutoFormControl.setTitle(`Update ${singularName}`);

    for (const field of fields)
    {
      if (field.noDisplay) {
        delete clickedRow[field.name];
      }
    }
    //setChoices(schedulefields);
    setDatafields(fields);
    setRecord(clickedRow);

    if (clickedRow)
    {
      if (clickedRow.id !== record.id) {
        SidepanelControl.open();
      } else  {
        SidepanelControl.toggle();
      }
    }
  };
  /* Clicking a row in the datatable */

  
  /* Submitting the form to the API. */
  const schedulesubmit = async (record, id) => {




   
    console.log(selectedRows.length);
   return alert.success(`saved.`);


    for (const field of fields)
    {
      /* Set the default values for fields that have default values. */
      if (field.default !== undefined) {
        record[field.name] = field.default;
      }
      
      /* Remove the fields that are not to be sent in the API. */
      if (field.noAPI) {
        delete record[field.name];
      }
    }

    const newData = [ ...data ];
    if (!id)
    {


      const apiResponse = await apiService.post(`${api}`, record);
      console.log(apiResponse, 'apiResponse');

      if(!apiResponse.success)
      {
        AutoFormControl.setErrors(apiResponse.errors);
        return alert.error(apiResponse.message ||  `Cannot add ${singularName}. An error occurred.`);
      }

      newData.push(apiResponse.data);
     return alert.success(`${singularName} has been saved.`);
    }
    else
    {
      const recordIndex = data.findIndex(data => data.id === id);
      const apiResponse = await apiService.put(`${api}/${id}`, record);
      if(!apiResponse)
      {
        AutoFormControl.setErrors(apiResponse.errors);
        return alert.error(apiResponse.message || `Cannot update ${singularName}. An error occurred.`);
      }

     // newData[recordIndex] = apiResponse;
     return alert.success(`${singularName} has been updated.`);
    }
    
    setData(newData);
    SidepanelControl.close();
  };

  /* Clicking confirm on the delete modal and deleting the selected rows. */
  const onDelete = async () =>
  {
    ModalControl.close();
    DatatableControl.clearSelection();

    if(selectedRows.length > 1) {
      return alert.warning('Multiple deletes are not supported by the API yet.') //TODO: Implement in API.
    }
      
    const apiResponse = await apiService.delete(`${api}/delete`, selectedRows[0].id);
    if(!apiResponse.success) {
      return alert.error(apiResponse.message || `Cannot delete ${singularName}. An error occurred.`);
    }
      
    alert.success(`${selectedRows.length > 1?
      `${name} have` : `${singularName} has`} been deleted.`);

    const newData = data.filter(item => !selectedRows
      .some(({ id }) => item.id === id));

    setData(newData);
    setSelectedRows([]);
  };

  return (
    data.length !== 0 &&
    <>
      <div className="datatable-header d-flex align-items-center justify-content-between w-100">
        <div>
         
          <button className="btn btn-sm btn-primary btn-add mx-1"
            onClick={onAdd}>
            <i className="fa fa-plus mr-1"></i> Add
          </button>
        </div>
        <DatatableSearch className="search" onSearch={search => DatatableControl.setSearch(search)} />
      </div>
  
      <CustomDatatable
        fields={fields}
        data={data}
        
        onRowClicked={onRowClicked}
        objectKey={objectKey}
      /> 
     
      

      <Sidepanel widthPercentage={formSize} onToggle={onSidepanelToggle}>

          <AutoForm
            fields={datafields}
            data={record}
            onCancel={() => SidepanelControl.close()}
            onSubmit={schedulesubmit}
            
          />
        
      </Sidepanel>

      <Modal
        title={`Delete ${selectedRows.length > 1? name : singularName}`}
        body=
        {
          <>
            {'Are you sure you want to delete '}
            {
              selectedRows.length === (data? data.length : 0)?
                `all ${name}?` :
              selectedRows.length === 1?
                `this ${singularName}?` : `the following ${name}?`
            }
            {
              (selectedRows.length !== (data? data.length : 0) && selectedRows.length > 1) &&
              <ul>
                {selectedRows.map(({ id }, i) =>
                  <li key={i}>{singularName} {id}</li>)}
              </ul>
            }
          </>
        }
        confirmButtonText={<><i className="fa fa-trash mr-1"></i>Delete</>}
        confirmButtonClass="btn-warning"
        onConfirm={onDelete}
      />
    </>
  );
}

/* Default export for code-splitting (React.lazy import) */
export default CustomScheduleModule;
