import Child from './Child'
import axios from 'axios'
import './App.css'
import { useEffect } from 'react'

function App(){
  // execute one time
  useEffect(()=>{
    axios.get("/api/jsonplaceholder.typicode.com/todos")
         .then(res=>{
          console.log(res)
         })
  },[])
  return <div>
    app
      <ul>
        <li>11111</li>
        <li>22222</li>
      </ul>
    <Child/>
  </div>
}

export default App