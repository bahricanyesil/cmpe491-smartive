import React from 'react';
import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import './header.css';
import logo from './logo.png';

const Header = () => {
  return (
    <>
      <nav className='navv'>
        <FaBars className='bars' />
        <div
          className='navv-logo'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Link to='/' className='navv-logo-link'>
            <img
              src={logo}
              alt='logo'
              className='navv-logo-img'
              style={{height: '50px'}}
            />
          </Link>
        </div>
        <div
          style={{
            marginLeft: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Link to='/' className='navv-link'>
            <p style={{fontSize: '20px', color: 'black', fontFamily: 'Abel'}}>SMARTIVE</p>
          </Link>
          </div>
      </nav>
    </>
  );
};

export default Header;