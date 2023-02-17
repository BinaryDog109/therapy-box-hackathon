import logo from './logo.svg';
import './App.css';
import { LoginPage } from './pages/Login/LoginPage';
import { SignupPage } from './pages/Login/SignupPage';
function App() {
  return (
    <div className="App">
      <h2>Hackathon</h2>
      {/* <LoginPage/> */}
      <SignupPage/>
    </div>
  );
}

export default App;
