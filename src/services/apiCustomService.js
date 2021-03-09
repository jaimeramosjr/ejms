import { getLogin, logout } from 'helpers';

// TODO: CHANGE THIS
const api = route => `https://ejms.local${route}`;

class APICUSTOMService
{
  async login(identifier, password)
  {
    return fetch(api('/auth/local'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier, password })
    }).then(jsonify)
      .then(response => {
        const { jwt } = response;

        if (jwt) {
          localStorage.setItem('bG9naW4=', jwt);    
        }
  
        return response;
    }).catch(() => {
      return ({ success: false });
    });
  }

  request(route, method, options = {})
  {
    const login = getLogin();
    if(!login)
      return logout();

    const data = [options.body]

    console.log(data.deliveryId)
  

     return ({ success: true });

    // return fetch(api(route),
    // {
    //   method,
    //   headers:
    //   {
    //     Authorization: `Bearer ${login}`,
    //     ...(options.body? { 'Content-Type': 'application/json' }: {})
    //   },
    //   ...options
    // })
    //   .then(response =>
    //   {
    //     if(response.status === 401)
    //       return logout();

    //     return jsonify(response);
    //   })
    //   .catch(error =>
    //   {
    //     console.error(error);
    //     return ({ success: false });
    //   });
  }

  get(route)
  {
    return this.request(route, 'GET');
  }

  post(route, data)
  {
    return this.request(route, 'POST', { body: bodify(data) });
  }

  patch(route, data)
  {
    return this.request(route, 'PATCH', { body: bodify(data) });
  }

  put(route, data)
  {
    return this.request(route, 'PUT', { body: bodify(data) });
  }

  delete(route, id)
  {
    return this.request(`${route}/${id}`, 'DELETE');
  }
}

function jsonify(response)
{
  return response.json();
}

function bodify(data)
{
  for(const key in data)
  {
    if(data[key] === '' || data[key] === undefined)
      delete data[key];
  }

  return JSON.stringify(data);
}

export const apiCustomService = new APICUSTOMService();
