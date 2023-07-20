import React from 'react';
import './css/TopHeader.css';
import {withRouter} from 'react-router-dom';
import {MenuUnfoldOutlined,MenuFoldOutlined,UserOutlined} from '@ant-design/icons';
import { Layout,Menu,Dropdown,Avatar } from 'antd';
import {connect} from 'react-redux'

function TopHeader(props) {
  //console.log(props)
  const { Header} = Layout;
  const {role:{roleName},username} = JSON.parse(localStorage.getItem("token"))
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div onClick={()=>{console.log("XXX")}}>Setting</div> 
          ),
        },
        {
          key: '2',
          label: (
            <div  onClick={()=>{
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
      {React.createElement(props.isCollapsed ? MenuFoldOutlined : MenuUnfoldOutlined, 
      {
        className: 'trigger',
        onClick: () =>{
          props.changeCollapsed()
     }})}
    
        <div style={{ float: "right" }}>
                <span style={{paddingRight: '15px'}}>Welcome back, <span style={{color:"#1890ff"}}>{username}</span></span> 
                <Dropdown overlay={menu}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
      
  </Header>
  )
}
// mapping state to prop    mapping dispatch to props  state
const mapStateToProps = ({CollApsedReducer:{isCollapsed}})=>{
  // console.log(state)
  return {
      isCollapsed
  }
}
// give topheader isCollapsed property
// access these value with props

const mapDispatchToProps = {
  changeCollapsed(){
      return {
          type: "change_collapsed"
          // payload:
      }//action 
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TopHeader));