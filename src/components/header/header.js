import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import {
  Bars, Nav, NavLink, NavMenu
} from './header_elements';
import './header_elements.css';
import logo from './logo.png';
  
const Header = () => {
  return (
    <> 
      <Nav style={{alignItems: 'center', flexDirection: 'row', paddingLeft: '30px'}}>
        <div
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
        <Link to='/' className='navv-link'><h2 style={{marginLeft: '18px', marginRight: '60px', fontSize: '23px', paddingTop:'0px', paddingBottom:'0px', marginTop:'0px',marginBottom:'0px'}}>SMARTIVE</h2></Link>
        <Bars />
        <NavMenu>
          <NavLink to='/' activeStyle>
            Home
          </NavLink>
          <NavLink to='/management' activeStyle>
            Management
          </NavLink>
          <NavLink to='/about' activeStyle>
            About Us
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Header;