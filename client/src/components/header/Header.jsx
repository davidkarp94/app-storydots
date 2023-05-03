import React, { useState } from 'react';
import './header.css';

const Header = () => {

  const [modalLogin, setModalLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isAdmin'));
  const [userData, setUserData] = useState(localStorage.getItem('loggedUser'));

  const modalHandler = () => {
    setModalLogin(!modalLogin)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      const { user, isAdmin } = await response.json();
      localStorage.setItem("isAdmin", isAdmin);
      localStorage.setItem("loggedUser", user[0].username)
      setIsLoggedIn(isAdmin);
      setUserData(user[0].username)
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    location.reload();
  };

  return (
    <div className='header-container'>

      <p className='logo'>Ecommerce App</p>

      {
        isLoggedIn ? (
          <div className='username-container'>
            <p className='username'>Welcome, {userData}</p>
            <button className='main-btn' onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className='main-btn' onClick={modalHandler}>
            Login
          </button>
        )
      }


        {
          modalLogin && (
            <div className='overlay'>
                <div className='login-container'>

                <form className='login-form' onSubmit={handleLogin}>
                  <div className='login-form-group'>
                    <label htmlFor='username'>Username</label>
                    <input
                      type='text'
                      id='username'
                      value={username}
                      placeholder='username: admin, password: admin'
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </div>

                  <div className='login-form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                      type='password'
                      id='password'
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>

                  <div className='form-actions'>
                    <button type='submit' className='main-btn'>Login</button>
                    <button type='button' className='main-btn black-btn' onClick={modalHandler}>
                      Cancel
                    </button>
                  </div>
                </form>
        
                </div>
            </div>
          )
        }
    </div>
  )
}

export default Header