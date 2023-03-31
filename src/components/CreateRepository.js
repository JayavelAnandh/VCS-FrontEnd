import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRepository = () => {
  const [file, setFile] = useState();
  const [repositoryName, setRepositoryName] = useState("");
  const [createdby, setcreatedby] = useState("sample mw");
  const [commitedby, setCommitedby] = useState("sample mw");

  const [allRepositories, setAllRepositories] = useState([]);
  const navigate = useNavigate();
  const resetForm = () => {
    setFile("");
    setRepositoryName("");
    setcreatedby("sample mw");
    alert("Repository successfully created");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:5050/createRepo", {
        method: "POST",
        body: JSON.stringify({
          repositoryName,
          createdby,
          file,
          commitedby,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();
      navigate("/");
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Error occured");
    }
  };
  return (
    <div>
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
            className="form-control"
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
        <button type="submit">Add Repository</button>
      </form>
    </div>
  );
};
export default CreateRepository;
