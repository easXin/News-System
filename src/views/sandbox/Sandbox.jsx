import { Switch, Route, Redirect} from 'react-router-dom';
import './css/Sandbox.scss'

import TopHeader from '../../components/topHeader/TopHeader';
import SideMenu from '../../components/sideMenu/SideMenu';
import Home from './home/Home';
import UserList from './user-manage/userList/UserList';
import RoleList from './right-manage/role/RoleList';
import AccessControlList from './right-manage/right/AccessControlList';
import NewsCategory from './news-manage/category/NewsCategory';
import NewsDraft from './news-manage/draft/NewsDraft';
import NoPermission from './no-permission/NoPermission';

// antd 
import {Layout} from 'antd'

function Sandbox() {
  const{Content} = Layout;
  return (
    <Layout>
      <SideMenu/>
      
      <Layout className="site-layout">
        <TopHeader/>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
              <Route path="/home" component={Home}/>
              <Route path="/user-manage/list" component={UserList}/>
              <Route path="/right-manage/role/list" component={RoleList}/>
              <Route path="/right-manage/right/list" component={AccessControlList}/>í
              <Route path="/news-manage/draft" component={NewsDraft}/>
              <Route path="/news-manage/category" component={NewsCategory}/>
              <Redirect from="/" to="/home" exact/>
              <Route path="*"  component={NoPermission}/>
            </Switch>
        </Content>
      </Layout>
  </Layout>
  )
}

export default Sandbox