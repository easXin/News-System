import { useEffect, useState,useRef } from "react";
import axios from 'axios'
import { Button, Switch, Table,Modal} from "antd";
import { DeleteOutlined, MenuOutlined } from "@ant-design/icons";
import UserForm from "../../../../components/user-manage/UserForm";

function UserList() {
  const [dataSource, setdataSource] = useState([])
  const [isAddVisible,setIsAddVisible] = useState(false)
  const [region,setRegion] = useState([])
  const [roleLst,setRoleLst] = useState([])
  const addForm = useRef(null)
  useEffect(() => {
    axios.get("http://localhost:5000/regions").then(res => {
      setRegion(res.data)
    })
  }, [])
  useEffect(() => {
    axios.get("http://localhost:5000/roles").then(res => {
      setRoleLst(res.data)
    })
  }, [])
  useEffect(()=>{
    axios.get("http://localhost:5000/users?_expand=role").then(res=>{
      setdataSource(res.data)
    })
  },[])
  const columns = [
    {
        title: 'Region',
        dataIndex: 'region',
        render: (region) => {
            return <b>{region===""?"全球":region}</b>
        }
    },
    {
        title: 'Role',
        dataIndex: 'username'
    },
    {
      title: 'Username',
      dataIndex: 'role',
      render:(role)=>{
        return role.roleName
      }
    },
    {
      title:"User Status",
      dataIndex: 'roleState',
      render: (roleState,item)=>{
        return <Switch checked={roleState} disabled={item.default}></Switch>
      }
    },
    {
        title: "Modification",
        render: (item) => {
            return <div> 
                <Button danger shape="circle" icon={<DeleteOutlined />} disabled={item.default} 
                  />
                  {/* onClick={() => deletemMethod(item)} */}
                <Button type="primary" shape="circle" icon={<MenuOutlined />} disabled={item.default}
                  onClick={()=>{
                    // setisModalVisible(true)
                    // setcurrentRights(item.rights)
                    // setcurrentId(item.id)
                }}/>
            </div>
        }
    }
]
  

const addFormOK = () => {
  addForm.current.validateFields().then(value => {

       console.log(value)

      //setisAddVisible(false)

      // addForm.current.resetFields()
      // //post到后端，生成id，再设置 datasource, 方便后面的删除和更新
      // axios.post(`/users`, {
      //     ...value,
      //     "roleState": true,
      //     "default": false,
      }).then(res=>{
           console.log(res.data)
          // setdataSource([...dataSource,{
          //     ...res.data,
          //     role:roleList.filter(item=>item.id===value.roleId)[0]
          // }])
      //})
  }).catch(err => {
      console.log(err)
  })
}
return (
      <div>
        <Button type="primary" onClick={()=>setIsAddVisible(true)}>Add User</Button>
        <Table dataSource={dataSource} columns={columns}
              rowKey={(item) => item.id} pagination={{pageSize:5}}></Table>
        <Modal
          open={isAddVisible}
          title="Add New User"
          okText="Confirm"
          cancelText="Cancel"
          onCancel={()=>{
            setIsAddVisible(false)
          }}
          onOk={() => {//validateFields
            addForm.current.validateFields().then(res=>{
                console.log(res)
              }).catch(err =>{
                console.log(err)
              })
            //() => addFormOK()
            //console.log("add ",addForm.current.validateFields)
          }
        }
        >
          <UserForm roleLst={roleLst} region={region} ref={addForm}/>
        </Modal>
      </div>
    )
  }
  
  export default UserList;