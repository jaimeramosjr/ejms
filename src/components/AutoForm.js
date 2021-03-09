import React, { useRef, useEffect, useState } from 'react';

import DatePicker from 'react-date-picker';
import DateTimePicker from 'react-datetime-picker';
import { RichTextArea } from 'components/RichTextArea';
import Select from 'react-select';
import tinymce from 'tinymce';

import { Events } from 'helpers/events';

/* Initialize the events for the AutoForm */
const AutoFormEvents = new Events();

/* Controls for the AutoForm */
export const AutoFormControl =
{
  /* Set the AutoForm title */
  setTitle: title => AutoFormEvents.trigger('title', title),

  /* Set errors to the AutoForm */
  setErrors: errors => AutoFormEvents.trigger('errors', errors),

  /* Clear errors */
  clearErrors: () => AutoFormEvents.trigger('errors'),
}

export function AutoForm({
  fields = [],
  data = {},
  title: initialTitle,
  onSubmit = () => {},
  onCancel = () => {},
  onRowSelected,
}) {
  if (fields.some(({ type }) => type === 'multiselect')) {
    console.warn('Please note that the multi-select element may have some issues with updating its selected value/s.');
  }
    
  /* State for the form errors. */
  const [ errors, setErrors ] = useState();

  /* State for the title. */
  const [ title, setTitle ] = useState(initialTitle);
  
  /* State for datepicker */
  const [ dateValue, dateOnChange ] = useState(new Date());

  /* Removes fields that shouldn't be in the form (has `noInput` set) */
  const inputs = fields.filter(({ noInput }) => !noInput); 

  /** @type {{ current: HTMLFormElement }} */
  const formRef = useRef();

  /* Check when the title is set. */
  AutoFormEvents.listen('title', newTitle => setTitle(newTitle));

  /* Check when errors are set. */
  AutoFormEvents.listen('errors', errors => setErrors(errors));

  /* Callback for getting all the form data */
  const submit = () =>
  {
    const formData = !data? {} : data;

    for(const { name, type } of inputs)
    {
      const input = formRef.current[name];

      if(type === 'richtextarea')
        formData[name] = tinymce.get(name).getContent();
      else if(type === 'multiselect')
        formData[name] = input.nodeName === 'INPUT'?
          (input.value !== ''? [ input.value ] : [] ) :
          Array.from(input).map(({ value }) => value);
      else if(type === 'checkbox')
        formData[name] = input.checked;
      else if(type === 'checkboxes')
        formData[name] = Array.from(input).reduce((checked, choice) =>
          checked.concat(choice.checked? choice.value : []), []);
      else
        formData[name] = input.value;
    }

    onSubmit(formData, data? data.id : null);
  };

  /* Handling changing the input values based on provided data. */
  useEffect(() =>
  {
    // setValues(data);

    for(const { name, type } of inputs)
    {
      const input = formRef.current[name];
      const value = data[name];
      if(!value)
      {
        if(type === 'richtextarea')
          tinymce.get(name).resetContent();
        else if(type === 'checkbox')
          input.checked = false;
        else if(type === 'checkboxes' || type === 'radio')
        {
          for(const checkbox of input)
            checkbox.checked = false;
        }
        else
          input.value = '';
        continue;
      }

      input.value = value;
    }
  }, [ data, inputs, formRef ]);

  return (
    <div className="d-flex flex-column h-100">
      {
        title &&
        <div className="modal-header">
          <h5 className="modal-title" id="modalLabel">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </h5>
          {/* <button type="button" className="close" onClick={onCancel}>
            <span>×</span>
          </button> */}
        </div>
      }

      <form className="flex-fill overflow-auto px-4 py-3" ref={formRef}>
        <div className="row">
        {
          inputs.map(
            /** @param {import('components/Module').Field} input */
            input =>

              <div
                className={`form-group ${input.colClass}`}
                key={input.name}>
                <small className="text-violet">{input.label}</small>
                {
                  /* Textarea */
                  input.type === 'textarea'?
                    <textarea name={input.name} className="form-control" rows={3}/> :

                  /* Rich Textarea */
                  input.type === 'richtextarea' ||
                  input.type === 'fullrichtextarea'?

                    <RichTextArea
                      name={input.name}
                      key={input.name}
                      id={input.name}
                      init={input.richTextAreaOptions}
                    /> :
                 
                  /* Select */
                  input.type === 'select' ?
                    <Select
                      name={input.name}
                      options={input.choices}
                      className="form-control"
                    />
                    :
                  
                  /* Multi-Select */
                  input.type === 'multiselect'?
                    <Select
                      defaultValue={data[input.name]?
                        data[input.name]
                          .filter(item => input.choices.includes(item))
                          .map(item => ({ value: item, label: item })) :
                        null}
                      name={input.name}
                      theme={theme =>
                      ({
                        ...theme,
                        borderRadius: 0,
                        colors:
                        {
                          ...theme.colors,
                          primary: window
                            .getComputedStyle(document.documentElement)
                            .getPropertyValue('--accent'),
                        }
                      })}
                      isMulti
                      closeMenuOnSelect={false}
                      options={input.choices.map(choice =>
                      ({
                        value: choice,
                        label: choice,
                      }))}
                    /> :

                  /* Checkbox */
                  input.type === 'checkbox'?
                    <div className="d-flex align-items-center">
                      <input className="mr-1" type="checkbox" name={input.name}/>
                      {input.label}
                    </div> :

                  /* Multiple Checkbox */
                  input.type === 'checkboxes'?
                    <div>
                    {
                      input.choices.map(choice =>
                      <div key={choice} className="d-flex align-items-center">
                        <input className="mr-1" type="checkbox"
                          name={input.name} value={choice}/>
                        {choice}
                      </div>)
                    }
                    </div> :

                  /* Radio Buttons */
                  input.type === 'radio'?
                    <div>
                    {
                      input.choices.map(choice =>
                        <div key={choice}  className="pt-4 pb-4 d-flex  align-items-center" disabled={choice.status =="open" ? false: true}>
                          <input className="mr-1 mb-2"
                            type="radio" name={input.name} value={choice.value} disabled={choice.status =="open" ? false: true}/>
                          {choice.label}    <span className="ml-4 btn  btn-success" >{choice.status}</span>
                        </div>
                      )
                    }
                    </div> :

                    input.type === 'datepicker'?
                      <DatePicker
                        name={input.name}
                        onChange={dateOnChange}
                        value={dateValue}
                        className="form-control"
                      /> : 

                    input.type === 'datetimepicker'?
                      <DateTimePicker
                        name={input.name}
                        onChange={dateOnChange}
                        value={dateValue}
                        className="form-control"
                      /> :

                    <input name={input.name} className="form-control"
                      type={input.type? input.type : 'text'}/>
                }

                <div className="text-danger mt-1">{errors? errors[input.name] : ''}</div>
              </div>
          )
        }
        </div>
      </form>

      <div className="modal-footer">
        <button className="btn btn-sm btn-default mx-1"
          type="button" onClick={onCancel}>
          <i className="fa fa-times mr-1"></i> Cancel
        </button>
        <button className="btn btn-sm btn-success mx-1"
          type="button" onClick={submit}>
          <i className="fa fa-save mr-1"></i> Save
        </button>
      </div>

    </div>
  );
}
