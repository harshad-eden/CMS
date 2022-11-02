import { Button, Divider, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  EditFilled,
  DeleteFilled,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

import { firestore } from "../../firebase";
// import { data } from "../../claimNew";

const ListFAQ = ({ setEditContent, setNewQuestion }) => {
  const [editStyle, setEditStyle] = useState("none");

  const [employerFaq, setEmployerFaq] = useState([]);

  const employerCollections = collection(firestore, "employerFAQ");

  useEffect(() => {
    const getOrders = async () => {
      const data = await getDocs(
        employerCollections,
        orderBy("createdAt", "desc")
      );
      let sections = [];
      data.docs.forEach((doc) => {
        sections.push({ ...doc.data(), id: doc.id });
      });
      setEmployerFaq(sections?.sort((a, b) => a.createdAt - b.createdAt));
    };

    getOrders();
  }, []);

  const deleteConfirm = (item) => {
    Modal.confirm({
      title: "Deletion Confirmation?",
      icon: <ExclamationCircleOutlined />,
      cancelText: "Cancel",
      content: `Are you sure you want to delete ${item.sectionTitle}`,
      okType: "danger",
      okText: "Delete",
      okButtonProps: {
        type: "primary",
      },
      onOk: () => handleDelete(item.id),
    });
  };

  const handleDelete = (id) => {
    try {
      let docRef = doc(firestore, "providerFAQ", id);
      deleteDoc(docRef).then(() => {
        setEmployerFaq(employerFaq.filter((item) => item.id !== id));
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const handleAddData = () => {
  //   try {
  //     addDoc(employerCollections, {
  //       ...data[0],
  //       createdAt: serverTimestamp(),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <h2 className=" text-lg">Employer FAQ</h2>
      {/* <Button onClick={handleAddData}>Add</Button> */}
      <Button
        type="primary"
        shape="round"
        className=" mb-8 mt-3"
        onClick={() => setNewQuestion(true)}
        icon={<PlusCircleOutlined />}
      >
        Add Question
      </Button>
      {employerFaq?.map((listItem) => (
        <div
          key={listItem.id}
          className="relative"
          onMouseEnter={(e) => {
            setEditStyle("flex");
          }}
          onMouseLeave={(e) => {
            setEditStyle("none");
          }}
        >
          <div
            style={{
              display: editStyle,
              position: "absolute",
              top: 10,
              right: 10,
              gap: 10,
            }}
          >
            <EditFilled onClick={() => setEditContent(listItem)} />
            <DeleteFilled onClick={() => deleteConfirm(listItem)} />
          </div>
          <div className="bg-slate-100 mb-5 p-3 rounded  ">
            {listItem?.question}
            {listItem?.answers?.map((answerItem, newIndex) => (
              <li key={newIndex} className="ml-4">
                {answerItem.answer}
              </li>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListFAQ;
