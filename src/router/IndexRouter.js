import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';

import Login from '../views/login/Login';
import Sandbox from '../views/sandbox/Sandbox';

function IndexRouter() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}/>
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