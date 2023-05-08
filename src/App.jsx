import { useState, useEffect, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./components/Auth";
import { useStoreActions, useStoreState } from "easy-peasy";

import Login from "./pages/Login";
import Credits from "./pages/Credits";
import Dashboard from "./pages/Dashboard";
import VR from "./pages/VR";
import Interface from "./pages/Interface";

const LoggedIn = ({ component }) => {
 
  const isLoaded = useStoreState(state => state.manager.isLoaded);
  const fetchInitialState = useStoreActions(actions => actions.fetchInitialState);

  useEffect(() => {
    fetchInitialState();
  }, [])

  return isLoaded ? component : <p>Loading...</p>;
};

const App = () => {
  const authCtx = useContext(AuthContext);
  /*
    NOTE: 
    Any components that need user data must
    be wrapped in the LoggedIn function.
  */

  const router = createBrowserRouter([
    {
      path: "/",
      element: authCtx.currentUser ? (
        <LoggedIn component={<Dashboard section="prompts" />} />
      ) : (
        <Login />
      ),
    },
    {
      path: "/welcome",
      element: authCtx.currentUser ? (
        <LoggedIn component={<Dashboard section="welcome" />} />
      ) : (
        <Login />
      ),
    },
    {
      path: "/reflections",
      element: authCtx.currentUser ? (
        <LoggedIn component={<Dashboard section="reflections" />} />
      ) : (
        <Login />
      ),
    },
    {
      path: "/prompts",
      element: authCtx.currentUser ? (
        <LoggedIn component={<Dashboard section="prompts" />} />
      ) : (
        <Login />
      ),
    },
    {
      path: "/credits",
      element: <Credits />,
    },
    {
      path: "/vr",
      element: authCtx.currentUser ? (
        <LoggedIn component={<VR />} />
      ) : (
        <Login />
      ),
    },
    {
      path: "/interface",
      element: authCtx.currentUser ? (
        <LoggedIn component={<Interface />} />
      ) : (
        <Login />
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
