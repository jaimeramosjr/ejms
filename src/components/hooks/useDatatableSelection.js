import { useState } from 'react';

export function useDatatableSelection()
{
  /* Selectable Rows */
  const [ selectedRows, setSelectedRows ] = useState([]);
  const onRowSelected = state => setSelectedRows(state? state.selectedRows : []);

  return { selectedRows, setSelectedRows, onRowSelected };
}
