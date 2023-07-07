import {
  ArrowLeftOutlined,
  CopyOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { Button, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";

const OpenAssessment = () => {
  return (
    <div>
      <Button icon={<ArrowLeftOutlined />} type="link">
        {" "}
        back to all assessments
      </Button>
     
      <Button
        icon={<CopyOutlined />}
        // style={{ float: "right", padding: "5px" }}
      >
        Duplicate
      </Button>
      <Button
        icon={<LaptopOutlined />}
        // style={{ float: "right", padding: "5px" }}
      >
        Preview
      </Button>
      <Button type="primary" style={{ float: "right", padding: "5px" }}>
        
        save
      </Button>

      <div>
        <Tabs>
          <TabPane tab="Challenges">Challenges</TabPane>
          <TabPane tab="Settings">Settings</TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default OpenAssessment;
