import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";
import News from "./pages/News";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{ backgroundColor: "#14161a", color: "white", minHeight: "100vh" }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} exact></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/coins/:id" element={<Coinpage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
