import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import DashBoard from "./DashBoard";
import "./cssFiles/CreateRepository.css";

const CreateRepository = () => {
  const [file, setFile] = useState();
  const [repositoryName, setRepositoryName] = useState("");

  const [allRepositories, setAllRepositories] = useState([]);
  const navigate = useNavigate();
  const resetForm = () => {
    setFile("");
    setRepositoryName("");
    swal("Repository successfully created");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("https://versioner.vercel.app/createRepo", {
        method: "POST",
        body: JSON.stringify({
          repositoryName,
          createdby: localStorage.getItem("userName"),
          file,
          commitedby: localStorage.getItem("userName"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();
      navigate("/homepage");
      resetForm();
    } catch (error) {
      console.log(error);
      swal("Error occured");
    }
  };
  return (
    <DashBoard>
      {/* <div className="createRepo">
      <form onSubmit={(event) => handleSubmit(event)}>
        <h1>Create a Repo</h1>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <h5>Name your Repository:</h5>
            </span>
          </div>
          <input
            type="text"
            className="form-control "
            placeholder="Repo Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={repositoryName}
            onChange={(event) => setRepositoryName(event.target.value)}
          />
        </div>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><h5>Paste your file:</h5></span>
          </div>
          <textarea
            className="form-control"
            aria-label="With textarea"
            placeholder="Paste Here"
            value={file}
            onChange={(event) => setFile(event.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-outline-success" type="submit">Add Repository</button>
      </form>
    </div> */}
      <div className="container-fluid newRepoPage">
        <div className="row">
          <form>
            <label htmlFor="repoName">Name :</label>
            <input
              type="text"
              id="repoName"
              name="repoName"
              value={repositoryName}
              placeholder="NAME YOUR REPOSITORY"
              onChange={(event) => setRepositoryName(event.target.value)}
            />
            <br />

            <label htmlFor="file"> Paste Your File Here :</label>
            <textarea
              type="text"
              id="file"
              name="file"
              value={file}
              placeholder="PASTE OR WRITE YOUR FILE HERE!!"
              onChange={(event) => setFile(event.target.value)}
              style={{ height: "40vh" }}
            />

            <br />

            <div className="buttonAlign">
              <button className="buttons btn btn-outline-dark">
                Create New Repository
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashBoard>
  );
};
export default CreateRepository;
