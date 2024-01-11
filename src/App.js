import "./App.css";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
