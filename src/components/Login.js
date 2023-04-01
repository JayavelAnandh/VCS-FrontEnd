import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import './cssFiles/Login.css'
import 'animate.css';
const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
    const res= await fetch("https://versioner.vercel.app/logIn",{
      method:"POST",
      body:JSON.stringify({
        email,
        password
      }),
      headers:{
        "Content-Type": "application/json",
      }
    })
    const response = await res.json();
    localStorage.setItem("userName",response.userName);
    localStorage.setItem("AuthToken",response.AuthToken);
    swal(response.message);
    navigate("/homepage")
    } catch (error) {
      console.log(error);
      swal('Error occured Logging in')
    }
    


  };
  return (
    <div className="container-lg">
      <h1 className="greet"> Welcome to "VERSIONER"</h1>
      <h3>Login to Continue...</h3>
      <form onSubmit={(event) => handleSubmit(event)} className="form">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Enter G-mail:
            </span>
          </div>
          <input
            type="email"
            className="form-control"
            placeholder="eg:abc123@gmail.com"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Enter Password:
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Recommended to use Strong Password"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          submit
        </button>
        <h4 className="text-muted">Get Login Credentials in <a href="https://github.com/JayavelAnandh/VCS-FrontEnd#readme" target={"_blank"}>ReadMe...</a></h4>
      </form>
    </div>
  );
};
export default LogIn;
