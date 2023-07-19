import { Form, Layout, Select, Space } from 'antd';

const { Option } = Select;

const handleTimeLimitChange = (value) => {
    // Handle the selected time limit
    console.log(value);
};

const ExamSettings = ({
    onChange
}) => {
    return (
        <Layout style={{ padding: '24px' }}>
            <Form>
                <Form.Item label="Time limit">
                    <Space direction='horizontal'  >
                        <Select
                            placeholder="No hour limit"
                            style={{ width: 180 }}
                            onChange={handleTimeLimitChange}
                        >
                            <Option value="0">0 hr</Option>
                            <Option value="1">1 hr</Option>
                            <Option value="2">2 hr</Option>
                            <Option value="3">3 hr</Option>
                            {/* Add more options as needed */}
                        </Select>
                        <Select placeholder="No minute limit" style={{ width: 180 }} onChange={handleTimeLimitChange}>
                            <Option value="00">00</Option>
                            <Option value="15">15</Option>
                            <Option value="30">30</Option>
                            <Option value="45">45</Option>
                            {/* Add more options as needed */}
                        </Select>
                    </Space>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default ExamSettings;
