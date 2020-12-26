import React, { Fragment, useState } from 'react';
import { Form, Input, Button } from 'antd';
import FormModal from './FormModal';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 5,
    span: 8,
  },
};

const AddNewForm = () => {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);

  const onFormFinish = (values) => {
    // console.log('onFormFinish');
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      <Form {...layout} form={form} name="add-form" onFinish={onFormFinish}>
        <Form.Item
          name="formName"
          label="Form Name"
          rules={[
            {
              required: true,
              message: 'Form name is required',
            },
          ]}
        >
          <Input placeholder="Enter a form name" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Add Question
          </Button>
        </Form.Item>
        <FormModal
          showModal={showModal}
          onCloseModal={onCloseModal}
          formName={form.getFieldValue('formName')}
        />
      </Form>
    </Fragment>
  );
};

export default AddNewForm;
