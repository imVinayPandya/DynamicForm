import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const FormList = () => {
  const getData = (forms) => {
    if (forms.length === 0) return [];
    return forms.map((form) => ({
      key: form.id,
      id: form.id,
      name: form.formName,
      createdAt: form.createdAt,
    }));
  };
  const tableData = useSelector((state) => getData(state));

  const columns = [
    {
      title: 'Form Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
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
