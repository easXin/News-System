import { Switch, Route, Redirect} from 'react-router-dom';
import './css/Sandbox.css'

import TopHeader from '../../components/topHeader/TopHeader';
import SideMenu from '../../components/sideMenu/SideMenu';
import Home from './home/Home';
import UserList from './user-manage/userList/UserList';
import RoleList from './right-manage/role/RoleList';
import AccessControlList from './right-manage/right/RightList';
import NewsCategory from './news-manage/category/NewsCategory';
import NewsDraft from './news-manage/draft/NewsDraft';
import NoPermission from './no-permission/NoPermission';

// antd 
import {Layout} from 'antd'
import NewsSunset from './publish-manage/newsSunset/NewsSunset';
import NewsPublished from './publish-manage/newsPublished/NewPublished';
import NewsUnpublished from './publish-manage/newsUnpublished/NewUnpublished';
import AuditList from './audit-manage/auditList/AuditList';
import AuditNews from './audit-manage/auditNews/AuditNews';

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
              <Route path="/user-manage/update" component={UserList}/>
              <Route path="/user-manage/delete" component={UserList}/>
              <Route path="/user-manage/add" component={UserList}/>
              <Route path="/right-manage/role/list" component={RoleList}/>
              <Route path="/right-manage/right/list" component={AccessControlList}/>í
              <Route path="/news-manage/draft" component={NewsDraft}/>
              <Route path="/news-manage/category" component={NewsCategory}/>
              <Route path="/audit-manage/list" component={AuditList}/>
              <Route path="/audit-manage/audit" component={AuditNews}/>
              <Route path="/publish-manage/unpublished" component={NewsUnpublished}/>
              <Route path="/publish-manage/published" component={NewsPublished}/>
              <Route path="/publish-manage/sunset" component={NewsSunset}/>
              <Redirect from="/" to="/home" exact/>
              <Route path="*"  component={NoPermission}/>
            </Switch>
        </Content>
      </Layout>
  </Layout>
  )
}

export default Sandbox