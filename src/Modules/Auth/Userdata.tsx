import { Form, Input, Button, Layout, Row, Col } from "antd";

export interface LoginData {
  Email: string;
  Password: string;
}

interface DataProps {
  action: string;
  SubmitHandler: (v: LoginData) => void;
  show?: boolean;
}

function Userdata(props: DataProps) {
  const onFinish = (values: LoginData) => {
    console.log(props.action);
    props.SubmitHandler(values);
  };
  const emailValidator = (rule: any, value: any, callback: any) => {
    if (value && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      callback("Please enter a valid email address!");
    } else {
      callback();
    }
  };

  const passwordValidator = (rule: any, value: any, callback: any) => {
    if (value.length < 8) {
      callback("Password must be at least 8 characters ");
    } else {
      callback();
    }
  };

  return (
    <Layout>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col span={12} style={{ width: "50%" }}>
          <Form name="login-form" onFinish={onFinish}>
            <Form.Item
              name="Email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { validator: emailValidator, validateTrigger: "blur" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
                { validator: passwordValidator },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {props.action}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}

export default Userdata;
