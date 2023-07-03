import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import Axios from 'axios';
import { langs } from '@uiw/codemirror-extensions-langs';

function App() {

  const [code, setcode] = useState('');
  const [output, setoutput] = useState('')

  const onSubmit = () => {
    Axios.post('http://localhost:2358/submissions/?base64_encoded=false&wait=true', {
      source_code: code,
      language_id: 63,
    }).then((response) => {
      setoutput(response.data.stdout)
      console.log(response.data);
    })
  }

  const onChange = React.useCallback((value, viewUpdate) => {
    setcode(value)
  }, []);
  return (
    <div>
      <CodeMirror
        value={code}
        height="200px"
        theme={'dark'}
        extensions={[langs.python()]}
        onChange={onChange}
      />
      <button onClick={onSubmit}>Submit</button>
      <div>
        {output}
      </div>
    </div >
  );
}
export default App;