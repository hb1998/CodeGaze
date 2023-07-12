import { Layout, Tabs } from "antd";
import { Link, Outlet } from "react-router-dom";

const { TabPane } = Tabs;
const { Content } = Layout;


const handleTabClick=()=>{
  console.log("tab clicked");

}
const Assessments = () => {


  return (
    <Layout>
      <header>
        Assessments
        <div style={{ padding: "5px" }}>
          <Tabs defaultActiveKey="1" onTabClick={handleTabClick}>
            <TabPane tab="Open" tabKey="Open" key="Open" >
              <Link to="/assessments/open">Open</Link>
            </TabPane>            
            <TabPane tab="Analytics" tabKey="Analytics" key="Analytics">
              <Link to="/assessments/analytics">Analytics</Link>
            </TabPane>
          </Tabs>
          <Content>
            <Outlet />
          </Content>
        </div>
      </header>
    </Layout>
  );
};

export default Assessments;