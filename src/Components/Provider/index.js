import Layout from "../Layout";
import { useEffect, useState } from "react";
import FormSection from "./FormSection";
import SideBar from "./SideBar";
import { Form } from "antd";

import { data } from "../../claim";
import ListFAQ from "./ListFaq";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import AddSection from "./AddSection";

const Employer = () => {
  const [form] = Form.useForm();
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

  return (
    <Layout>
      <>
        <div className="flex mx-auto gap-8 w-10/12 min-h-screen  ">
          <div className="w-8/12 h-fit p-4 rounded 	 ">
            {editContent ? (
              <FormSection
                form={form}
                data={editContent}
                setEditContent={setEditContent}
                createSection={createSection}
                setCreateSection={setCreateSection}
              />
            ) : createSection ? (
              <AddSection
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
      </>
    </Layout>
  );
};
export default Employer;
