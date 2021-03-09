import React from 'react';

import { AutoForm } from 'components/AutoForm';

export function _BasicFormDev()
{
  /** @type {import('components/Module').Field} */
  const fields =
  [
    {
      name: 'input',
      label: 'Input',
    },
    {
      name: 'number',
      label: 'Number',
      type: 'number',
    },
    {
      name: 'basictext',
      label: 'Normal Textarea',
      type: 'textarea',
    },
    {
      name: 'richtext',
      label: 'Rich Textarea',
      type: 'richtextarea',
      richTextAreaOptions:
      {
        height: 250,
        // plugins:
        // [
        //   'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        //   'searchreplace wordcount visualblocks visualchars code',
        //   'insertdatetime media nonbreaking save table contextmenu directionality',
        //   'emoticons template paste textcolor colorpicker textpattern'
        // ],
        toolbar: 
          `insertfile undo redo |
          bold italic underline |
          fontselect fontsizeselect formatselect |
          alignleft aligncenter alignright alignjustify |
          bullist numlist outdent indent |
          link faqs testimonials`,
        // image_advtab: true,
      }
    },
    {
      name: 'select',
      label: 'Select',
      type: 'select',
      choices:
      [
        'Select Option 1',
        'Select Option 2',
        'Select Option 3',
      ],
    },
    {
      name: 'multiselect',
      label: 'Multi-Select',
      type: 'multiselect',
      choices:
      [
        'Multi-Select Option 1',
        'Multi-Select Option 2',
        'Multi-Select Option 3',
      ],
    },
    {
      name: 'checkbox',
      label: 'Checkbox',
      type: 'checkbox',
    },
    {
      name: 'checkboxes',
      label: 'Multiple Checkbox',
      type: 'checkboxes',
      choices:
      [
        'Check 1',
        'Check 2',
        'Check 3',
      ]
    },
    {
      name: 'radio',
      label: 'Radio',
      type: 'radio',
      choices:
      [
        'Radio 1',
        'Radio 2',
        'Radio 3',
      ],
    },
  ];

  return (
    <div className="card _basic_form bg-white w-50 m-4">
      <AutoForm
        fields={fields}
        onSubmit={data => alert(JSON.stringify(data, null, 2))}
      />
    </div>
  );
}

export default _BasicFormDev;
