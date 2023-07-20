import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';

import Login from '../views/login/Login';
import Sandbox from '../views/sandbox/Sandbox';
import News from '../views/news/News';
import Details from '../views/news/Details';

function IndexRouter() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/news" component={News}/>
          <Route path="/detail/:id" component={Details}/>
          <Route path="/" 
                render={ ()=> 
                localStorage.getItem("token")?<Sandbox/> 
                : <Redirect to="/login"/>}
          />   
        </Switch>
      </BrowserRouter>        
  )
}


export default IndexRouter