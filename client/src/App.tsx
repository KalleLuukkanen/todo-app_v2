import { Routes, Route } from "react-router-dom";
import Layout from "./components/main/Layout";
import Home from "./components/pages/Home"
import About from "./components/pages/about/About";


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;