import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input } from "antd";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const FormSection = ({ data, form }) => {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <>
      <div className="flex gap-2 items-center mb-6 ">
        <BsFillArrowLeftCircleFill size={18} />
        <h2 className="mb-0">Employer</h2>
      </div>
      <div className="flex mx-auto w-10/12 relative">
        <Form
          form={form}
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          className="w-full relative"
          autoComplete="off"
          initialValues={{
            sections: data,
          }}
        >
          <Form.List name="sections">
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
