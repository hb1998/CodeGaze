import React, { useEffect, useState } from 'react';
import { Button, Layout, theme } from 'antd';
import Card from 'antd/es/card/Card';
import { Typography } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { AssessmentAPIService } from '../services/Assessment.api';



const { Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

export interface IAssessments{
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

    // Fetch assessments when the component mounts
    const fetchAssessments = async () => {
        try {
          const data = await AssessmentAPIService.getAll();
          setAssessments(data);
          console.log(data,"api")
        } catch (error) {
          console.error('Error fetching assessments:', error);
        }
      };

    useEffect(() => {
      fetchAssessments();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Layout>
                <Content style={{ padding: '5px' }}>
                    <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
                        <Title level={4}>Challenge Library</Title>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Card     actions={[<Button>custom challenge</Button>]}>
                                <Meta ></Meta>
                                <Button style={{ marginRight: '0px' }} icon={[<ExportOutlined />]}>
                                    preview
                                </Button>
                                 
                            </Card>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Content style={{ padding: '50px' }}>
                <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
                    <Title level={4}>Selected Challenges </Title>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Card>hello</Card>
                    </Content>
                </Layout>
            </Content>
        </div>
    );
};

export default ChallengesAssessment;
