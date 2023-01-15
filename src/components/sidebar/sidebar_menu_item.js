import React from 'react';
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const SidebarMenuItem = ({label, toUrl}) => {
    return (
      <SubMenu label={label}>
          <MenuItem component={<Link to={toUrl} />}> Create </MenuItem>
          <MenuItem component={<Link to={toUrl} />}> Manage </MenuItem>
          <MenuItem component={<Link to={toUrl} />}> Deploy </MenuItem>
        </SubMenu>
    );
};

export default SidebarMenuItem;