import "./App.css";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Login/SignupPage";
import { TasksPage } from "./pages/Tasks/TasksPage";
import { NewsPage } from "./pages/News/NewsPage";
import { SportsPage } from "./pages/Sports/SportsPage";
import { PicturesPage } from "./pages/Pictures/PicturesPage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"}>
            <DashboardPage />
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
  );
}

export default App;
