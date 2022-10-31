import Layout from "../Layout";
import { useState } from "react";
import FormSection from "./FormSection";
import SideBar from "./SideBar";
import { Form } from "antd";

import { data } from "../../claim";
import ListFAQ from "./ListFaq";

const Employer = () => {
  const [form] = Form.useForm();
  const [createCollectionValue, setCreateCollection] = useState();
  const [editContent, setEditContent] = useState(false);

  // <Empty />

  return (
    <Layout>
      <div className="flex mx-auto justify-between w-10/12 h-screen  ">
        <div className="w-8/12 h-fit p-4 rounded 	 ">
          {/* <FormSection form={form} data={data} /> */}
          <ListFAQ />
        </div>

        <SideBar
          editContent={editContent}
          setEditContent={setEditContent}
          setCreateCollection={setCreateCollection}
        />
      </div>
    </Layout>
  );
};
export default Employer;
