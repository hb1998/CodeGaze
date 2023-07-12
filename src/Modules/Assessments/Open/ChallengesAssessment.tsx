import React, { useEffect, useState } from 'react';
import { Button, Layout, Select, theme } from 'antd';
import Card from 'antd/es/card/Card';
import { Typography } from 'antd';
import { ExportOutlined, PlusCircleFilled, PlusSquareTwoTone } from '@ant-design/icons';
import { AssessmentAPIService } from '../services/Assessment.api';

const { Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;
const {Option} = Select

export interface IAssessments {
  candidate_id: number | null;
  code: string | null;
  created_at: string | null;
  exam_id: number | null;
  id: number;
  joined: string | null;
  status: number | null;
  language: number | null;
}

const ChallengesAssessment: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [assessments, setAssessments] = useState<IAssessments[]>([]);
  const [isHelloCardVisible, setIsHelloCardVisible] = useState(false);

  // Fetch assessments when the component mounts
  const fetchAssessments = async () => {
    try {
      const data = await AssessmentAPIService.getAll();
      setAssessments(data);
      console.log(data, 'api');
    } catch (error) {
      console.error('Error fetching assessments:', error);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const handlePreviewClick = () => {
    setIsHelloCardVisible(!isHelloCardVisible);
  };

  const handleLevelChange = (value) => {
    console.log('Selected level:', value);
    // Perform any necessary actions based on the selected level
  };

  return (
    <div>
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>
        <Layout>
          <Content style={{ padding: '5px' }}>
            <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
              <Title style={{ paddingLeft: '5px' }} level={4}>
                Challenge Library
              </Title>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Card
                  actions={[
                    <Button onClick={handlePreviewClick}>custom challenge</Button>,
                  ]}                  
                >
                       

                    
      <Title   level={5}>SplitWise</Title>  
          <Select defaultValue="beginner" onChange={handleLevelChange}>
      <Option value="beginner">Beginner</Option>
      <Option value="intermediate">Intermediate</Option>
      <Option value="advanced">Advanced</Option>
    </Select>


                  <Button type='link'
                    style={{ marginRight: '0px' , float:'right',height:'30px'}}
                    icon={<ExportOutlined />}
                    onClick={handlePreviewClick}
                  >
                    preview
                  </Button>
                  <Button  style={{ marginRight: '0px' , float:'right',height:'30px'}} type="primary" icon={<PlusSquareTwoTone/>}></Button>
                </Card>
              </Content>
            </Layout>
          </Content>
        </Layout>
        <Content style={{ padding: '5px' }}>
          <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
            <Title style={{ paddingLeft: '5px' }} level={4}>
              Selected Challenges
            </Title>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {isHelloCardVisible && <Card>
                {isHelloCardVisible && (
        <div>
          <p>This is the additional content that will be shown in the Card.</p>
          <p>You can add any React components or HTML content here.</p>
        </div>
      )}
           {assessments.map(item => (
        <Card key={item.created_at} title={item.language}>
            <Content>
          <p>{item.status}</p>
          </Content>
        </Card>
      ))}
      </Card>}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
};

export default ChallengesAssessment;
