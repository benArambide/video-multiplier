import React, { useState } from 'react';
import {Button, Modal, Form, Input} from 'antd';

const MenuButton = ({ onVideoAdded = () => {} }) => {
  const [isVisible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => { setVisible(false); };
  const onFinish = ({ embeddedVideoSrc }) => {
    onVideoAdded({
      src: embeddedVideoSrc
    });
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
        Add Video
      </Button>
      <Modal
        title="Add video"
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={true}
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
          closeable={true}
        >
          <Form.Item
            label="Embedded Video Url"
            name="embeddedVideoSrc"
            rules={[{ required: true, message: 'The field is required' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuButton;
