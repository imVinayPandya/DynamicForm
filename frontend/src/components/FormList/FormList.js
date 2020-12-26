import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { getForms } from '../../utils/api';
const FormList = () => {
  const disptach = useDispatch();

  const getAllForms = async () => {
    // get all forms from DB
    let allForms = await getForms();
    // dispatch all forms to redux store
    disptach({
      type: 'ALL_FORMS',
      payload: allForms,
    });
  };

  useEffect(() => {
    getAllForms();
  }, []);

  const getData = (forms) => {
    if (forms.length === 0) return [];
    return forms.map((form) => ({
      key: form.id,
      ...form,
    }));
  };
  const tableData = useSelector((state) => getData(state));

  const columns = [
    {
      title: 'Form Name',
      dataIndex: 'formName',
      key: 'formName',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Form Type',
      dataIndex: 'formFields',
      key: 'formFields',
      render: ({ answerType }) => answerType,
    },
    {
      title: 'Response Count',
      dataIndex: 'formResponses',
      key: 'formResponses',
      render: ({ totalCount }) => totalCount,
    },
    {
      title: 'Preview',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <Link to={`/${id}`}>View</Link>,
    },
  ];

  return (
    <Fragment>
      <Table columns={columns} dataSource={tableData} pagination={false} />
    </Fragment>
  );
};

export default FormList;
