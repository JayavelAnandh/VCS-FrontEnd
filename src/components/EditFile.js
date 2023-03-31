import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditFile() {
  const [dataToEdit, setDataToEdit] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    retriveData();
  }, []);
  const retriveData = async () => {
    try {
      const res = await fetch(`https://versioner.vercel.app/${id}`, {
        method: "GET",
      });
      const response = await res.json();
      if (response) {
        setDataToEdit(response.file);
      }
    } catch (error) {
      console.log(error);
      alert("error retriving data");
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch(`https://versioner.vercel.app/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify({ file: dataToEdit, commitedby: "User" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("SuccessFully Updated");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("error updating data");
    }
  };

  return (
    <div className="container-lg">
      <form className="row" onSubmit={(event) => handleSubmit(event)}>
        <input
          className="col-lg-10"
          value={dataToEdit}
          onChange={(event) => setDataToEdit(event.target.value)}
        />
        <button className="col-lg-3 btn btn-success" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}
export default EditFile;
