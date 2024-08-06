import React, { useState, useEffect } from 'react';
import './Login.css';

function Login() {
  const [action, setAction] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedName = localStorage.getItem('name');
    if (storedEmail && storedName) {
      setEmail(storedEmail);
      setName(storedName);
      setIsLoggedIn(true);
      setAction('Logout');
    }
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!name) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.match(emailRegex)) {
      newErrors.email = 'Email is not in a valid format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!password.match(passwordRegex)) {
      newErrors.password = 'Atleast 8 characters,uppercase,lowercase,numbers & symbols';
    }
    return newErrors;
  };

  const handleLogin = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    localStorage.setItem('email', email);
    localStorage.setItem('name', name);
    setIsLoggedIn(true);
    setAction('Logout');
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    setEmail('');
    setName('');
    setPassword('');
    setIsLoggedIn(false);
    setAction('Login');
  };

  return (
     <div className='login-page'>
      <div className="container">
      <div className="header">
        <div className="text">{isLoggedIn ? `Welcome, ${name}` : action}</div>
        <div className="underline"></div>
      </div>

      {!isLoggedIn && (
        <div className="inputs">
          <div className="input">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Jon"
              value={name}
              onChange={handleOnChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="input">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="jon@gmail.com"
              value={email}
              onChange={handleOnChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="input">
            <label htmlFor="pass">Password:</label>
            <input
              type="password"
              id="pass"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleOnChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
        </div>
    )}

      <div className="htmlForget-password">
        {!isLoggedIn && <>Lost Password? <span>Click Here!</span></>}
      </div>

      <div className="submit-container">
        {isLoggedIn ? (
          <div className="submit" onClick={handleLogout}>
            Logout
          </div>
        ) : (
          <>
            <div
              className={action === 'Sign Up' ? 'submit gray' : 'submit'}
              onClick={() => setAction('Sign Up')}
            >
              Sign Up
            </div>
            <div
              className={action === 'Login' ? 'submit gray' : 'submit'}
              onClick={handleLogin}
            >
              Login
            </div>
          </>
        )}
      </div>
    </div>
     </div>
  );
}

export default Login;



  // Single Onchange function =>  store multiple input values in state
  // form validation if validation is true store datas in localstorage 
    // 1. no empty fields,
    // 2. email validation
    // 3. Password validation (optional)