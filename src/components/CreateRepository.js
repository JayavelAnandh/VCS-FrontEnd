import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashBoard from "./DashBoard";


const CreateRepository = () => {
  const [file, setFile] = useState();
  const [repositoryName, setRepositoryName] = useState("");

  const [allRepositories, setAllRepositories] = useState([]);
  const navigate = useNavigate();
  const resetForm = () => {
    setFile("");
    setRepositoryName("");
    alert("Repository successfully created");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("https://versioner.vercel.app/createRepo", {
        method: "POST",
        body: JSON.stringify({
          repositoryName,
          createdby:localStorage.getItem("userName"),
          file,
          commitedby:localStorage.getItem("userName"),
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
      alert("Error occured");
    }
  };
  return (
    <DashBoard>
    <div className="createRepo">
      <form onSubmit={(event) => handleSubmit(event)}>
        <h1>Create a Repo:</h1>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Name your Repository
            </span>
          </div>
          <input
            type="text"
            className="form-control stringInput"
            placeholder="Repo Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={repositoryName}
            onChange={(event) => setRepositoryName(event.target.value)}
          />
        </div>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Paste your file</span>
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
    </div>
    </DashBoard>
  );
};
export default CreateRepository;
