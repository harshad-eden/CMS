import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Select } from "antd";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { firestore } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";

const FormSection = ({ data, form, setEditContent }) => {
  const onFinish = (values) => {
    // console.log("Received values of form:", values);

    // console.log(listItem.id);

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

    console.log(values);
  };

  const { Option } = Select;

  return (
    <>
      <div
        onClick={() => setEditContent(false)}
        className="flex gap-2 items-center mb-6 cursor-pointer "
      >
        <BsFillArrowLeftCircleFill size={18} />
        <h2 className="mb-0">Provider</h2>
      </div>
      <div className="flex mx-auto w-10/12 relative">
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
                                <div className="flex gap-2 items-center mb-1">
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

                                  {/* <Form.Item
                                    className="list  "
                                    {...answer}
                                    name={[answer.name, "url"]}
                                    fieldKey={[answer.key, "url"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing url",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Answer" />
                                  </Form.Item> */}

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
    </>
  );
};

export default FormSection;
