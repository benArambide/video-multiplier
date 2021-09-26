import React, { useState, useEffect } from 'react';
import {Button, Modal, Form, Select} from 'antd';
import {map} from "ramda";

const columns = [2, 3, 4, 5, 6];

const MenuGridButton = ({ onChangedGrid = () => {} }) => {
  const [isVisible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({});
  }, [form]);

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => { setVisible(false); };
  const onFinish = ({columns}) => {
    onChangedGrid(columns);
    setVisible(false);
    form.resetFields();
  };

  const loading = false;

  return (
    <div className={'inline-block'}>
      <Button
        type="primary" shape="round" size={'small'}
        onClick={() => setVisible(true)}
      >
        Change Columns
      </Button>
      <Modal
        title="Add video"
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closeable={true}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form
          layout={'vertical'}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Columns"
            name="columns"
            rules={[{ required: true, message: 'The field is required' }]}
          >
            <Select>
              {
                map(col => (
                  <Select.Option value={col} key={col}>{`${col} columns`}</Select.Option>
                ), columns)
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuGridButton;
