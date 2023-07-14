import { useState } from 'react';
import React from 'react';
import './css/TopHeader.css';
import {withRouter} from 'react-router-dom';
import {MenuUnfoldOutlined,MenuFoldOutlined,UserOutlined} from '@ant-design/icons';
import { Layout,Menu,Dropdown,Avatar } from 'antd';


function TopHeader(props) {
  const { Header} = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {role:{roleName},username} = JSON.parse(localStorage.getItem("token"))
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div onClick={()=>{console.log("XXX")}}>Setting</div> 
            // <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            //   Setting
            // </a>
          ),
        },
        {
          key: '2',
          label: (
            <div  onClick={()=>{
              //console.log(props)
              //localStorage.removeItem("token")
              props.history.replace("/login")
            }}>Log out</div>
          ),
        }
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
      {React.createElement(collapsed ? MenuFoldOutlined : MenuUnfoldOutlined, {
        className: 'trigger',
        onClick: () =>{
           setCollapsed(!collapsed)
     }})}
    
        <div style={{ float: "right" }}>
                {/* <span>欢迎<span style={{color:"#1890ff"}}>{username}</span>回来</span> */}
                <span style={{paddingRight: '15px'}}>Welcome back, <span style={{color:"#1890ff"}}>{username}</span></span> 
                <Dropdown overlay={menu}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
      
  </Header>
  )
}

export default withRouter(TopHeader);