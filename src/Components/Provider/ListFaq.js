import { Button, Divider } from "antd";
import React, { useEffect, useState } from "react";
// import { data } from "../../provider";
import { EditFilled } from "@ant-design/icons";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";

const ListFAQ = ({ setEditContent }) => {
  const [editStyle, setEditStyle] = useState("none");
  const providersCollectionref = collection(firestore, "providerFAQ");
  const [providerFaq, setProviderFaq] = useState([]);

  const handleAddData = () => {
    try {
      // data.map((item) => addDoc(providersCollectionref, item));
      // addDoc(providersCollectionref, data[3]);
    } catch (error) {
      console.log(error);
    }
  };

  const providerCollections = collection(firestore, "providerFAQ");

  useEffect(() => {
    const getOrders = async () => {
      const data = await getDocs(providerCollections);
      let sections = [];
      data.docs.forEach((doc) => {
        sections.push({ ...doc.data(), id: doc.id });
      });
      setProviderFaq(sections.reverse());
    };

    getOrders();
  }, []);

  return (
    <div>
      {/* <Button onClick={handleAddData}>Add</Button> */}
      {providerFaq?.map((listItem) => (
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
            onClick={() => setEditContent(listItem)}
            style={{
              display: editStyle,
              position: "absolute",
              top: 10,
              right: 10,
            }}
          >
            <EditFilled />
          </div>
          <h2>{listItem.sectionTitle}</h2>
          <div className="">
            {listItem?.questions.map((item, index) => {
              return (
                <div key={index} className="">
                  {item?.question}
                  {item.answers.map((answerItem, newIndex) => (
                    <div key={newIndex} className="ml-4">
                      {answerItem.answer}
                    </div>
                  ))}
                  <Divider />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListFAQ;
