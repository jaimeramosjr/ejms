import React from 'react';

import 'tinymce';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/themes/silver';
// TODO-tinymce: import necessary plugins but try to import dynamically (only import used)
import 'tinymce/plugins/wordcount';

import { Editor } from '@tinymce/tinymce-react';

const content_css = `${process.env.PUBLIC_URL}/tinymce/content_css/content.min.css`;
const defaultInitOptions =
{
  content_css,
  menubar: false,
  statusbar: false,
};

export function RichTextArea(props)
{
  return (
    <div name={props.name}>
      <Editor
        textareaName={props.name}
        id={props.id}
        init={
          {
            content_css,
            ...(props.init? props.init : defaultInitOptions)
          }
        }
      />
    </div>
  );
}
