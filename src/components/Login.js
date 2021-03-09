import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import swal from 'sweetalert';
import { apiService } from 'services/apiService';
import './css/Login.css';

export function Login({ setIsLoggedIn })
{
  const [ isLoading, setLoading ] = useState(false);
  const [ formData, updateFormData ] = useState({});
  const formValue = (e) => {
    updateFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const onSubmit = async event => {
    event.preventDefault();
    setLoading(true);

    const { identifier, password } = formData;
    const loginResult = await apiService.login(identifier, password);
    const { jwt } = loginResult;
    
    if (jwt) {
      setIsLoggedIn(true);
      swal("Success", "Successfully logged in", "success");
    } else {
      setLoading(false);
      swal("Oops!", "Identifier or password invalid", "error");
    }
  };

  return (
    <div>
      <div className="sidenav"></div>
      <div className="main">
          <div className="col-md-8 col-sm-12 offset-md-2">
            <div className="login-main-text">
              <h4>Welcome back</h4>
              <h2>Login to your account</h2>
            </div>
            <div className="login-form">
                <form>
                  <div className="form-group">
                      <label>Username</label>
                      <input
                        type="text" 
                        className="form-control" 
                        id="identifier"
                        onChange={formValue} 
                        required 
                      />
                  </div>
                  <div className="form-group">
                      <label>Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="password"
                        onChange={formValue} 
                        required 
                      />
                  </div>
                  <Button
                    variant="primary"
                    className="btn btn-orange btn-login"
                    disabled={isLoading}
                    onClick={!isLoading ? onSubmit : null}
                  >
                    {isLoading ? <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    /> : 'Login'}
                  </Button>
                </form>
            </div>
          </div>
      </div>
    </div>
  );
}