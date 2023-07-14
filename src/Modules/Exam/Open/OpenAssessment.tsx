import { ArrowLeftOutlined, CopyOutlined, LaptopOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { Link } from 'react-router-dom';
import ChallengesAssessment from './ChallengesAssessment';
import SettingsAssessments from './SettingsAssessment';


const OpenAssessment = () => {
    return (
        <div >
            <Button icon={<ArrowLeftOutlined />} type="link">
                <Link to="/assessments/open"> back to candidate results</Link>
            </Button>

            <div style={{ float: 'right', display: 'flex', padding: '10px' }}>
                <Button type="link" icon={<CopyOutlined />}>
                    Duplicate
                </Button>
                <Button type="link" icon={<LaptopOutlined />}>
                    Preview
                </Button>
                <Button type="primary">save</Button>
            </div>
            <div> <h1>Technical assessment</h1></div>
            <div>
                <Tabs style={{ padding: '18px' }}>
                    <TabPane tab="Challenges" key="1">
                        <ChallengesAssessment />
                    </TabPane>
                 
                    <TabPane tab="Settings" key="2">
                        <SettingsAssessments/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};
export default OpenAssessment;
