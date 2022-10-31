import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

const SideBar = ({ setCreateSection, editContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = ({ sectionTitle }) => {
    if (sectionTitle.trim().length > 2) {
      setCreateSection(sectionTitle);
      setIsModalOpen(false);
    } else {
      setCreateSection();
    }
  };

  return (
    <>
      <div
        className="flex flex-col w-3/12 bg-slate-100 p-6 rounded-xl gap-4 mt-3"
        style={{ height: 150 }}
      >
        <Button
          onClick={() => setIsModalOpen(true)}
          shape="round"
          type="dashed"
        >
          Add Section
        </Button>
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
