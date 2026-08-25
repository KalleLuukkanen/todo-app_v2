import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import TodoPage from "./pages/TodoPage";
import UserInfo from "./pages/UserInfo";
import Authentication from "./features/auth/Authentication";
import RequireAuth from "./features/auth/RequireAuth";



function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Authentication isLogin={true} />} />
        <Route path="/register" element={<Authentication isLogin={false} />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<UserInfo />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;