import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Form, Input, Button, Select, Modal, Tooltip } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const FormModal = (props) => {
  const { showModal, onCloseModal } = props;
  const [form] = Form.useForm();
  const [addQuestionLoading, setAddQuestionLoading] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const handleAddNewForm = useDispatch();

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
    const formValues = await form.validateFields().catch((errors) => {
      setAddQuestionLoading(false);
      return errors.errorFields;
    });

    // if formValues is array then check for errors
    if (Array.isArray(formValues)) {
      hasError = formValues.some((field) => {
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

    // dispatch add new form
    handleAddNewForm({
      type: 'ADD_NEW_FORM',
      payload: {
        id: uuidv4(),
        formName: props.formName,
        formValues: form.getFieldsValue(),
        createdAt: new Date().toISOString(),
      },
    });
    setAddQuestionLoading(false);
  };

  const handleCancel = (value) => {
    // console.log('On cancel');
    onCloseModal();
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
