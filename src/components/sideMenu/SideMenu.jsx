import { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import './css/SideMenu.css'

import {UserOutlined,} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import axios from 'axios';

function getItem(label, key, children, type) {
  return {
    key,
    children,
    label,
    type,
  };
}

function SideMenu (props){
  // const menuList = [
  //   {
  //     key:"/home",
  //     title:"HomePage",
  //     icon:<UserOutlined/>
  //   },
  //   {
  //     key:"/user-manage",
  //     title:"User Control",
  //     icon:<UserOutlined/>,
  //     children:[
  //       {
  //         key:"/user-manage/list",
  //         title:"User List",
  //         icon:<UserOutlined/>,
  //       }
  //     ]
  //   },
  //   {
  //     key:"/right-manage",
  //     title:"Access Control",
  //     icon:<UserOutlined/>,
  //     children:[
  //       {
  //         key:"/right-manage/role/list",
  //         title:"Role List",
  //         icon:<UserOutlined/>
  //       },
  //       {
  //         key:"/right-manage/right/list",
  //         title:"Permission List",
  //         icon:<UserOutlined/>
  //       }
  //     ]
  //   },
  //   {
  //     key:"/news-manage2",
  //     title:"News Control",
  //     icon:<UserOutlined/>,
  //     children:[
  //       {
  //         key:"/news-manage/create-news1",
  //         title:"Role List",
  //         icon:<UserOutlined/>
  //       },
  //       {
  //         key:"/news-manage/draft1",
  //         title:"Draft",
  //         icon:<UserOutlined/>
  //       },
  //       {
  //         key:"/news-manage/category1",
  //         title:"Category",
  //         icon:<UserOutlined/>
  //       }
  //     ]
  //   },
  //   {
  //     key:"/news-manage3",
  //     title:"Audit Control",
  //     icon:<UserOutlined/>,
  //     children:[
  //       {
  //         key:"/news-manage/create-news2",
  //         title:"Role List",
  //         icon:<UserOutlined/>
  //       },
  //       {
  //         key:"/news-manage/draft2",
  //         title:"Draft",
  //         icon:<UserOutlined/>
  //       },
  //       {
  //         key:"/news-manage/category2",
  //         title:"Category",
  //         icon:<UserOutlined/>
  //       }
  //     ]
  //   },
  //   {
  //     key:"/news-manage",
  //     title:"Publish Control",
  //     icon:<UserOutlined/>,
  //     children:[
  //       {
  //         key:"/news-manage/create-news",
  //         title:"Role List",
  //         icon:<UserOutlined/>
  //       },
  //       {
  //         key:"/news-manage/draft",
  //         title:"Draft",
  //         icon:<UserOutlined/>
  //       },
  //       {
  //         key:"/news-manage/category",
  //         title:"Category",
  //         icon:<UserOutlined/>
  //       }
  //     ]
  //   }

  // ]
  const iconList = {
    "/home":<UserOutlined/>,
    "/user-manage":<UserOutlined/>,
    "/user-manage/list":<UserOutlined/>,
    "/right-manage":<UserOutlined/>,
    "/right-manage/role/list":<UserOutlined/>,
    "/right-manage/right/list":<UserOutlined/>,
    "/news-manage":<UserOutlined/>,
    "/news-manage/draft":<UserOutlined/>,
    "/news-manage/category":<UserOutlined/>,
  }
  const {Sider} = Layout;
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  const [collapsed,setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const selectKey = [props.location.pathname]
  const[menu,setMenu] = useState([])
  useEffect(()=>{
    // _expand 
    // _embed  related data
    axios.get("http://localhost:5000/rights?_embed=children")
    .then(res=>setMenu(res.data))
  },[])

  const renderMenu = (menuList) =>{
    return menuList.map(item => {
     // console.log(item)
      if(item.children?.length>0&&checkPermission(item)){
          return <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
              {renderMenu(item.children)}
          </SubMenu>
      }
      return checkPermission(item)&&<Menu.Item key={item.key} icon={iconList[item.key]} 
                onClick={()=> props.history.push(item.key)}
              >{item.title}
              
              </Menu.Item>
    })
  }
  const checkPermission=(item)=>{
    return item.pagepermission !==1
  }
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{display:"flex",height:"100%",flexDirection:"column"
    
    
    }}>
        <div className="logo">Permission Management System</div>
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
export default withRouter(SideMenu)


