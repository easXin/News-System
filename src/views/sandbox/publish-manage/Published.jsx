import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'

import {Button} from 'antd'

export default function Published() {
    // 2=== 已发布的
    const {dataSource,handleSunset} = usePublish(2)

    return (
        <div>
            <NewsPublish dataSource={dataSource} button={(id)=><Button type="primary" onClick={()=>handleSunset(id)}>
                Offline
            </Button>}>

            </NewsPublish>
        </div>
    )
}
