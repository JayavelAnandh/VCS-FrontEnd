import { AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function DashBoard({ title, description, children }) {
  const navigate = useNavigate();

  const logoutMethod = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("AuthToken");
    swal("Logged Out");
    navigate("/");
  };

  return (
    <div className="main-component base-component">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Button color="inherit" onClick={() => navigate("/homepage")}>
            <span className="nav-name">
              HomePage <i className="fa-solid fa-house"></i>
            </span>
          </Button>
          <Button color="inherit" onClick={() => navigate("/create")}>
            <span className="nav-name">
              Create New Repository <i className="fa-solid fa-plus"></i>
            </span>
          </Button>

          <Button color="inherit" onClick={logoutMethod}>
            <span className="nav-name">
              Logout <i className="fa-solid fa-door-open"></i>
            </span>
          </Button>
        </Toolbar>
      </AppBar>
      <header>
        <h1 className="heading">VERSIONER </h1>
        <p className="description">
          <marquee>A small scale version control system</marquee>
        </p>
      </header>
      <main className="main-segment">
        <h2>{description}</h2>

        <div>{children}</div>
      </main>
    </div>
  );
}

export default DashBoard;
