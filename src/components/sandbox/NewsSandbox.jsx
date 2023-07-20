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
import NewsPublished from '../../views/sandbox/publish-manage/Published';
import NewsSunset from '../../views/sandbox/publish-manage/Sunset';
import NewsUnpublished from '../../views/sandbox/publish-manage/Unpublished';
import RoleList from '../../views/sandbox/right-manage/RoleList';
import AccessControlList from '../../views/sandbox/right-manage/RightList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from '../../views/sandbox/user-manage/UserList';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import {connect} from 'react-redux'
import NewsPreview from '../../views/sandbox/news-manage/NewsPreview';
import { Spin } from 'antd';

function NewsSandbox(props) {
  NProgress.start()
  useEffect(()=>{
    NProgress.done()
  })
  const [BackendRouteList, setBackendRouteList] = useState([]);
  useEffect(()=>{
    Promise.all([
        axios.get("/rights"),
        axios.get("/children"),
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
    "/news-manage/update/:id":NewsUpdate,
    "/news-manage/preview/:id":NewsPreview,
    "/news-manage/category":NewsCategory,
    "/audit-manage/list" :AuditList,
    "/audit-manage/audit":AuditNews,
    "/publish-manage/unpublished":NewsUnpublished,
    "/publish-manage/published" :NewsPublished,
    "/publish-manage/sunset":NewsSunset
  }
  const { role: { rights } } = JSON.parse(localStorage.getItem("token"))

  const checkRoute = (item) => {
      //console.log(item)
      return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
  }

  const checkUserPermission = (item) => {
      return rights.includes(item.key)
  }
  return (
  //  import { Space, Spin } from 'antd';

    
  <Spin size="large" spinning={props.isLoading} >
    <Switch>
      {
          BackendRouteList.map(item => {
              if (checkRoute(item) && checkUserPermission(item)) {
                  return <Route path={item.key} key={item.key} component={LocalRouterMap[item.key]} exact />
              }
              return null
          }
              )
      }

      <Redirect from="/" to="/home" exact />
      {
          BackendRouteList.length > 0 && <Route path="*" component={NoPermission} />
      }

    
   </Switch>
   </Spin>
  )
}


const mapStateToProps = ({LoadingReducer:{isLoading}})=>({
  isLoading
})

export default connect(mapStateToProps)(NewsSandbox)