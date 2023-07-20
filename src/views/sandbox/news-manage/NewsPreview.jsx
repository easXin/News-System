import { Descriptions, PageHeader } from "antd"
import { useEffect, useState } from "react"
import axios from 'axios';
import moment from "moment";
import './css/NewsPreview.css'
function NewsPreview(props) {
  const[dataSource,setdataSource]=useState(null)

  useEffect(() => {
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(res => {
            setdataSource(res.data)
            //console.log(res.data)
        })
  }, [props.match.params.id])
  const auditList = ["Not Audited", 'Under Review', 'Approved', 'Not Approved']
  const publishList = ["Not Published", 'Pending', 'Online', 'Offline']

  return (
    <div>
        {dataSource && 
            <div className="news-preview">
                <div>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => window.history.back()}
                        title="News Info"
                      
                    />
                </div>
                <div>
                    <Descriptions  column={3} >
                        <Descriptions.Item label="Creater">{dataSource.author}</Descriptions.Item>
                        <Descriptions.Item label="Created Time">{moment(dataSource.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>
                        <Descriptions.Item label="Published Time">
                            {
                                dataSource.publishTime ? moment(dataSource.publishTime).format("YYYY/MM/DD HH:mm:ss") : "-"
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="Region">{dataSource.region}</Descriptions.Item>
                        <Descriptions.Item label="Audit State">{auditList[dataSource.auditState]}</Descriptions.Item>
                        <Descriptions.Item label="Published State">{publishList[dataSource.publishState]}</Descriptions.Item>
                        <Descriptions.Item label="Views">{dataSource.view}</Descriptions.Item>
                        <Descriptions.Item label="Likes">{dataSource.star}</Descriptions.Item>
                        <Descriptions.Item label="Comments">0</Descriptions.Item>
                    </Descriptions>  
                    
                    <div dangerouslySetInnerHTML={{
                            __html:dataSource.content
                        }} >
                    </div>
                </div>
            </div>}
       
    </div>
  )
}


export default NewsPreview