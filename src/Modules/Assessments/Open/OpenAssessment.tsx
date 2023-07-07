import {
  ArrowLeftOutlined,
  CopyOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { Button, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { Link } from "react-router-dom";

const OpenAssessment = () => {
  return (
    <div>
      <Button icon={<ArrowLeftOutlined />} type="link">
        {" "}
       <Link to="/assessments/open"> back to candidate results</Link>
      </Button>
      
     <div  style={{ float: "right" ,display: 'flex', padding: '10px' }}>
      <Button 
      type="link"
        icon={<CopyOutlined />}
        // style={{ float: "right", padding: "5px" }}
      >
        Duplicate
      </Button>
      <Button
      type="link"
        icon={<LaptopOutlined />}
        // style={{ float: "right", padding: "5px" }}
      >
        Preview
      </Button>
      <Button type="primary">
        
        save
      </Button>
      </div>

      <div>
        <Tabs>
          <TabPane tab="Challenges" key="1">
          <Link to="challengeAssessment">Challenges</Link></TabPane>
          <TabPane tab="Settings" key="2">
            <Link to="challengeSettings">Settings</Link></TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default OpenAssessment;
