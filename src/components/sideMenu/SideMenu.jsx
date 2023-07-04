import { useState } from 'react';
import './css/SideMenu.scss'

import {MailOutlined, SettingOutlined ,UploadOutlined,UserOutlined,VideoCameraOutlined} from '@ant-design/icons';
import {Layout, Menu} from 'antd';

function getItem(label, key, children, type) {
  return {
    key,
    children,
    label,
    type,
  };
}

function SideMenu() {
  const menuList = [
    {
      key:"/home",
      title:"HomePage",
      icon:<UserOutlined/>
    },
    {
      key:"/user-manage",
      title:"User Control",
      icon:<UserOutlined/>,
      children:[
        {
          key:"/user-manage/list",
          title:"User List",
          icon:<UserOutlined/>,
        }
      ]
    },
    {
      key:"/right-manage",
      title:"Permission Control",
      icon:<UserOutlined/>,
      children:[
        {
          key:"/right-manage/role/list",
          title:"Role List",
          icon:<UserOutlined/>
        },
        {
          key:"/right-manage/right/list",
          title:"Permission List",
          icon:<UserOutlined/>
        }
      ]
    }
  ]
  // <Route path="/news-manage/draft" component={NewsDraft}/>
            //  <Route path="/news-manage/category" component={NewsCategory}/>

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
  const items = [
    getItem('Home Page', 'sub1'),
    getItem('User Control', 'sub2', [
      getItem('User List', '9')
    ]),
    getItem('Permission Control', 'sub3', [
      getItem('Role List', '9'),
      getItem('Permission List', '10')
    ]),
    getItem('News Control', 'sub4', [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
    getItem('Review Control', 'sub5', [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
    getItem('Content Control', 'sub6', [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),

    
  ];
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">Global News Release Management System</div>
      <Menu
        theme='dark'
        defaultSelectedKeys={['1']}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
    </Sider>
  )
}

export default SideMenu


