import "./App.css";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import PaymentPage from "./pages/PaymentPage";

function App() {

const [{}, dispatch] = useStateValue();

useEffect(() => {
  // will only run once when the app component loads
  auth.onAuthStateChanged(authUser => {
    console.log('THE USER IS >>> ', authUser);
    if (authUser) {
      // the user just logged in / was logged in

      dispatch({
        type: 'SET_USER',
        user: authUser
      })
    }
    else {
      // the user was logged out

      dispatch({
        type: 'SET_USER',
        user: null
      })
    }
  })
}, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/payment" element={<PaymentPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
