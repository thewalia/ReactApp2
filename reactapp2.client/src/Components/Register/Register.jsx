import React, {useState} from "react";
import '../../App.css'
import { Link } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { FaUserShield } from "react-icons/fa";
import video from '../../LoginAssets/video2.mp4'
import logo from "../../LoginAssets/bird_2.jpg";
import { useNavigate } from "react-router-dom";

export const Register = () => {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("advisor");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`https://localhost:7211/api/Authentication/Register/${userType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, firstName, lastName, password }),
            credentials: 'include'
        });

        if (response.ok) {
            // Registration was successful
            console.log('Registration successful');
            setRedirectToLogin(true);
        } else {
            // Registration failed
            console.log('Registration failed');
        }
    };

    if (redirectToLogin) {
        navigate('/Login');
    }

  return (
    <div className="registerPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">PeakPortFolios</h2>
            <p>Your way to success!!!</p>
          </div>

          <div className="footerDiv flex">
          <span className="text">Have an account??</span>
          <Link to={"/login"} >
              <button className="btn" style="Color:black">Login</button>
          </Link>
          </div>
        </div>

        <div className="formDiv flex">
          {/* <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Welcome Back!!</h3>
          </div> */}
                  <div className="headerDiv">
                      <img src={logo} alt="Logo Image" />
                      <h3>Welcome Back!!(Advisor)</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="form grid">

                      <div className="inputDiv">
                          <label htmlFor="userType">User Type</label>
                          <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                              <option value="advisor">Advisor</option>
                              <option value="client">Client</option>
                          </select>
                      </div>
      
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                              <MdMarkEmailRead className="icon" />
                              <input
                                  type="email"
                                  id="email"
                                  placeholder="Enter Email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                              />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="username">FirstName</label>
              <div className="input flex">
                              <FaUserShield className="icon" />
                              <input
                                  type="text"
                                  id="firstName"
                                  placeholder="Enter Fistname"
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                              />
              </div>
            </div>

                      <div className="inputDiv">
                          <label htmlFor="username">LastName</label>
                          <div className="input flex">
                              <FaUserShield className="icon" />
                              <input
                                  type="text"
                                  id="lastName"
                                  placeholder="Enter Lastname"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
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
              <span>Register</span>
              <AiOutlineSwapRight className="icon" />
            </button>

                      {/*<span className="forgotPassword">
              Forgot your password? <a href="">Click Here</a>
            </span>*/}
          </form>
        </div>
      </div>
    </div>
  );
};
