import React, { useState } from 'react';
import { Button } from 'antd';
import { AppstoreAddOutlined, ControlOutlined, ReadFilled } from '@ant-design/icons';
import ChallengesTable from './ChallengesTable';
import { ChallengeForm } from './ChallengeForm';
import { Card, Col, Row, Typography, List } from 'antd';
const { Title } = Typography;

const Challenges: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  return (
    <>
      <div style={{ padding: '10px' }}>
        {/* <Title>Customization</Title> */}
        {/* <Row gutter={16} >
          <Col span={8}>
            <Card
              title={<><ControlOutlined /><br />Input/Output</>}
              bordered={false}
              hoverable
              style={{ padding: '8px 8px', height: 300, textAlign: 'center' }}
            >
              <p>Challenges that an be taken in many languages and requires candidate to to returncorrect output</p>
              <Button type="primary" onClick={() => { setOpen(true); }}>Create</Button>
              <ChallengeForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title={<><ReadFilled /> <br /> Unit test</>}
              bordered={false}
              hoverable
              style={{ padding: '8px 8px', height: 300, textAlign: 'center' }}
            >
              <p>Challenges that an be taken in many languages and requires candidate to to return correct output</p>
              <Button type="primary">Create</Button>
            </Card>
          </Col>
        </Row> */}
      </div>
      <div>
        <ChallengeForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </div>
      <ChallengesTable openForm={() => {
        setOpen(true);
      }} />
    </>
  );
};

export default Challenges;
