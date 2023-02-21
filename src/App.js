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
import { NewsContextProvider } from "./context/NewsContext";
import { TasksContextProvider } from "./context/TasksContext";
import { PhotosContextProvider } from "./context/PhotosContext";
import { SportsContextProvider } from "./context/SportsContext";
import { useEffect, useState } from "react";
import { Hints } from "./components-public/Hints";
// Note: Moved News and Tasks Provider here so that they can get authenticated user object
function App() {
  const { user, authChecked } = useAuthContext();

  return (
    authChecked && (
      <Router>
        <div className="App">
          {user && <LogoutButton />}
          <Switch>
            {/* Two basic routes (everyone can access) */}
            <Route exact path={"/login"}>
              {!user ? <LoginPage /> : <Redirect to={"/"} />}
            </Route>
            <Route exact path={"/signup"}>
              {!user ? <SignupPage /> : <Redirect to={"/"} />}
            </Route>
            {/* Routes for unauthenticated users */}
            {!user && (
              <Route path={"/"}>
                <Redirect to={"/login"} />
              </Route>
            )}
            {/* Routes for authenticated users */}
            {user && (
              <NewsContextProvider>
                <TasksContextProvider>
                  <PhotosContextProvider>
                    <SportsContextProvider>
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
                    </SportsContextProvider>
                  </PhotosContextProvider>
                </TasksContextProvider>
              </NewsContextProvider>
            )}
          </Switch>
        </div>
      </Router>
    )
  );
}
const LogoutButton = () => {
  const [logout, logoutError, pending, user] = useLogout();
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    if (logoutError) {
      setErrors((prev) => [...prev, logoutError]);
    }
  }, [logoutError]);
  const handleClick = () => {
    logout();
  };
  return (
    <>
      <Hints hints={errors} />
      <button
        className="logout-button"
        disabled={pending}
        onClick={handleClick}
      >
        <span>LogOut</span>
      </button>
    </>
  );
};
export default App;
