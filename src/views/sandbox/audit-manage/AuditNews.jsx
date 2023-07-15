import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Table,Button,notification} from 'antd'

export default function AuditNews() {
    const [dataSource, setdataSource] = useState([])
    const {roleId,region,username}  = JSON.parse(localStorage.getItem("token"))
    useEffect(()=>{
        const roleObj = {
            "1":"superadmin",
            "2":"admin",
            "3":"editor"
        }
        axios.get(`/news?auditState=1&_expand=category`).then(res => {
            const list = res.data
            setdataSource(roleObj[roleId]==="superadmin"?list:[
                ...list.filter(item=>item.author===username),
                ...list.filter(item=>item.region===region&& roleObj[item.roleId]==="editor")
            ])
        })
    },[roleId,region,username])

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            render: (title,item) => {
                return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
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
            title: "Modification",
            render: (item) => {
                return <div>
                   <Button type="primary" onClick={()=>handleAudit(item,2,1)}>Approve</Button>
                   <Button danger onClick={()=>handleAudit(item,3,0)}>Disapprove</Button>
                </div>
            }
        }
    ];
    // audit => 1 
    const handleAudit = (item,auditState,publishState)=>{
        setdataSource(dataSource.filter(data=>data.id!==item.id))

        axios.patch(`/news/${item.id}`,{
            auditState,
            publishState
        }).then(res=>{
            notification.info({
                message: `Notification`,
                description:
                  `You can go to [Review Management/Review List] to check the status of your news review.`,
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