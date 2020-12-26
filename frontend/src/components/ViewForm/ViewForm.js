import React, { Fragment, useEffect, useState } from 'react';
import {
  Form,
  Button,
  Input,
  Radio,
  Checkbox,
  Divider,
  Typography,
  Space,
} from 'antd';
import { useParams } from 'react-router-dom';
import { Link, withRouter } from 'react-router-dom';

import { getFormById, addFormResponse } from '../../utils/api';

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

const ViewForm = (props) => {
  const [formDetails, setFormDetails] = useState({});
  const [dynamicForm] = Form.useForm();
  const { formId } = useParams();
  // render text field
  const renderTextField = (label) => {
    return (
      <Form.Item
        name="textField"
        label={label}
        rules={[
          {
            required: true,
            message: 'Field is required',
          },
        ]}
      >
        <Input placeholder="Enter a value" />
      </Form.Item>
    );
  };

  // render radio button field
  const renderRadioField = (label, value) => {
    const values = value.split('\n');
    return (
      <Form.Item
        name="radioField"
        label={label}
        rules={[
          {
            required: true,
            message: 'Field is required',
          },
        ]}
      >
        <Radio.Group onChange={() => {}} value={0}>
          {values.map((v) => (
            <Radio key={v} value={v}>
              {v.toUpperCase()}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    );
  };

  // render checkbox field
  const renderCheckboxField = (label, value) => {
    const values = value.split('\n');
    return (
      <Form.Item
        name="checkboxField"
        label={label}
        rules={[
          {
            required: true,
            message: 'Field is required',
          },
        ]}
      >
        <Checkbox.Group onChange={() => {}} value={0}>
          {values.map((v) => (
            <Checkbox key={v} value={v}>
              {v.toUpperCase()}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    );
  };

  const submitForm = async (value) => {
    console.log('Form submitted', value);
    await addFormResponse(formId, value);
    dynamicForm.resetFields();
    props.history.goBack();
  };

  const getFormDetails = async () => {
    const formDetails = await getFormById(formId);
    setFormDetails(formDetails);
  };

  useEffect(() => {
    getFormDetails();
  }, []);

  return (
    <Fragment>
      {formDetails.formName && (
        <Typography.Title>{formDetails.formName}</Typography.Title>
      )}
      <Divider />
      <Form
        {...layout}
        form={dynamicForm}
        name="dynamic-form"
        onFinish={submitForm}
      >
        {formDetails &&
          formDetails.formFields &&
          formDetails.formFields.answerType === 'text' &&
          renderTextField(formDetails.formFields.question)}
        {formDetails &&
          formDetails.formFields &&
          formDetails.formFields.answerType === 'radio' &&
          renderRadioField(
            formDetails.formFields.question,
            formDetails.formFields.answers
          )}
        {formDetails &&
          formDetails.formFields &&
          formDetails.formFields.answerType === 'checkbox' &&
          renderCheckboxField(
            formDetails.formFields.question,
            formDetails.formFields.answers
          )}
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit Form
            </Button>
            <Link to="/">Go back</Link>
          </Space>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default withRouter(ViewForm);
