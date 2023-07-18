import { ArrowLeftOutlined, CopyOutlined,  SelectOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { Link } from 'react-router-dom';
import ChallengesAssessment from './ChallengesAssessment';
import SettingsAssessments from './SettingsAssessment';
import { useState } from 'react';


const OpenAssessment = () => {
    const [challengesChanges, setChallengesChanges] = useState(null);
    const [settingsChanges, setSettingsChanges] = useState(null);

    const handleChallengesChange = (changes) => {
        setChallengesChanges(changes);
    };

    const handleSettingsChange = (changes) => {
        setSettingsChanges(changes);
    };

    const handleSave = () => {
        
        console.log('Saving changes:', challengesChanges, settingsChanges);
    };
    return (
        <div style={{ padding: '0px 0px' }} >
           <Link to="/assessments/open"> <Button  type="link" icon={<ArrowLeftOutlined />} ></Button>  back to candidate results</Link>
            
                

            <div style={{ float: 'right', display: 'flex', padding: '10px' }}>
                <Button type="link" icon={<CopyOutlined />}>
                    Duplicate
                </Button>
                <Button type="link" icon={<SelectOutlined />}>
                    Preview
                </Button>
                <Button type="primary"  onClick={handleSave}>save</Button>
            </div>
            <div  style={{ padding: '18px' }}> <h1>Technical assessment</h1></div>
            <div>
                <Tabs style={{ padding: '18px' }}>
                    <TabPane tab="Challenges" key="1">
                        <ChallengesAssessment onChange={handleChallengesChange}/>
                    </TabPane>
                 
                    <TabPane tab="Settings" key="2">
                        <SettingsAssessments onChange={handleSettingsChange}/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};
export default OpenAssessment;
