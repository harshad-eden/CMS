import Layout from "../Layout";
import { useState } from "react";
import FormSection from "./FormSection";
import AddQuestion from "./AddQuestion";
import { Form } from "antd";

import { data } from "../../claimNew";
import ListFAQ from "./ListFaq";

const Employer = () => {
  const [form] = Form.useForm();
  const [newQuestion, setNewQuestion] = useState(false);
  const [editContent, setEditContent] = useState(false);

  // <Empty />

  console.log(editContent);

  return (
    <Layout>
      <div className="flex mx-auto justify-between w-10/12 h-screen  ">
        <div className="w-8/12 h-fit p-4 rounded mx-auto	 ">
          {editContent ? (
            <FormSection
              form={form}
              data={editContent}
              setEditContent={setEditContent}
            />
          ) : newQuestion ? (
            <AddQuestion
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
            />
          ) : (
            <ListFAQ
              setNewQuestion={setNewQuestion}
              setEditContent={setEditContent}
            />
          )}
        </div>

        {/* <SideBar
          editContent={editContent}
          setEditContent={setEditContent}
          setCreateCollection={setCreateCollection}
        /> */}
      </div>
    </Layout>
  );
};
export default Employer;
