import { Switch, Route, Redirect} from 'react-router-dom';
import './css/Sandbox.module.scss';

import NavBar from '../../components/navBar/NavBar';
import SideMenu from '../../components/sideMenu/SideMenu';
import Home from './home/Home';
import UserList from './user-manage/userList/UserList';
import RoleList from './right-manage/role/RoleList';
import AccessControlList from './right-manage/right/AccessControlList';
import NewsCategory from './news-manage/category/NewsCategory';
import NewsDraft from './news-manage/draft/NewsDraft';
import NoPermission from './nopermission/NoPermission';

function Sandbox() {
  return (
    <div>
      <SideMenu/>
      <NavBar/>
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
    </div>
  )
}
export default Sandbox