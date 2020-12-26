import React, { Fragment } from 'react';
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
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

const ViewForm = () => {
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
            <Radio value={v}>{v.toUpperCase()}</Radio>
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
            <Checkbox value={v}>{v.toUpperCase()}</Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    );
  };

  const renderForm = ([formDetails]) => {
    const submitForm = (value) => {
      console.log('Form submitted', value);
    };

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

  const form = useSelector((state) =>
    renderForm(state.filter((form) => form.id === formId))
  );

  return form;
};

export default ViewForm;
