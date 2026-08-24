import { Routes, Route } from "react-router-dom";
import Layout from "./components/main/Layout";
import Home from "./components/pages/Home";
import About from "./components/pages/about/About";
import TodoPage from "./components/pages/todos/TodoPage";
import UserInfo from "./components/pages/user/UserInfo";
import Authentication from "./components/auth/Authentication";
import RequireAuth from "./components/auth/RequireAuth";
import TodosProviderWrapper from "./components/pages/todos/TodosProviderWrapper";



function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Authentication isLogin={true} />} />
        <Route path="/register" element={<Authentication isLogin={false} />} />
        <Route element={<RequireAuth />}>
          <Route element={<TodosProviderWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<TodoPage />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<UserInfo />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;