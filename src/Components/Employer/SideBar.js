import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

const SideBar = ({ setCreateCollection, editContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = ({ sectionTitle }) => {
    if (sectionTitle.trim().length > 2) {
      setCreateCollection(sectionTitle);
      setIsModalOpen(false);
    } else {
      setCreateCollection();
    }
  };

  return (
    <>
      <div
        className="flex flex-col w-3/12 bg-slate-100 p-4 rounded gap-6 "
        style={{ height: 200 }}
      >
        <div className="flex gap-2">
          <Button
            onClick={() => setIsModalOpen(true)}
            shape="round"
            type="dashed"
            className="w-8/12"
          >
            Add Section
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            shape="round"
            type="dashed"
            className="w-8/12"
          >
            Edit
          </Button>
        </div>
        <Button
          disabled={editContent ? false : true}
          type="primary"
          shape="round"
        >
          Publish
        </Button>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        okText="Create"
        onOk={() => form.submit()}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="sectionTitle"
            rules={[
              {
                required: true,
                message: "Minimum 3 letters required!",
                min: 3,
              },
            ]}
          >
            <Input placeholder="Section Title" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SideBar;
