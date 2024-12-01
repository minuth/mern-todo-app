import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TokenContext from "./context/token.context";
import TaskContext from "./context/task.context";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Login from "./components/Login";
import AllTask from "./components/AllTask";
import Register from "./components/Register";
import useInit from "./hook/use-init";

function App() {
  const { user, userToken, task, taskDispatch, tokenDispatch, userDispatch } =
    useInit();

  return (
    <BrowserRouter>
      <TokenContext.Provider
        value={{ userToken, tokenDispatch, user, userDispatch }}
      >
        <TaskContext.Provider value={{ task, taskDispatch }}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="/" element={useInit ? <Layout /> : <Login />}>
                <Route index element={<AllTask />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </TaskContext.Provider>
      </TokenContext.Provider>
    </BrowserRouter>
  );
}

export default App;
