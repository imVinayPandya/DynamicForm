import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Form, Input, Button, Select, Modal, Tooltip } from 'antd';
import { addNewForm } from '../../utils/api';
const { Option } = Select;
const { TextArea } = Input;

const FormModal = (props) => {
  const { showModal, onCloseModal } = props;
  const [form] = Form.useForm();
  const [addQuestionLoading, setAddQuestionLoading] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const disptach = useDispatch();

  const onFieldTypeChange = (value) => {
    // console.log('onFieldTypeChange');
    if (value !== 'text') {
      setShowTextArea(true);
    } else {
      setShowTextArea(false);
    }
  };

  const handleOk = async (value) => {
    setAddQuestionLoading(true);
    let hasError = false;
    // trigger form validate manually, because we are using form in modal
    const formFields = await form.validateFields().catch((errors) => {
      setAddQuestionLoading(false);
      return errors.errorFields;
    });

    // if formFields is array then check for errors
    if (Array.isArray(formFields)) {
      hasError = formFields.some((field) => {
        if (field && field.errors && field.errors.length > 0) {
          return true;
        }
        return false;
      });
    }
    // if modal form does not have any errors then close modal for successful operation
    if (!hasError) {
      onCloseModal();
    }

    const formData = await addNewForm(props.formName, form.getFieldsValue());
    // dispatch add new form
    disptach({
      type: 'ADD_NEW_FORM',
      payload: formData,
    });
    setAddQuestionLoading(false);
    form.resetFields();
    setShowTextArea(false);
  };

  const handleCancel = (value) => {
    // console.log('On cancel');
    onCloseModal();
    form.resetFields();
    setShowTextArea(false);
  };

  return (
    <Modal
      title="Vertically centered modal dialog"
      centered
      visible={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={addQuestionLoading}
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
    >
      <Form name="add-question" form={form}>
        <Form.Item
          name="question"
          label="Quetion"
          rules={[
            {
              required: true,
              message: 'Question is required',
            },
          ]}
        >
          <Input placeholder="Enter a question" />
        </Form.Item>
        <Form.Item
          name="answerType"
          label="Answer Type"
          rules={[
            {
              required: true,
              message: 'Please select any one Message Type',
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={onFieldTypeChange}
            allowClear
          >
            <Option value="text">Text</Option>
            <Option value="checkbox">Multichoice Checkbox</Option>
            <Option value="radio">Single Select Radio Button</Option>
          </Select>
        </Form.Item>
        {showTextArea && (
          <Fragment>
            <Form.Item
              name="answers"
              label="Answers"
              rules={[
                {
                  required: true,
                  message: 'Answers are required',
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Tooltip title="Add multiple answers seperated by new line">
              <a href="#API" style={{ margin: '0 8px' }}>
                Need Help?
              </a>
            </Tooltip>
          </Fragment>
        )}
      </Form>
    </Modal>
  );
};

export default FormModal;
