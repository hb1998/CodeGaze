import { Button, Col, Layout, Row } from "antd";
import { Link } from "react-router-dom";

function EntryPage() {
  return (
    <div>
      <h1>Welcome to Lumel Assessment </h1>
      <div>
        <Link to="/Login">
          <Button style={{ marginRight: 10 }}>Login</Button>
        </Link>

        <Link to="/Register">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
}

export default EntryPage;
