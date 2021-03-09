import React, { useState, useEffect } from 'react';

import { apiService } from 'services/apiService';

export function _APITest()
{
  const [ response, setResponse ] = useState();

  const requestAPI = async () =>
  {
    const apiResponse = await apiService.get('/users/users');
    if(!apiResponse)
      return setResponse('An error occurred.');

    setResponse(JSON.stringify(apiResponse, null, 2));
  }

  useEffect(() =>
  {
    requestAPI();
  }, [ setResponse ]);

  return (
    <div className="card _basic_form bg-white m-4 p-4">
      <pre>
        {response}
      </pre>
    </div>
  );
}

export default _APITest;
