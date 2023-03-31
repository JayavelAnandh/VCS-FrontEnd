import { useState } from "react";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div className="container-lg">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Enter Username
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="eg:Robert"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
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
              Create Password:
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
      </form>
    </div>
  );
};
export default SignUp;
