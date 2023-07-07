import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { Space, Typography } from 'antd';
const { Text } = Typography;
const { Option } = Select;
import './styles/challenges.css';
import { ControlOutlined, ReadFilled } from '@ant-design/icons'
import { Card, List } from 'antd';
import MDEditor from "@uiw/react-md-editor";
interface IValues {
  title: string;
  description: string;
  modifier: string;
}

interface ICollectionCreateFormProps {
  open: boolean;
  onCreate: (values: IValues) => void;
  onCancel: () => void;
}


const CollectionCreateForm: React.FC<ICollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const [value, setValue] = React.useState("**Hello world!!!**");
 

  const validateInputBasedOnOption = (_: any, value: any, callback:any) => {
    const selectedOption = form.getFieldValue('inputType',);

    if (selectedOption === 'integer' && (!value || !Number.isInteger(Number(value)))) {
      callback('Please enter a valid integer');
    } 
    else if (selectedOption === 'string' && (!value || typeof value !== 'string')) {
      callback('Please enter a valid string');
    } 
    else if (selectedOption === 'array of integers') {
      try {
        const parsedValue = JSON.parse(value);

        if (!Array.isArray(parsedValue) || !parsedValue.every((item) => Number.isInteger(Number(item)))) {
          callback('Input should be an array of integers');
        }
      } catch (error) {
        callback('Invalid input format');
      }
    } 
    else if (selectedOption === 'array of strings') {
      try {
        const parsedValue = JSON.parse(value);

        if (!Array.isArray(parsedValue) || !parsedValue.every((item) => typeof item === 'string')) {
          callback('Output should be an array of strings');
        }
      } catch (error) {
        callback('Invalid output format');
      }
    }

    callback();
  };
  const validateOutputBasedOnOption = (_: any, value: any, callback: any) => {
    const selectedOption = form.getFieldValue('outputType',);

    if (selectedOption === 'integer' && (!value || !Number.isInteger(Number(value)))) {
      callback('Please enter a valid integer');
    } else if (selectedOption === 'string' && (!value || typeof value !== 'string')) {
      callback('Please enter a valid string');
    } else if (selectedOption === 'array of integers') {
      try {
        const parsedValue = JSON.parse(value);

        if (!Array.isArray(parsedValue) || !parsedValue.every((item) => Number.isInteger(Number(item)))) {
          callback('Input should be an array of integers');
        }
      } catch (error) {
        callback('Invalid input format');
      }
    } else if (selectedOption === 'array of strings') {
      try {
        const parsedValue = JSON.parse(value);

        if (!Array.isArray(parsedValue) || !parsedValue.every((item) => typeof item === 'string')) {
          callback('Output should be an array of strings');
        }
      } catch (error) {
        callback('Invalid output format');
      }
    }

    callback();
  };
  return (
    <div style={{ width: '1200px' }}>
      <Modal
        open={open}
        title="Edit Challenge"
        okText="Update custom challenges"
        cancelText="Cancel"
        onCancel={onCancel}
        width={900}
        onOk={() => {
          form
            .validateFields()
            .then((values: IValues) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info: any) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="Format Date"
          >
            <Input placeholder="Format Date" />
          </Form.Item>

          <Form.Item name="difficulty" label="Difficult Level" wrapperCol={{ span: 60 }} >
            <Select placeholder="Easy" allowClear>
              <Option value="easy">Easy</Option>
              <Option value="medium">Medium</Option>
              <Option value="hard">Hard</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Short description"
            label="Short description"
          >
            <Input />
          </Form.Item>

          <Form.Item name="editor" initialValue={value}>
            <div data-color-mode="dart">
              <MDEditor
                value={value}
                onChange={(val) => {
                  setValue(val!);
                }}
              />
            </div>

          </Form.Item>
          <Space size={30}>
            <Form.Item name="inputType" label={<Text code>Input type</Text>} >
              <Select placeholder="Select an option" style={{ width: 410 }} dropdownStyle={{ width: 410 }}>
                <Option value="integer">Integer</Option>
                <Option value="string">String</Option>
                <Option value="array of integers">Array of integers</Option>
                <Option value="array of strings">Array of strings</Option>
              </Select>
            </Form.Item>
            <Form.Item name="outputType" label={<Text code>Output type</Text>}>
              <Select placeholder="Select an option" style={{ width: 410 }} dropdownStyle={{ width: 410 }}>
                <Option value="integer">Integer</Option>
                <Option value="string">String</Option>
                <Option value="array of integers">Array of integers</Option>
                <Option value="array of strings">Array of strings</Option>
              </Select>
            </Form.Item>
          </Space>

          <Form.Item
            label="Required test cases"
            required tooltip="This is a required field" wrapperCol={{ span: 60 }}
          >
            <Input.Group compact>
              <Form.Item
                name="inputValue"
                rules={[
                  { required: true, message: 'Please enter a value' },
                  { validator: validateInputBasedOnOption },
                ]}
              >
                <Input placeholder="Enter input format" style={{ width: 410 }} />
              </Form.Item>

              <Form.Item
                name="outputValue"
                rules={[
                  { required: true, message: 'Please enter a value' },
                  { validator: validateOutputBasedOnOption },
                ]}
              >
                <Input placeholder="Enter output format" style={{ width: 410, marginLeft: '30px' }} />
              </Form.Item>
            </Input.Group>

            <Input.Group compact>
              <Form.Item
                name="inputValue1"
                rules={[
                  { required: true, message: 'Please enter a value' },
                  { validator: validateInputBasedOnOption },
                ]}
              >
                <Input placeholder="Enter input format" style={{ width: 410 }} />
              </Form.Item>

              <Form.Item
                name="outputValue1"
                rules={[
                  { required: true, message: 'Please enter a value' },
                  { validator: validateOutputBasedOnOption },
                ]}
              >
                <Input placeholder="Enter output format" style={{ width: 410, marginLeft: '30px' }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};


const data = [
  {
    title: (<><ControlOutlined /> <br />Input/Output</>),
    content: [
      {
        details: "Challenges that an be taken in many languages and requires candidate to to return correct output",
      }
    ]
  },
  {
    title: (<><ReadFilled /> <br /> Unit test</>),
    content: [
      {
        details: "Challenges that an be taken in many languages and requires candidate to to return correct output"
      }
    ]
  },

];




const Challenges: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return (
    <div id="pricing" className='block pricingBlock bgGray'>
      <div className='container-fluid'>
        <List
          grid={{
            gutter: 16,
            column: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>
                <p>{item.content[0].details}</p>
                <Button
                  type="primary"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Create
                </Button>
                <CollectionCreateForm
                  open={open}
                  onCreate={onCreate}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />

              </Card>
            </List.Item>
          )}
        />
      </div>

    </div>

  );
};


const data = [
  {
    title: (<><ControlOutlined /> <br />Input/Output</>),
    content: [
      {
        details: "Challenges that an be taken in many languages and requires candidate to to return correct output",
      }
    ]
  },
  {
    title: (<><ReadFilled /> <br /> Unit test</>),
    content: [
      {
        details: "Challenges that an be taken in many languages and requires candidate to to return correct output"
      }
    ]
  },

];

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return (
    <div id="pricing" className='block pricingBlock bgGray'>
      <div className='container-fluid'>
        <List
          grid={{
            gutter: 16,
            column: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>
                <p>{item.content[0].details}</p>
                <Button
                  type="primary"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Create
                </Button>
                <CollectionCreateForm
                  open={open}
                  onCreate={onCreate}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />

              </Card>
            </List.Item>
          )}
        />
      </div>

    </div>

  );
};

export default App;







