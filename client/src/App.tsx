import { Routes, Route } from "react-router-dom";
import Layout from "./components/main/Layout";
import Home from "./components/pages/Home";
import About from "./components/pages/about/About";
import Todos from "./components/pages/todos/Todos";
import UserInfo from "./components/pages/user/UserInfo";



function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/user" element={<UserInfo />} />
      </Route>
    </Routes>
  );
}

export default App;