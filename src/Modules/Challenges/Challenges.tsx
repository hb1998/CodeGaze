import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { Space, Typography } from 'antd';

const { Text } = Typography;
const { Option } = Select;
type RequiredMark = boolean | '';
import './styles/challenges.css';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('');

  const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const validateInputBasedOnOption = (_: any, value: any, callback: any) => {
    const selectedOption = form.getFieldValue('inputType',);

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
    <Modal
      open={open}
      title="Edit custom challenges"
      okText="Update custom challenges"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
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
          label="Date Format"

        >
          <Input placeholder="Format Date" />
        </Form.Item>
        <Form.Item name="difficulty" label="Difficult Level" >
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
        <Space size={80}>
          <Form.Item name="inputType" label={<Text code>Input type</Text>} >
            <Select placeholder="Select an option">
              <Option value="integer">Integer</Option>
              <Option value="string">String</Option>
              <Option value="array of integers">Array of integers</Option>
              <Option value="array of strings">Array of strings</Option>
            </Select>
          </Form.Item>
          <Form.Item name="outputType" label={<Text code>Output type</Text>}>
            <Select placeholder="Select an option">
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
              <Input placeholder="Enter input format" />
            </Form.Item>

            <Form.Item
              name="outputValue"
              rules={[
                { required: true, message: 'Please enter a value' },
                { validator: validateOutputBasedOnOption },
              ]}
            >
              <Input placeholder="Enter output format" />
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
              <Input placeholder="Enter input format" />
            </Form.Item>

            <Form.Item
              name="outputValue1"
              rules={[
                { required: true, message: 'Please enter a value' },
                { validator: validateOutputBasedOnOption },
              ]}
            >
              <Input placeholder="Enter output format" />
            </Form.Item>
          </Input.Group>
        </Form.Item>

      </Form>
    </Modal>
  );
};

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default App;











