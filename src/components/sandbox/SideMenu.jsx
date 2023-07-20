import { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import './css/SideMenu.css'

import {Layout, Menu} from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import axios from 'axios';
import {connect} from 'react-redux'
import { AuditOutlined, CompassOutlined, FileTextOutlined, HomeOutlined, RocketOutlined, UserOutlined } from '@ant-design/icons';


function SideMenu (props){
  const {Sider} = Layout;
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  //const [collapsed,setCollapsed] = useState(false);
  const{role:{rights}} = JSON.parse(localStorage.getItem("token"))
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  //const selectKey = [props.location.pathname]
  const[menu,setMenu] = useState([])
  useEffect(()=>{
    // _expand 
    // _embed  related data
    axios.get("/rights?_embed=children")
    .then(res=>setMenu(res.data))
  },[])
 
  const iconList = {
    "/home":<HomeOutlined/>,
    "/user-manage":<UserOutlined />,
    "/right-manage":<CompassOutlined />,
    "/news-manage":<FileTextOutlined />,
    "/audit-manage":<AuditOutlined />,
    "/publish-manage": <RocketOutlined />
  }

  const renderMenu = (menuList) =>{
    return menuList.map(item => {
     // console.log(item)
      if(item.children?.length>0&&checkPermission(item)){
          return <SubMenu key={item.key} title={item.title}
          icon={iconList[item.key]}
          >
              {renderMenu(item.children)}
          </SubMenu>
      } //  icon={iconList[item.key]}
      return checkPermission(item)&&<Menu.Item key={item.key} 
                onClick={()=> props.history.push(item.key)} 
                icon={iconList[item.key]}
              >{item.title}
              
              </Menu.Item>
    })
  }
  const checkPermission=(item)=>{
    return (item?.pagepermisson ===1 || item?.pagepermisson ===0) && rights.includes(item.key)
  }
  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <div style={{display:"flex",height:"100%",flexDirection:"column"
    }}>
        <div className="logo" onClick={()=>props.history.push("/home")}>
          {props.isCollapsed?"PMS":"Permission Management System"}
        </div>
        <div style={{flex:1,"overflow":"auto"}}>
          <Menu  
            theme='dark'
            defaultSelectedKeys={['/home']}
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            >
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
// HOC => props 
const mapStateToProps = ({CollApsedReducer:{isCollapsed}})=>({
  isCollapsed
})
export default connect(mapStateToProps)(withRouter(SideMenu))
