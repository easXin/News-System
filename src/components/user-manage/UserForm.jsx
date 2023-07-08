import { Form, Input, Select } from "antd";
import { forwardRef } from "react";

// ref
const UserForm = forwardRef((props,ref) => {

  const {region,roleLst} = props
  return (
    <Form
        ref={ref}
        layout="vertical"
    >
        <Form.Item name="username" label="username" 
            rules={[{required:true, message:'Please enter username'}]}
        >
            <Input type="text" />
        </Form.Item>

        <Form.Item name="password" label="password" 
            rules={[{required:true, message:'Please enter password'}]}
        >
            <Input type="password" />
        </Form.Item>
        <Form.Item name="region" label="region"
             rules={[{required:true, message:'Please select region'}]}
        >
            <Select>
            {region.map(val => 
                <Select.Option value={val.value} key={val.id}>{val.value}</Select.Option>
                )}
            </Select>
        </Form.Item>
        <Form.Item name="role" label="role"
            rules={[{required:true, message:'Please select role'}]}
        >
            <Select>
            {roleLst.map(val=>
                <Select.Option value={val.roleName} key={val.id}>{val.roleName}</Select.Option>
            )}
            
            </Select>
        </Form.Item>
    </Form>
  )
})

export default UserForm;