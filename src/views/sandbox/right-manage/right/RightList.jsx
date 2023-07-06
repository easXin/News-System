import { useState, useEffect } from 'react'
import { Button, Table, Tag, Modal,Popover, Switch} from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal
export default function RightList() {
    const [dataSource, setdataSource] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/rights?_embed=children").then(res => {
            const list = res.data

            list.forEach(item => {
                if (item.children.length === 0) {
                    item.children = ""
                }
            })
            setdataSource(list)
        })
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: 'Control List',
            dataIndex: 'title'
        },
        {
            title: "URL Path",
            dataIndex: 'key',
            render: (key) => {
                return <Tag color="orange">{key}</Tag>
            }
        },
        {
            title: "Modification",
            render: (item) => {
                return <div>
                    <Button type='dashed' shape="circle" icon={<DeleteOutlined />} onClick={() => deleteMethod(item)} />
                    {/* <Button type='primary' shape="circle" icon={<EditOutlined />}  onClick={() => editMethod(item)}/> */}
                    <Popover content={
                      <div style={{textAlign:"center"}}>
                        <Switch checked={item.pagepermisson} 
                                onChange={()=>switchMethod(item)}/>
                      </div>} 
                      title="Page Config" trigger={item.pagepermisson===undefined?'':'click'}
                    >
                      <Button type="primary" shape="circle" icon={<EditOutlined />}
                          disabled={item.pagepermisson===undefined}  onClick={() => editMethod(item)}
                      />
                    </Popover>
                </div>
            }
        }
    ];

    const  switchMethod = (item)=>{
      console.log(item)
        item.pagepermisson = item.pagepermisson===1?0:1
        // console.log(item)
        setdataSource([...dataSource])

        if(item.grade===1){
            axios.patch(`http://localhost:5000/rights/${item.id}`,{
                pagepermisson:item.pagepermisson
            })
        }else{
            axios.patch(`http://localhost:5000/children/${item.id}`,{
                pagepermisson:item.pagepermisson
            })
        }
   }

    const deleteMethod = (item) => {
        confirm({
            title: 'Are you sure to remove it?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk() {
                //   console.log('OK');
                deleteItem(item)
            },
            onCancel() {
                //   console.log('Cancel');
            },
        });

    }
    const editMethod = (item) => {
      confirm({
          title: 'Are you sure to make this change?',
          icon: <ExclamationCircleOutlined />,
          // content: 'Some descriptions',
          onOk() {
              //   console.log('OK');
              updateItem(item)
          },
          onCancel() {
              //   console.log('Cancel');
          },
      });

  }
    //删除
    const deleteItem = (item) => {
      if (item.grade === 1) {
        setdataSource(dataSource.filter(data => data.id !== item.id))
      }else{
        let list = dataSource.filter(data=>data.id===item.rightId)
        list[0].children = list[0].children.filter(data=>data.id!==item.id)
        setdataSource([...dataSource])
      }
      
      // console.log(item)
        // 当前页面同步状态 + 后端同步
        //setdataSource(dataSource.filter(data => data.id !== item.id))
        // 层级 grade
        // if (item.grade === 1) {
        //     setdataSource(dataSource.filter(data => data.id !== item.id))
        //     axios.delete(`http://localhost:5000/rights/${item.id}`)
        // }else{
        //     let list = dataSource.filter(data=>data.id===item.rightId)
        //     list[0].children = list[0].children.filter(data=>data.id!==item.id)
        //     setdataSource([...dataSource])
        //     axios.delete(`http://localhost:5000/children/${item.id}`)
        // }
    }
    const updateItem = (item) =>{
      console.log("Update -->",item)
    }

    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }}
                rowKey={item=>item.id}
                />
        </div>
    )
}