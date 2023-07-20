import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Drawer, List, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useRef, useState,useEffect } from 'react';
import * as Echarts from 'echarts'
import _ from 'lodash'
import axios from 'axios';

function Home() {
  const [viewList, setviewList] = useState([])
  const [starList, setstarList] = useState([])
  const [allList, setallList] = useState([])
  const [visible, setvisible] = useState(false)
  const [pieChart, setpieChart] = useState(null)
  const barRef = useRef()
  const pieRef = useRef()
  
  useEffect(() => {
    axios.get("/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6")
    .then(res => {
        setviewList(res.data)
    })
}, [])

useEffect(() => {
    axios.get("/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6")
    .then(res => {
        setstarList(res.data)
    })
}, [])

useEffect(() => {

    axios.get("/news?publishState=2&_expand=category")
    .then(res => {
       
        renderBarView(_.groupBy(res.data, item => item.category.title))

        setallList(res.data)
    })

    return () => {
        window.onresize = null
    }
}, [])

const renderBarView = (obj) => {
    var myChart = Echarts.init(barRef.current);

    var option = {
        title: {
            text: 'News Category'
        },
        tooltip: {},
        xAxis: {
            data: Object.keys(obj),
            axisLabel: {
                rotate: "45",
                interval: 0
            }
        },
        yAxis: {
            minInterval: 1
        },
        series: [{
            name: 'Number',
            type: 'bar',
            data: Object.values(obj).map(item => item.length)
        }]
    };

    myChart.setOption(option);


    window.onresize = () => {
        // console.log("resize")
        myChart.resize()
    }
}

const renderPieView = (obj) => {

    var currentList =allList.filter(item=>item.author===username)
    var groupObj = _.groupBy(currentList,item=>item.category.title)
    var list = []
    for(var i in groupObj){
        list.push({
            name:i,
            value:groupObj[i].length
        })
    }
    var myChart;
    if(!pieChart){
        myChart = Echarts.init(pieRef.current);
        setpieChart(myChart)
    }else{
        myChart = pieChart
    }
    var option;

    option = {
        title: {
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Published',
                type: 'pie',
                radius: '50%',
                data: list,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    option && myChart.setOption(option);

}
const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem("token"))
  return (
    <div className="site-card-wrapper">
      
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Most Popular Page" bordered={true}>
            <List
              size="small"
              dataSource={viewList}
              renderItem={item => <List.Item>
                  <a href={`/news-manage/preview/${item.id}`}>{item.title}</a>
              </List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Most Likes Page" bordered={true}>
            <List
              size="small"
              dataSource={starList}
              renderItem={item => <List.Item>
                  <a href={`/news-manage/preview/${item.id}`}>{item.title}</a>
              </List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
        <Card
          cover={
            <img
              alt="example"
              src="data:image/jpeg;base64,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"
            />
          }
          actions={[
            <SettingOutlined key="setting" onClick={() => {
              setTimeout(() => {
                  setvisible(true)
                  renderPieView()
              }, 0)
             }} />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar src="data:image/jpeg;base64,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" />}
            title={username}
            description={
              <div>
                  <b>{region ? region : "Global"}</b>
                  <span style={{
                      paddingLeft: "2px"
                  }}>{roleName}</span>
              </div>
          }
          />
        </Card>
        </Col>
      </Row>
      <Drawer
                width="500px"
                title="News Category"
                placement="right"
                closable={true}
                onClose={() => {
                    setvisible(false)
                }}
                visible={visible}
            >
                <div ref={pieRef} style={{
                    width: '100%',
                    height: "400px",
                    marginTop: "30px"
                }}></div>
            </Drawer>


            <div ref={barRef} style={{
                display:"none"
                // width: '100%',
                // height: "400px",
                // marginTop: "30px"
            }}></div>   
    </div>
  )
}

export default Home;