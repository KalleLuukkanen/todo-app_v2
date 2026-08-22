import { Routes, Route } from "react-router-dom";
import Layout from "./components/main/Layout";
import Home from "./components/pages/Home";
import About from "./components/pages/about/About";
import TodoPage from "./components/pages/todos/TodoPage";
import UserInfo from "./components/pages/user/UserInfo";
import Authentication from "./components/auth/Authentication";



function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/todos" element={<TodoPage />} />
        <Route path="/user" element={<UserInfo />} />
        <Route path="/login" element={<Authentication isLogin={true} />} />
        <Route path="/register" element={<Authentication isLogin={false} />} />
      </Route>
    </Routes>
  );
}

export default App;