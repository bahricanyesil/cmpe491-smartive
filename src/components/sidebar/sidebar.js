import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import './sidebar.css';

const SideBar = () => {
    return (
        <div className='general-sidebar-container'>
        <div className='home-page-con'>
        <h2>Contract Templates</h2>
          <Link style={{color: 'black'}} to='/' className='navv-link'>Stadium Ticket</Link>
          <br></br>
          <Link style={{color: 'black'}} to='/' className='navv-link'>Cafe Menu</Link>
          <br></br>
          <Link style={{color: 'black'}} to='/' className='navv-link'>Clinical Trial Data</Link>
          <br></br>
          <Link style={{color: 'black'}} to='/' className='navv-link'>Clothing</Link>
          <br></br>
          <Link style={{color: 'black'}} to='/' className='navv-link'>Numbered Event Ticket</Link>
          <br></br>
          <Link style={{color: 'black'}} to='/' className='navv-link'>Product Management</Link>
          <br></br>
          <Link style={{color: 'black'}} to='/' className='navv-link'>Weighted Multiple Voting</Link>
          <br></br>
          <Link style={{color: 'black'}} to='/' className='navv-link'>Game Objects</Link>
          <br></br>
          <Link style={{color: 'black'}} to='/' className='navv-link'>Insurance</Link>
          <br></br>
          <Link style={{color: 'black'}} to='/' className='navv-link'>Time Slot</Link>
          <br></br>
          <Link style={{color: 'black'}} to='/' className='navv-link'>UnNumbered Event Ticket</Link>
        </div>
    </div>
    );

};
export default SideBar;