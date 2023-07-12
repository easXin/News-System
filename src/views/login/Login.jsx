 import { Button, Form, Input, message } from 'antd';
import './css/Login.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
//import Particles from "react-tsparticles";
import axios from 'axios'

 function Login(props) {
    const onFinish = (values) => {
        // collecting data
        console.log('Success:', values);
        //let{username,password} = values
        axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res=>{
            //console.error(res.data)
            if(res.data.length===0){
                message.error("Username or password doesn't match")
            }else{
                //console.log("--->",res.data[0])
                localStorage.setItem("token",JSON.stringify(res.data[0]))
                props.history.push("/")
                //console.log("xx")
            }
        })
      };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };  
  return (
    <div className="login-page">
        {/* <Particles/> */}
        <div className="form-container">
            <div className="login-title">Permission Management System</div>
            <Form
                name="normal_login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message:'Please enter username'
                        },
                    ]}
                >
                      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    
                    rules={[
                        {
                            required: true,
                            message: 'Please enter password',
                        },
                ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    // wrapperCol={{
                    //     offset: 8,
                    //     span: 16,
                    // }}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
  )
}

export default Login;