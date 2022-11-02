import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input } from "antd";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { firestore } from "../../firebase";
import {
  updateDoc,
  doc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

const FormSection = ({ data, form, setEditContent }) => {
  const employerCollections = collection(firestore, "employerFAQ");

  const onFinish = (values) => {
    try {
      addDoc(employerCollections, {
        ...data[0],
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
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
            question: "",
            answers: [
              {
                type: "text",
                answer: "",
              },
            ],
          }}
        >
          <div>
            <Form.Item
              className="list w-full "
              name="question"
              rules={[
                {
                  required: true,
                  message: "Missing question",
                },
              ]}
            >
              <Input size="large" placeholder="Question" />
            </Form.Item>
          </div>
          <Form.List name={"answers"}>
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
          <div className="flex gap-3 float-right !mt-6 ">
            <Form.Item>
              <Button onClick={() => setEditContent(false)} shape="round">
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button shape="round" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default FormSection;
