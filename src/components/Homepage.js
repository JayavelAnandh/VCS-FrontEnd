import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./All.css";
import DashBoard from "./DashBoard";
const HomePage = () => {
  const [file, setFile] = useState();
  const [repositoryName, setRepositoryName] = useState("");
  const [createdby, setcreatedby] = useState("sample mw");
  const [commitedby, setCommitedby] = useState("sample mw");

  const [allRepositories, setAllRepositories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(!(localStorage.getItem("AuthToken"))){
      navigate("/")
      alert("Login to Continue")
    }
    retriveAllData();
  }, []);

  const retriveAllData = async () => {
    try {
      const res = await fetch("https://versioner.vercel.app/all/", {
        method: "GET",
      });
      const response = await res.json();
      setAllRepositories(response);
    } catch (error) {
      console.log(error);
      alert("error retriving data");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://versioner.vercel.app/remove/${id}`, {
        method: "DELETE",
      });
      alert("SuceessFully Removed");
      retriveAllData();
    } catch (error) {
      console.log(error);
      alert("error removing data");
    }
  };

  const handleMove = async (id) => {
    try {
      const res = await fetch(`https://versioner.vercel.app/previous/${id}`, {
        method: "PUT",
      });
      retriveAllData();
      const responseReceieved = await res.json();
      alert(responseReceieved.response);
    } catch (error) {
      console.log(error);
      alert("error reverting data");
    }
  };

  return (
    <DashBoard>
    <div className="container-xl">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate("/logIn")}
      >
        LogIn
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate("/create")}
      >
        Create New Repository
      </button>
      <div className="row">
        {allRepositories.map((value, index) => {
          return (
            <div
              className="col-lg-5 card box text-center "
              key={index}
              style={{ backgroundColor: "whitesmoke" }}
            >
              <h4 className="heading">
                <b>{value.repositoryName}</b>
              </h4>
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">
                  createdBy :{" "}
                  <u>
                    <i>
                      <b>{value.createdby}</b>
                    </i>
                  </u>
                </h6>
                <h6 className="card-subtitle mb-2 text-muted ">
                  createdAt :{" "}
                  <u>
                    <i>
                      <b>{value.createdat}</b>
                    </i>
                  </u>
                </h6>
                <p className="card-text">{value.file}</p>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => navigate(`/editFile/${value._id}`)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => handleMove(value._id)}
                >
                  Move to Previous Commit
                </button>
                
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => navigate(`/commits/${value._id}`)}
                >
                  View Commit History
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(value._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            
          );
        })}
      </div>
    </div>
    </DashBoard>
  );
};
export default HomePage;
