import { Button, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import '../styles/CodeSubmitForm.css';

const CodeSubmitForm = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 4,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: {
            span: 4,
            offset: 4,
          },
        }
      : null;
  return (
    <div className='code-submit-form-parent'>
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{
        layout: formLayout,
      }}
      onValuesChange={onFormLayoutChange}
    >
      <Form.Item label="Problem Name">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Problem Link">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Solution Link">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default CodeSubmitForm;