import { Button, Form, Input, PageHeader, Select, Steps, message, notification } from "antd";
import { useEffect, useState, useRef} from "react";
import style from './css/News.module.css'
import axios from 'axios';
import NewEditor from "../../../components/news-manage/NewEditor";
const {Option}  = Select

function NewsAdd(props) {
  const [current, setCurrent] = useState(0);
  const [categories,setCategories] = useState([])
  const newsForm = useRef(null)
  const [formInfo,setFormInfo] = useState({})
  const [content,setContent] = useState("")
  const next = () => {
    // handNext
    if(current===0){
      newsForm.current.validateFields().then(res=>{
          //console.log(res)
          setFormInfo(res)
          setCurrent(current + 1);
        }).catch(err =>{
          console.log(err)
        })
    }else{
      if(content===""||content.trim()==="<p></p>"){
        message.error("Content cannot be blank")
      }
      setCurrent(current + 1);
    }
    
   // console.log("next ",current)
  };
  const prev = () => {
    setCurrent(current - 1);

    console.log("pre ",current)
  };
  const User = JSON.parse(localStorage.getItem("token"))
  const handleSave = (auditState) =>{
    //console.log("Hello")
    axios.post('/news',{
      ...formInfo,
      "content": content,
      "region": User.region?User.region:"全球",
      "author": User.username,
      "roleId": User.roleId,
      "auditState": auditState,
      "publishState": 0,
      "createTime": Date.now(),
      "star": 0,
      "view": 0,
      //"publishTime":1617158496314

    }).then(res=>{
      props.history.push(auditState===0?"/news-manager/draft":"/audit-manage/list")
      notification.info({
        message: `Notification`,
        description: `您可以到${auditState===0?'草稿箱':'审核列表'}中查看您的新闻`,
        placement:'bottomRight'
      });
    })
  }

  useEffect(()=>{
    axios.get("/categories")
         .then(res=>setCategories(res.data))
  },[]);
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="Create News"
      />
      <Steps
        current={current}
        items={[
          {
            title: 'Basic Info',
            description: 'Title, Category',
          },
          {
            title: 'News Content',
            description: 'Body Content'
          },
          {
            title: 'News Submit',
            description: 'Save Draft or Submit for Review',
          },
        ]}
      />
      <div className={current===0?'':style.active}>
        <Form       
          ref={newsForm}
          name="wrap"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}

          labelAlign="left"
          labelWrap
         
          colon={false}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
                name="xxx"
                label="categoryId"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Select>
                    {
                        categories.map(item =>
                            <Option value={item.id} key={item.id} >{item.title}</Option>
                        )
                    }
                </Select>
            </Form.Item> */}
            
            <Form.Item
                            label="Category"
                            name="categoryId"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select>
                                {
                                    categories.map(item =>
                                        <Option value={item.id} key={item.id}>{item.title}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
        </Form>
      </div>
      <div className={current===1?'':style.active}>
        <NewEditor getContent={(content)=>{
          setContent(content)
          // console.log(content)
        }}></NewEditor>
      </div>
      <div className={current===2?'':style.active}>
        2222
      </div>
      <div
        className="btn-box"
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div>
          <Button type="primary" 
                  disabled={current===0}
                  onClick={() => prev()}
                  style={{
                    marginRight:"10px"
                  }}>
            PREV
          </Button>
          <Button type="primary"
                  disabled={current===2} 
                  onClick={() => next()}>
              NEXT
          </Button>
        </div>
        <div>
          {
            current===2 && 
            <span>
              <Button type="primary"   
                  style={{
                    marginRight:"10px"
                  }}
                  onClick={()=>handleSave(0)}
              >Save Draft</Button>
              <Button danger onClick={() => handleSave(1)}>Submit for Review</Button>
            </span>
          }
        </div>
      </div>
    </div>
  )
}

export default  NewsAdd