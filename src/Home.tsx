import { Layout, Menu } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import Assessments from "./Modules/Assessments/Assessments";
import Challenges from "./Modules/Challenges/Challenges";
import Dashboard from "./Modules/Dashboard/Dashboard";
import Candidates from "./Modules/Candidate/Candidates";
import { UserOutlined } from "@ant-design/icons";
import Analytics from "./Modules/Assessments/Analytics/Analytics";
import Open from "./Modules/Assessments/Open/Open";

import OpenAssessment from "./Modules/Assessments/Open/OpenAssessment";

const { Header, Content } = Layout;

const Home = () => {
  return (
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["dashboard"]}
        >
          <Menu.Item key="dashboard">
            <Link to={"/dashboard"}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="assessments">
            <Link to={"/assessments"}>Assessments</Link>
          </Menu.Item>
          <Menu.Item key="challenges">
            <Link to={"/challenges"}>Challenges</Link>
          </Menu.Item>
          <Menu.Item key="candidates">
            <Link to={"/candidates"}>Candidates</Link>
          </Menu.Item>
          <Menu.Item key="account" style={{ marginLeft: "auto" }}>
            <Link to={"/account"}>
              Lumel &nbsp;
              <UserOutlined />
            </Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content" style={{ background: "#fff" }}>
          <Routes>
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/assessments" Component={Assessments}>
             <Route path="open" Component={Open}/>           
              <Route path="analytics" Component={Analytics} />  
            </Route>
            <Route path="/challenges" Component={Challenges} />
            <Route path="/candidates" Component={Candidates} />
          </Routes>
          <Routes>          
              <Route path="/assessments/open/openAssessment" Component={OpenAssessment}/>  
          </Routes>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
