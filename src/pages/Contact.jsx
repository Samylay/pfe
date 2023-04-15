import { Form, Input, Button } from "antd";
import { MdMailOutline } from "react-icons/md";
import { TiUserOutline } from "react-icons/ti";
import HomeNav from "../components/HomeNav";

function Contact() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
      <>
          <HomeNav />
              <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-4">Contactez nous !</h1>
          <div className="w-1/2">
            <Form
              name="contact-form"
              onFinish={onFinish}
              layout="vertical"
              initialValues={{ remember: true }}
            >
              <Form.Item
                label="Nom"
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input prefix={<TiUserOutline />} placeholder="Name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input prefix={<MdMailOutline />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: "Please enter your message!" }]}
              >
                <Input.TextArea placeholder="Message" />
              </Form.Item>
              <Form.Item>
                <Button
                  type=""
                  htmlType="submit"
                  className="text-red-500 outline outline-red-500 hover:text-white hover:bg-red-600"
                >
                  Envoyer
                </Button>
              </Form.Item>
            </Form>
          </div>
              </div>
      </>
  );
}

export default Contact;
