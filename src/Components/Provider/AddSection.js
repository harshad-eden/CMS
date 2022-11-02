import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input } from "antd";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { firestore } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const AddSection = ({ data, setCreateSection, createSection }) => {
  const providersCollections = collection(firestore, "providerFAQ");
  const onFinish = (values) => {
    console.log("Received values of form:", values);
    let updatedValue = {
      sectionTitle: createSection,
      ...values,
      createdAt: serverTimestamp(),
    };
    try {
      addDoc(providersCollections, updatedValue);
      setCreateSection(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onClick={() => setCreateSection(false)}
        className="flex gap-2 items-center mb-6 cursor-pointer "
      >
        <BsFillArrowLeftCircleFill size={18} />
        <h2 className="mb-0">Provider</h2>
      </div>

      <div className="flex flex-col mx-auto w-10/12 relative">
        <h2>Add Information to {createSection}</h2>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          className="w-full relative"
          autoComplete="off"
          initialValues={{
            questions: [
              {
                question: "",
                answers: [
                  {
                    type: "text",
                    answer: "",
                  },
                ],
              },
            ],
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
                              {answers.map((answers, questionIndex) => (
                                <div className="flex gap-2 items-center mb-1">
                                  <Form.Item
                                    className="list w-full "
                                    {...answers}
                                    name={[answers.name, "answer"]}
                                    fieldKey={[answers.key, "answer"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing answer",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Answer" />
                                  </Form.Item>

                                  <MinusCircleOutlined
                                    onClick={() => {
                                      remove(answers.name);
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
                  <div className="flex gap-3 float-right !mt-6 ">
                    <Form.Item>
                      <Button
                        onClick={() => setCreateSection(false)}
                        shape="round"
                      >
                        Cancel
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button shape="round" type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              );
            }}
          </Form.List>
        </Form>
      </div>
    </>
  );
};

export default AddSection;
