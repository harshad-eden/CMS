import { Button, Divider, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { data } from "../../provider";
import {
  EditFilled,
  DeleteFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Loader from "../Common/Loader";

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

const ListFAQ = ({ setEditContent }) => {
  const [editStyle, setEditStyle] = useState("none");
  const [providerFaq, setProviderFaq] = useState([]);
  const [detectChanges, setDetectChanges] = useState("");

  const providerCollections = collection(firestore, "providerFAQ");

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
        setProviderFaq(providerFaq.filter((item) => item.id !== id));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      const data = await getDocs(
        providerCollections,
        orderBy("createdAt", "desc")
      );
      let sections = [];
      data.docs.forEach((doc) => {
        sections.push({ ...doc.data(), id: doc.id });
      });
      setProviderFaq(sections?.sort((a, b) => a.createdAt - b.createdAt));
    };

    getOrders();
  }, [detectChanges]);

  return (
    <div>
      {/* <Button onClick={handleAddData}>Add</Button> */}
      {providerFaq.length > 0 ? (
        providerFaq?.map((listItem) => (
          <div
            key={listItem.id}
            className="bg-slate-100  mb-5 p-3 rounded relative"
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
            <h2 className="text-xl">{listItem.sectionTitle}</h2>
            <div className="">
              {listItem?.questions.map((item, index) => {
                return (
                  <div key={index} className="">
                    {item?.question}
                    {item.answers.map((answerItem, newIndex) => (
                      <li key={newIndex} className="ml-4">
                        {answerItem.answer}
                      </li>
                    ))}
                    <Divider />
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ListFAQ;
