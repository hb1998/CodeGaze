import { Button, Form, Layout, Select } from 'antd';

const { Option } = Select;

const handleTimeLimitChange = (value) => {
    // Handle the selected time limit
    console.log(value);
};

const SettingsAssessments = () => {
    return (
        <div>
            <h1 style={{ padding: '18px' }}>Assessment settings</h1>
            <div>
                <Layout style={{ padding: '24px' }}>
                    <Form>
                        <header> Time limit</header>
                        <Select
                            title="No minute limit"
                            placeholder="No hour limit"
                            style={{ width: 180 }}
                            onChange={handleTimeLimitChange}
                        >
                            <Option value="1">0 hr</Option>
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
                    </Form>
                </Layout>
            </div>
        </div>
    );
};

export default SettingsAssessments;
