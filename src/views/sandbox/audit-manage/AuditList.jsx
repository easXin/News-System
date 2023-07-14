import React, { useEffect, useState } from 'react'
import {Table,Button,Tag,notification} from 'antd'
import axios from 'axios'
export default function AuditList(props) {
    const [dataSource, setdataSource] = useState([])
    const {username} = JSON.parse(localStorage.getItem("token"))
    useEffect(()=>{
        axios(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res=>{
            console.log(res.data)
            setdataSource(res.data)
        })
    },[username])


    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            render: (title,item) => {
                return <a href={`/news-manage/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: 'Author',
            dataIndex: 'author'
        },
        {
            title: "Category",
            dataIndex: 'category',
            render: (category) => {
                return <div>{category.title}</div>
            }
        },
        {
            title: "Audit State",
            dataIndex: 'auditState',
            render: (auditState) => {
                const colorList = ["",'orange','green','red']
                const auditList = ["Draft","Verifing","Pass","Failure"]
                return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
            }
        },
        {
            title: "Modification",
            render: (item) => {
                return <div>
                    {
                        item.auditState===1 &&  <Button onClick={()=>handleRervert(item)} >Recall</Button>
                    }
                    {
                        item.auditState===2 &&  <Button  danger onClick={()=>handlePublish(item)}>Publish</Button>
                    }
                    {
                        item.auditState===3 &&  <Button type="primary" onClick={()=>handleUpdate(item)}>Update</Button>
                    }
                </div>
            }
        }
    ];

    const handleRervert = (item)=>{
        setdataSource(dataSource.filter(data=>data.id!==item.id))

        axios.patch(`/news/${item.id}`,{
            auditState:0
        }).then(res=>{
            notification.info({
                message: `通知`,
                description:
                  `您可以到草稿箱中查看您的新闻`,
                placement:"bottomRight"
            });
  
        })
    }

    const handleUpdate = (item)=>{
        props.history.push(`/news-manage/update/${item.id}`)
    }

    const handlePublish = (item)=>{
        axios.patch(`/news/${item.id}`, {
            "publishState": 2,
            "publishTime":Date.now()
        }).then(res=>{
            props.history.push('/publish-manage/published')

            notification.info({
                message: `通知`,
                description:
                  `您可以到【发布管理/已经发布】中查看您的新闻`,
                placement:"bottomRight"
            });
        })
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
