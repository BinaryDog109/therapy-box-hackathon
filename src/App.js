import './App.css';
import { LoginPage } from './pages/Login/LoginPage';
import { SignupPage } from './pages/Login/SignupPage';
import { TasksPage } from './pages/Tasks/TasksPage';
import { NewsPage } from './pages/News/NewsPage';
import { SportsPage } from './pages/Sports/SportsPage';
function App() {
  return (
    <div className="App">
      {/* <h2>Hackathon</h2> */}
      {/* <LoginPage/> */}
      {/* <SignupPage/> */}
      {/* <TasksPage /> */}
      {/* <NewsPage /> */}
      <SportsPage />
    </div>
  );
}

export default App;
