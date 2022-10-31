import { Button, Divider } from "antd";
import React, { useState } from "react";
// import { data } from "../../provider";
import { EditFilled } from "@ant-design/icons";

import { collection, addDoc } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";

import { data } from "../../claim";

const ListFAQ = ({ setEditContent }) => {
  const [editStyle, setEditStyle] = useState("none");
  const employerCollections = collection(firestore, "employerFAQ");

  const handleAddData = () => {
    try {
      data.map((item) => addDoc(employerCollections, item));
      // update
      // let docRef = doc(firestore, 'providers', docId);
      // updateDoc(docRef, updatedValue)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      ListFAQ
      {data?.map((listItem) => (
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
            onClick={() => setEditContent(listItem)}
            style={{
              display: editStyle,
              position: "absolute",
              top: 5,
              right: 5,
            }}
          >
            <EditFilled />
          </div>
          <div className="bg-slate-100 mb-5 p-3 rounded  ">
            {listItem?.question}
            {listItem.answers.map((answerItem, newIndex) => (
              <div key={newIndex} className="ml-4">
                {answerItem.answer}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListFAQ;
