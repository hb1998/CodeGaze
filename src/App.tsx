import React, { useState } from "react";
import Axios from "axios";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [code, setcode] = useState("");
  const [output, setoutput] = useState("");

  const onSubmit = () => {
    Axios.post(
      "http://localhost:2358/submissions/?base64_encoded=false&wait=true",
      {
        source_code: code,
        language_id: 63,
      }
    ).then((response) => {
      setoutput(response.data.stdout);
      console.log(response.data);
    });
  };

  const onChange = React.useCallback((value, viewUpdate) => {
    setcode(value);
  }, []);

  return (
    <Router>
      <Home />
    </Router>
  );
}
export default App;
