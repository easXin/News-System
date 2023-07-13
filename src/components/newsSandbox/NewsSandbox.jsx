import { Switch, Route, Redirect} from 'react-router-dom';
import AuditList from '../../views/sandbox/audit-manage/AuditList';
import AuditNews from '../../views/sandbox/audit-manage/AuditNews';
import Home from '../../views/sandbox/home/Home';
import NewsCategory from '../../views/sandbox/news-manage/NewsCategory';
import NewsAdd from '../../views/sandbox/news-manage/NewsAdd';
import NewsDelete from '../../views/sandbox/news-manage/NewsDel';
import NewsUpdate from '../../views/sandbox/news-manage/NewsUpdate';
import NewsDraft from '../../views/sandbox/news-manage/NewsDraft';
import NoPermission from '../../views/sandbox/no-permission/NoPermission';
import NewsPublished from '../../views/sandbox/publish-manage/NewPublished';
import NewsSunset from '../../views/sandbox/publish-manage/NewsSunset';
import NewsUnpublished from '../../views/sandbox/publish-manage/NewUnpublished';
import RoleList from '../../views/sandbox/right-manage/RoleList';
import AccessControlList from '../../views/sandbox/right-manage/RightList';
import UserList from '../../views/sandbox/user-manage/UserList';
import { useEffect, useState } from 'react';
import axios from 'axios';
function NewsSandbox() {
  const [BackendRouteList, setBackendRouteList] = useState([]);
  useEffect(()=>{
    Promise.all([
        axios.get("http://localhost:5000/rights"),
        axios.get("http://localhost:5000/children"),
    ]).then(res=>{
       setBackendRouteList([...res[0].data,...res[1].data])
      
    })
  },[])
  const LocalRouterMap = {
    "/home":Home,
    "/user-manage/list":UserList,
    "/right-manage/role/list":RoleList,
    "/right-manage/right/list":AccessControlList,
    "/news-manage/add": NewsAdd,
    "/news-manage/draft":NewsDraft,
    "/user-manage/delete": NewsDelete,
    "/news-manage/update":NewsUpdate,
    "/news-manage/category":NewsCategory,
    "/audit-manage/list" :AuditList,
    "/audit-manage/audit":AuditNews,
    "/publish-manage/unpublished":NewsUnpublished,
    "/publish-manage/published" :NewsPublished,
    "/publish-manage/sunset":NewsSunset,
    "*":NoPermission
  }
//   console.log(BackendRouteList)
  const checkRoute = (item) =>{
    return LocalRouterMap[item.key]&&item.pagemermission
  }
  const {role:{rights}} = JSON.parse(localStorage.getItem("token"))
  const checkUserPermission = (item)=>{
    return rights.includes(item.key)
  }
  return (
    
    <Switch>
       {
           BackendRouteList.map(item =>
            {
              if(checkRoute(item)&&checkUserPermission()){
                return <Route path={item.key} key={item.id} component={LocalRouterMap[item.key]} exact/>
              }
              return null
            }  
        )}

        <Redirect from="/" to="/home" exact/>
        {
          BackendRouteList.length>0&&
           <Route path="*"component={NoPermission}/>
        
        }
       
    </Switch>
  )
}

export default NewsSandbox