import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./All.css";
import DashBoard from "./DashBoard";
const HomePage = () => {
  const [allRepositories, setAllRepositories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("AuthToken")) {
      navigate("/");
      swal("Login to Continue");
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
      swal({ title: "error retriving data", dangerMode: true });
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://versioner.vercel.app/remove/${id}`, {
        method: "DELETE",
      });
      swal("SuceessFully Removed");
      retriveAllData();
    } catch (error) {
      console.log(error);
      swal({ title: "error removing data", dangerMode: true });
    }
  };

  const handleMove = async (id) => {
    try {
      const res = await fetch(`https://versioner.vercel.app/previous/${id}`, {
        method: "PUT",
      });
      retriveAllData();
      const responseReceieved = await res.json();
      swal({ title: responseReceieved.response, dangerMode: true });
    } catch (error) {
      console.log(error);
      swal("error reverting data");
    }
  };

  return (
    <DashBoard>
      <div className="container-fluid homepageBG">
        <div className="row ">
          {allRepositories ? (
            allRepositories.map((value, index) => {
              var responseTime = value.createdat;
              var time = new Date(responseTime);
              var localTime = new Date(
                time.getTime() + time.getTimezoneOffset() * 60000
              )
                .toString()
                .split(" ", 5)
                .join(" ");

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
                          <b>{localTime}</b>
                        </i>
                      </u>
                    </h6>
                    <p className="card-text">{value.file}</p>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => navigate(`/editFile/${value._id}`)}
                    >
                      <i className="fa-solid fa-pencil"></i> Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={() => handleMove(value._id)}
                    >
                      <i className="fa-solid fa-repeat"></i> Move to Previous
                      Commit
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={() => navigate(`/commits/${value._id}`)}
                    >
                      View Commit History <i className="fa-solid fa-eye"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(value._id)}
                    >
                      Delete <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ color: "white" }}> Loading ... </div>
          )}
        </div>
      </div>
    </DashBoard>
  );
};
export default HomePage;
