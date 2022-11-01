import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Select } from "antd";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { firestore } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useRef, useState } from "react";

const { Option } = Select;

const FormSection = ({ data, form, setEditContent }) => {
  const onFinish = (values) => {
    let updatedValue = {
      sectionTitle: data.sectionTitle,
      ...values,
    };

    try {
      let docRef = doc(firestore, "providerFAQ", data.id);
      updateDoc(docRef, updatedValue);
      setEditContent(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleAddData = () => {
  //   try {
  //     addDoc(providerCollections, {
  //       ...data[3],
  //       createdAt: serverTimestamp(),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log("whee", data.questions[0].answers[3].answer);

  return (
    <div className="pb-24">
      <div
        onClick={() => setEditContent(false)}
        className="flex gap-2 items-center cursor-pointer"
      >
        <BsFillArrowLeftCircleFill size={18} />
        <h2 className="mb-0">Provider</h2>
      </div>
      <div className="flex flex-col mx-auto w-10/12 relative">
        <h2 className="mt-3 text-lg">Edit {data?.sectionTitle}</h2>
        <Form
          form={form}
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          className="w-full relative"
          autoComplete="off"
          initialValues={{
            questions: data.questions,
          }}
        >
          <Form.List name="questions">
            {(fields, { add, remove }) => {
              return (
                <div className="w-full h-full">
                  <div>
                    <Button
                      type="primary"
                      shape="round"
                      className=" mb-8 mt-3"
                      icon={<PlusCircleOutlined />}
                      onClick={() => {
                        add();
                        window.scroll({
                          top: document.body.offsetHeight,
                          left: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      Add Question
                    </Button>
                  </div>
                  {fields.map((field, index) => (
                    <div key={index}>
                      <div className="flex gap-2 items-center">
                        <Form.Item
                          className="list w-full "
                          {...field}
                          name={[field.name, "question"]}
                          fieldKey={[field.key, "question"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing Question",
                            },
                          ]}
                        >
                          <Input size="large" placeholder="Question" />
                        </Form.Item>

                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </div>

                      <Form.List name={[field.name, "answers"]}>
                        {(answers, { add, remove }) => {
                          return (
                            <div>
                              <Button
                                type="dashed"
                                shape="round"
                                size="small"
                                className=" mb-1 mt-3"
                                icon={<PlusCircleOutlined />}
                                onClick={() => add()}
                              >
                                Add Answers
                              </Button>
                              {answers.map((answer, questionIndex) => (
                                <div
                                  key={questionIndex}
                                  className="flex gap-2 items-center mb-1"
                                >
                                  <Form.Item
                                    className="list w-full "
                                    {...answer}
                                    name={[answer.name, "answer"]}
                                    fieldKey={[answer.key, "answer"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing answer",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Answer" />
                                  </Form.Item>

                                  <Form.Item
                                    className="list "
                                    {...answer}
                                    name={[answer.name, "type"]}
                                    fieldKey={[answer.key, "type"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing type",
                                      },
                                    ]}
                                  >
                                    <Select
                                      style={{
                                        width: 120,
                                      }}
                                    >
                                      <Option value="text">text</Option>
                                      <Option value="<a>">{"<a>"}</Option>
                                      <Option value="button">button</Option>
                                      <Option value="link">link</Option>
                                    </Select>
                                  </Form.Item>

                                  <Form.Item
                                    className="list  "
                                    {...answer}
                                    name={[answer.name, "url"]}
                                    fieldKey={[answer.key, "url"]}
                                  >
                                    <Input placeholder="slug" />
                                  </Form.Item>

                                  <MinusCircleOutlined
                                    onClick={() => {
                                      remove(answer.name);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          );
                        }}
                      </Form.List>
                      <Divider />
                    </div>
                  ))}
                  <Form.Item className="float-right !mt-6 ">
                    <Button shape="round" type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Form>
      </div>
    </div>
  );
};

export default FormSection;
