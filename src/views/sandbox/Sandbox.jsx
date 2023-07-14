
import './css/Sandbox.css'

import TopHeader from '../../components/sandbox/TopHeader';
import SideMenu from '../../components/sandbox/SideMenu';


// antd 
import {Layout} from 'antd'
import NewsSandbox from '../../components/sandbox/NewsSandbox';
function Sandbox() {
  const{Content} = Layout;
  return (
    <Layout>
      <SideMenu/>
      
      <Layout className="site-layout">
        <TopHeader/>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
        <NewsSandbox/>
        </Content>
      </Layout>
  </Layout>
  )
}

export default Sandbox