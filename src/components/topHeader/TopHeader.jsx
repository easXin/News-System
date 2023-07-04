import { useState } from 'react';
import React from 'react';
import './css/TopHeader.scss';

import {MenuUnfoldOutlined,MenuFoldOutlined,UserOutlined} from '@ant-design/icons';
import { Layout,Menu,Dropdown,Avatar } from 'antd';


function TopHeader() {
  const { Header} = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Setting
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Superuser
            </a>
          ),
        },
        {
          key: '4',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Sign Out
            </a>
          ),
        },
      ]}
    />
  ); 
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: '0px 16px',
      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })}
      <div className="header-right-sec" >
        <span style={{paddingRight: '15px'}}>Welcome back, admin</span> 
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
  </Header>
  )
}

export default TopHeader;