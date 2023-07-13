
import { useState, useEffect } from 'react'
import { Button, Table, Modal,Tree} from 'antd'
import axios from 'axios'
import { DeleteOutlined,ExclamationCircleOutlined, MenuOutlined } from '@ant-design/icons'
const { confirm } = Modal

function RoleList() {
  const [dataSource, setdataSource] = useState([])
  const [rightList, setRightList] = useState([])
  const [currentRights, setcurrentRights] = useState([])
  const [currentId, setcurrentId] = useState(0)
  const [isModalVisible, setisModalVisible] = useState(false)
  const columns = [
      {
          title: 'ID',
          dataIndex: 'id',
          render: (id) => {
              return <b>{id}</b>
          }
      },
      {
          title: 'Role Name',
          dataIndex: 'roleName'
      },
      {
          title: "Modification",
          render: (item) => {
              return <div>
                  <Button danger shape="circle" icon={<DeleteOutlined />} 
                   onClick={() => deletemMethod(item)} />
                  <Button type="primary" shape="circle" icon={<MenuOutlined />} 
                    onClick={()=>{
                      setisModalVisible(true)
                      setcurrentRights(item.rights)
                      setcurrentId(item.id)
                  }}/>
              </div>
          }
      }
  ]

  const deletemMethod = (item) => {
      confirm({
          title: 'Are you sure to remove it?',
          icon: <ExclamationCircleOutlined />,
          onOk() {
            setdataSource(dataSource.filter(data => data.id !== item.id))
            axios.delete(`/roles/${item.id}`)
          },
          onCancel() {
          },
      });

  }

    useEffect(() => {
      axios.get("http://localhost:5000/roles").then(res => {
          setdataSource(res.data)
      })
    }, [])
    useEffect(()=>{
      axios.get("http://localhost:5000/rights?_embed=children").then(
        res=> {
          setRightList(res.data)
        }
      )
    },[])

    const handleOk = ()=>{
      //console.log(currentRights,currentId)
      setisModalVisible(false)
      //同步datasource
      setdataSource(dataSource.map(item=>{
          if(item.id===currentId){
              return {
                  ...item,
                  rights:currentRights
              }
          }
          return item
      }))
      //patch

      axios.patch(`/roles/${currentId}`,{
          rights:currentRights
      })
  }

  const handleCancel  =()=>{
      setisModalVisible(false)
  }

  const onCheck = (checkKeys)=>{
      setcurrentRights(checkKeys.checked)
  }
  return (
      <div>
          <Table dataSource={dataSource} columns={columns}
              rowKey={(item) => item.id} pagination={false}></Table>

          <Modal title="Grant Access" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Tree
              checkable
              checkedKeys = {currentRights}
              onCheck={onCheck}
              checkStrictly = {true}
              treeData={rightList}
              
          />

          </Modal>
      </div>
  )
  
  }

export default RoleList;