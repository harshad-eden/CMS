import Layout from "../Layout";
import { useEffect, useState } from "react";
import FormSection from "./FormSection";
import SideBar from "./SideBar";
import { Form } from "antd";

import { data } from "../../claim";
import ListFAQ from "./ListFaq";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";

const Employer = () => {
  const [form] = Form.useForm();
  const [providerFaq, setProviderFaq] = useState([]);
  const [createSection, setCreateSection] = useState();
  const [editContent, setEditContent] = useState();

  // const providerCollections = collection(firestore, "providerFAQ");

  // useEffect(() => {
  //   const getOrders = async () => {
  //     const data = await getDocs(providerCollections);
  //     let sections = [];
  //     data.docs.forEach((doc) => {
  //       sections.push({ ...doc.data(), id: doc.id });
  //     });
  //     setProviderFaq(sections);
  //   };

  //   getOrders();
  // }, []);

  console.log("createSection", createSection);

  return (
    <Layout>
      <div className="flex mx-auto justify-between w-10/12 h-screen  ">
        <div className="w-8/12 h-fit p-4 rounded 	 ">
          {editContent ? (
            <FormSection
              form={form}
              data={editContent}
              setEditContent={setEditContent}
              createSection={createSection}
              setCreateSection={setCreateSection}
            />
          ) : (
            <ListFAQ setEditContent={setEditContent} />
          )}
        </div>

        <SideBar
          editContent={editContent}
          setEditContent={setEditContent}
          setCreateSection={setCreateSection}
        />
      </div>
    </Layout>
  );
};
export default Employer;
