import Amplify from 'aws-amplify';
import logo from './logo.svg';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth'
import { config } from './services/config';
import * as AWS from 'aws-sdk';
import { Credentials } from 'aws-sdk/lib/credentials';
import './App.css';

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.REGION,
        userPoolId: config.USER_POOL_ID,
        userPoolWebClientId: config.APP_CLIENT_ID,
        identityPoolId: config.IDENTITY_POOL_ID,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
})


function App() {

  async function signIn(username:string, password:string) {
    try {
        console.log('gimme username', username);
        console.log('gimme password', password);
        const user = await Auth.signIn(username, password) as CognitoUser;
        console.log(user);
        // setUserData(user);
    } catch (error) {
        console.log('error signing in', error);
    }
  }

  // const [userData, setUserData] = useState(null); 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => signIn('andydurette', 'DEFfed!@#321')} style={{border: '1px solid red', fontSize:'20px'}}>Login</button>
      {/* {userData &&
        <div>Successful login</div>
      } */}
      </header>
      
    </div>
  );
}

export default App;
