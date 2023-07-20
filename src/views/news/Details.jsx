import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions } from 'antd';
import moment from 'moment'
import axios from 'axios';
import {HeartTwoTone} from '@ant-design/icons'
export default function Detail(props) {
    const [newsInfo, setnewsInfo] = useState(null)
    useEffect(() => {
        // console.log()
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(res => {
            setnewsInfo({
                ...res.data,
                view:res.data.view+1
            })

            //同步后端
            return res.data
        }).then(res=>{
            axios.patch(`/news/${props.match.params.id}`,{
                view:res.view+1
            })
        })
    }, [props.match.params.id])
    const handleStar = ()=>{
        setnewsInfo({
            ...newsInfo,
            star:newsInfo.star+1
        })

        axios.patch(`/news/${props.match.params.id}`,{
            star:newsInfo.star+1
        })
    }
    return (
        <div style={{
            margin:"0 24px"
        }}>
            {
                newsInfo && <div>

                    <PageHeader
                        onBack={() => window.history.back()}
                        title={newsInfo.title}
                        subTitle={<div>
                            {newsInfo.category.title}
                            <HeartTwoTone twoToneColor="#eb2f96" onClick={()=>handleStar()}/>

                        </div>}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="Creater">{newsInfo.author}</Descriptions.Item>
                           
                            <Descriptions.Item label="Published Time">{
                                newsInfo.publishTime ? moment(newsInfo.publishTime).format("YYYY/MM/DD HH:mm:ss") : "-"
                            }</Descriptions.Item>
                            <Descriptions.Item label="Region">{newsInfo.region}</Descriptions.Item>
                           
                            <Descriptions.Item label="Views">{newsInfo.view}</Descriptions.Item>
                            <Descriptions.Item label="Likes">{newsInfo.star}</Descriptions.Item>
                            <Descriptions.Item label="Comments">0</Descriptions.Item>

                        </Descriptions>

                    </PageHeader>

                    <div dangerouslySetInnerHTML={{
                        __html:newsInfo.content
                    }}>
                    </div>
                </div>
            }
        </div>
    )
}
