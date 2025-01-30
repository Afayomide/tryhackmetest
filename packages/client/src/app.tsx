import { Outlet } from 'react-router-dom';
import { getCodeSandboxHost } from "@codesandbox/utils";


export const codeSandboxHost = getCodeSandboxHost(3001)
export const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001'

function App() {

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
              <Outlet/>
     
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
