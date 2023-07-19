
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'
import {Button} from 'antd'
// pending 
function NewsUnpublished() {
    //const {username} = JSON.parse(localStorage.getItem("token"))
    const {dataSource,handlePublish} = usePublish(1)
    return (
      <div>   
         <NewsPublish dataSource={dataSource} button={(id)=><Button type='primary' onClick={()=>handlePublish(id)}>
                Publish
            </Button>}></NewsPublish>
      </div>
    )
  }
  
  export default NewsUnpublished;
/*
      publish  2   -> publish 
      publish  1   -> pending
      publish  0   -> draft

*/