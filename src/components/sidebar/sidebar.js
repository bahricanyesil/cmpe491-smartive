import React from 'react';
import { Menu, Sidebar } from 'react-pro-sidebar';
import SidebarMenuItem from './sidebar_menu_item';

const SourceCodeView = () => {
    return (
      <Sidebar>
      <h3 style={{textAlign: 'center', marginBottom:'3%', marginTop:'5%', fontSize: '24px' }}>Contract Templates</h3>
      <Menu>
        <SidebarMenuItem toUrl="/stadium-ticket" label="Stadium Ticket" />
        <SidebarMenuItem toUrl="/cafe-menu" label="Cafe Menu" />
        <SidebarMenuItem toUrl="/clinical-trial-data" label="Clinical Trial Data" />
        <SidebarMenuItem toUrl="/numbered-event-ticket" label="Numbered Event Ticket" />
        <SidebarMenuItem toUrl="/clothing" label="Clothing" />
        <SidebarMenuItem toUrl="/game-objects" label="Game Objects" />
        <SidebarMenuItem toUrl="/insurance" label="Insurance" />
        <SidebarMenuItem toUrl="/product-management" label="Product Management" />
        <SidebarMenuItem toUrl="/time-slot" label="Time Slot" />
        <SidebarMenuItem toUrl="/travel-ticket" label="Travel Ticket" />
        <SidebarMenuItem toUrl="/unnumbered-event-ticket" label="UnNumbered Event Ticket" />
        <SidebarMenuItem toUrl="/weighted-multiple-voting" label="Weighted Multiple Voting" />
      </Menu>
    </Sidebar>
    );
};

export default SourceCodeView;