import React, { useState } from 'react';
import { Button } from 'antd';
import { AppstoreAddOutlined, ControlOutlined, ReadFilled } from '@ant-design/icons';
import ChallengesTable from './ChallengesTable';
import { Card, Col, Row, Typography, List } from 'antd';
import { Challenge } from '../../types/Models';
import { ChallengeForm } from './ChallengeForm';
const { Title } = Typography;

const Challenges: React.FC = () => {

  const [modalState, setModalState] = useState({
    open: false,
    values: null
  })
  const onCreate = () => {
    setModalState({
      open: true,
      values: null
    });
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
          open={modalState.open}
          onCreate={onCreate}
          onCancel={() => {
            setModalState({
              open: false,
              values: null
            })
          }}
          values={modalState.values} />
      </div>
      <ChallengesTable openForm={(values: Challenge) => {
        setModalState({
          open: true,
          values
        })
      }} />
    </>
  );
};

export default Challenges;