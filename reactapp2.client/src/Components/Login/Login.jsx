import React, { useState,useEffect } from "react";
import "../Login/Login.css";
import "../../App.css";
import { Link } from "react-router-dom";
import logo from "../../LoginAssets/bird_2.jpg";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import video from "../../LoginAssets/video2.mp4";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("advisor");
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('message', handlePostMessage);
        return () => {
            window.removeEventListener('message', handlePostMessage);
        };
    }, []);

    const handlePostMessage = (event) => {
        if (event.data === 'login successful') {
            setRedirectToDashboard(true);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`https://localhost:7211/api/Authentication/Login/${userType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        if (response.ok) {
            // Login was successful
            console.log('Login successful');
            const data = await response.json();
            localStorage.setItem('userId', data.id);
            localStorage.setItem('userType', userType);
            setRedirectToDashboard(true);
        } else {
            // Login failed
            console.log('Login failed');
        }
    };

    if (redirectToDashboard) {
        if (userType === 'advisor') {
            navigate('/advisorform');
        } else if (userType === 'client') {
            navigate('/clientform');
        }
    }

    const handleGoogleLogin = () => {
        window.open(`https://localhost:7211/api/Authentication/LoginWithGoogle/${userType}`, '_blank');
    };


  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">PeakPortFolios</h2>
            <p>Your way to success!!</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">New?? Way to success!!</span>
            <Link to={"/register"}>
                 <button className="btn" style="Color:black;">Sign Up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Welcome Back!!(Advisor)</h3>
          </div>

          <form onSubmit={handleSubmit} className="form grid">
            <span className="inputDiv">
                          <button type="submit" onClick={handleGoogleLogin} className="btn flex" style="background-color:#AAD7D9;color:white;">
                Login with Google
              </button>
            </span>

                      <div className="inputDiv">
                          <label htmlFor="userType">User Type</label>
                          <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                              <option value="advisor">Advisor</option>
                              <option value="client">Client</option>
                          </select>
                      </div>

            <div className="inputDiv">
              <label htmlFor="username">Email</label>
              <div className="input flex">
                              <FaUserShield className="icon" />
                              <input
                                  type="text"
                                  id="username"
                                  placeholder="Enter email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                              />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                              <BsFillShieldLockFill className="icon" />
                              <input
                                  type="password"
                                  id="password"
                                  placeholder="Enter Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                              />
              </div>
            </div>

                      <button type="submit" className="btn flex" style="background-color:#AAD7D9;color:white;">
              <span>Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              Forgot your password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
      <a href="./Dashboard">Dashboard</a>
    </div>
  );
};
