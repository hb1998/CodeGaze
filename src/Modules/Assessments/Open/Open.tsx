import {
  ArrowRightOutlined,
  EditOutlined,
  PlusCircleFilled,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Input, Modal, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

interface CardInterface {
  id: number;
}
const Open = () => {
  const handleCardClick = () => {
    const newCard: CardInterface = {
      id: Date.now(), // Generate a unique identifier for each card
      // Other card data
    };

    setCards((prevCards) => [...prevCards, newCard]);
  };

  
  const [cards, setCards] = useState<CardInterface[]>([]);
  return (
    <div>
      <Input.Search
        placeholder="search your assessments..."
        style={{ width: "20%", padding: "5px" }}
      />
      <Button
        type="primary"
        icon={<PlusCircleFilled />}
        style={{ float: "right", padding: "5px" }}
        onClick={handleCardClick}
      >
        New Assessment
      </Button>
      <div>
       
          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            {cards.map((card) => (
              <Col span={12} key={Card.id}>
                <Card
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Technical assesment
                      
                      <Button 
                        icon={<ArrowRightOutlined />}
                        style={{ marginLeft: 8 }}
                      >
                        <Link to="OpenAssessment">open</Link>{" "}
                      </Button>
                     
        
                    </div>
                  }
                  bordered={true}
                  style={{ height: "100%" }}
                  actions={[<SettingOutlined />,
                <EditOutlined/>]
                
                }
                >
                  Card content
                </Card>
              </Col>
            ))}
          </Row>
        
      </div>
      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default Open;
