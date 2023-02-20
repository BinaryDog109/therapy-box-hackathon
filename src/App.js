import "./App.css";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Login/SignupPage";
import { TasksPage } from "./pages/Tasks/TasksPage";
import { NewsPage } from "./pages/News/NewsPage";
import { SportsPage } from "./pages/Sports/SportsPage";
import { PicturesPage } from "./pages/Pictures/PicturesPage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";

function App() {
  const { user, authChecked } = useAuthContext();
  const checkUserBeforeRouteTo = (TargetPage) => {
    return user ? TargetPage : <Redirect to={"/login"} />;
  };
  return (
    authChecked && (
      <Router>
        <div className="App">
          {user && <LogoutButton />}
          <Switch>
            <Route exact path={"/"}>
              {checkUserBeforeRouteTo(DashboardPage)}
            </Route>
            <Route exact path={"/login"}>
              {!user ? <LoginPage /> : <Redirect to={"/"} />}
            </Route>
            <Route exact path={"/signup"}>
              {!user ? <SignupPage /> : <Redirect to={"/"} />}
            </Route>
            <Route exact path={"/sports"}>
              <SportsPage />
            </Route>
            <Route exact path={"/news"}>
              <NewsPage />
            </Route>
            <Route exact path={"/photos"}>
              <PicturesPage />
            </Route>
            <Route exact path={"/tasks"}>
              <TasksPage />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  );
}
const LogoutButton = () => {
  const [logout, pending, error] = useLogout();
  const handleClick = () => {
    logout();
  };
  return (
    <button className="logout-button" disabled={pending} onClick={handleClick}>
      <span>Out</span>
    </button>
  );
};
export default App;
