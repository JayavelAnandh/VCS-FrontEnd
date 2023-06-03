import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./cssFiles/Login.css";
import "animate.css";
const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loginTrue, setLoginTrue] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch("https://versioner.vercel.app/logIn", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      localStorage.setItem("userName", response.userName);
      localStorage.setItem("AuthToken", response.AuthToken);
      swal(response.message, "", "success");
      navigate("/homepage");
    } catch (error) {
      console.log(error);
      swal("Error occured Logging in");
    }
  };
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("https://versioner.vercel.app/signUp", {
        method: "POST",
        body: JSON.stringify({
          userName,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      localStorage.setItem("userName", response.userName);
      localStorage.setItem("AuthToken", response.AuthToken);
      swal("SuccessFully Signed-In", "", "success");
      navigate("/homepage");
    } catch (error) {
      swal("Error occured while sign-up");
    }
  };
  return (
    // <div className="container-lg">
    //   <h1 className="greet"> Welcome to "VERSIONER"</h1>
    //   <h3>Login to Continue...</h3>
    //   <form onSubmit={(event) => handleSubmit(event)} className="form">
    //     <div className="input-group mb-3">
    //       <div className="input-group-prepend">
    //         <span className="input-group-text" id="basic-addon1">
    //           Enter G-mail:
    //         </span>
    //       </div>
    //       <input
    //         type="email"
    //         className="form-control"
    //         placeholder="eg:abc123@gmail.com"
    //         aria-label="Username"
    //         aria-describedby="basic-addon1"
    //         value={email}
    //         onChange={(event) => setEmail(event.target.value)}
    //       />
    //     </div>
    //     <div className="input-group mb-3">
    //       <div className="input-group-prepend">
    //         <span className="input-group-text" id="basic-addon1">
    //           Enter Password:
    //         </span>
    //       </div>
    //       <input
    //         type="text"
    //         className="form-control"
    //         placeholder="Recommended to use Strong Password"
    //         aria-label="Username"
    //         aria-describedby="basic-addon1"
    //         value={password}
    //         onChange={(event) => setPassword(event.target.value)}
    //       />
    //     </div>
    //     <button type="submit" className="btn btn-success">
    //       submit
    //     </button>
    //     <h4 className="text-muted">Get Login Credentials in <a href="https://github.com/JayavelAnandh/VCS-FrontEnd#readme" target={"_blank"}>ReadMe...</a></h4>
    //   </form>
    // </div>
    <div className="container-fluid loginPage">
      <div className="card col-lg-8">
        {loginTrue ? (
          <>
            <h1>Log-in...</h1>
            <form>
              <label htmlFor="gmail">Gmail</label>
              <input
                type="email"
                id="gmail"
                name="gmail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <br />

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  style={{ width: "90%" }}
                />
                <button
                  type="button"
                  className="btn btn-outline-success"
                  style={{
                    width: "8%",
                    display: "inline-block",
                    height: "40px",
                    marginLeft: "1%",
                  }}
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
              <br />

              <div className="buttonAlign">
                <button
                  type="submit"
                  onClick={(event) => handleSubmit(event)}
                  className="buttons"
                >
                  Log in
                </button>
              </div>

              <div className="buttonAlign">
                <button
                  className="buttons"
                  type="button"
                  onClick={(event) => {
                    setEmail("JohnUser56@gmail.com");
                    setPassword("veronica123");
                  }}
                >
                  Guest user Credentials
                </button>
              </div>
            </form>
            <br />
            <p>
              Don't have an account?
              <span onClick={() => setLoginTrue(!loginTrue)}>
                {" "}
                Create account
              </span>
            </p>
            <p>
              More
              <a
                href="https://github.com/JayavelAnandh/VCS-FrontEnd#readme"
                style={{ color: "green", marginLeft: "7px" }}
              >
                Credentials
              </a>
            </p>
          </>
        ) : (
          <>
            <h1>Sign-up...</h1>
            <form>
              <label htmlFor="name">UserName</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
              <br />
              <label htmlFor="gmail">Gmail</label>
              <input
                type="email"
                id="gmail"
                name="gmail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <br />

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  style={{ width: "90%" }}
                />
                <button
                  type="button"
                  className="btn btn-outline-success"
                  style={{
                    width: "8%",
                    display: "inline-block",
                    height: "40px",
                    marginLeft: "1%",
                  }}
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
              <br />

              <div className="buttonAlign">
                <button
                  type="submit"
                  onClick={(event) => handleSignUp(event)}
                  className="buttons"
                >
                  Sign-In
                </button>
              </div>
            </form>
            <br />
            <p>
              Already have an Account
              <span onClick={() => setLoginTrue(!loginTrue)}> Login ?</span>
            </p>
            <p>
              More
              <a
                href="https://github.com/JayavelAnandh/VCS-FrontEnd#readme"
                style={{ color: "green", marginLeft: "7px" }}
              >
                Credentials
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default LogIn;
