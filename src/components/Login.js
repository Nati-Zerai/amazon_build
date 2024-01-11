import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = e => {
    e.preventDefault();

    //Some fancy firebase login shitttt
  }

  const register = e => {
    e.preventDefault();

    //do some fancy firebase register shitttt
  }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login_container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input type="text"  value={email} onChange={e => setEmail(e.target.value)}/>

          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

          <button type='submit' onClick={signIn} className="login_sigInButton">Sign In</button>
        </form>
        <p>
          By signing-in you agree to Amazon's condtions of use and sale. Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads
          Notice.
        </p>
        <button type='submit' onClick={register} className="login_registrationButton">Create your Amazon Account</button>
      </div>
    </div>
  );
}

export default Login;
