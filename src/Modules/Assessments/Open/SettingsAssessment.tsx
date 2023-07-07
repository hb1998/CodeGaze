import { Button, Layout, Select } from 'antd';

const { Option } = Select;

const handleTimeLimitChange = (value) => {
    // Handle the selected time limit
    console.log(value);
};

const SettingsAssessments = () => {
    return (
        <div>
            <h1>Assessment settings</h1>
            <div>
                <Layout>
                    
                        <Select
                            transitionName="hello"
                            style={{ display: 'flex', flexDirection: 'row' }}
                            defaultValue="1 hour"
                            onChange={handleTimeLimitChange}
                        >
                            time limit:
                            <Option value="1 hour">1 hour</Option>
                            <Option value="2 hours">2 hours</Option>
                            <Option value="3 hours">3 hours</Option>
                            {/* Add more options as needed */}
                        </Select>
                    
                </Layout>
            </div>
        </div>
    );
};

export default SettingsAssessments;
