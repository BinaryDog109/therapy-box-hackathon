import logo from './logo.svg';
import './App.css';
import { LoginPage } from './pages/Login/LoginPage';
import { SignupPage } from './pages/Login/SignupPage';
import { TasksPage } from './pages/Tasks/TasksPage';
function App() {
  return (
    <div className="App">
      {/* <h2>Hackathon</h2> */}
      {/* <LoginPage/> */}
      {/* <SignupPage/> */}
      <TasksPage />
    </div>
  );
}

export default App;
