import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import "./cssFiles/ViewCommits.css";
const ViewCommits = () => {
  const { id } = useParams();
  const [historyArray, setHistoryArray] = useState([]);
  const [localTime, setLocalTime] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    retriveAllData();
  }, []);

  const retriveAllData = async () => {
    try {
      const res = await fetch(`https://versioner.vercel.app/${id}`, {
        method: "GET",
      });
      const response = await res.json();
      const responseHistory = response.history;
      setHistoryArray(responseHistory);
      console.log(historyArray);
    } catch (error) {
      console.log(error);
      swal("error retriving data");
    }
  };

  return (
    <div className="container-fluid commitsPage">
      <div className="row">
        <div className="header">Commits</div>
        <div className="mainBlock">
          {historyArray.map((value, index) => {
            var responseTime = value.commitedat;
            var time = new Date(responseTime);
            var localTime = new Date(
              time.getTime() + time.getTimezoneOffset() * 60000
            )
              .toString()
              .split(" ", 5)
              .join(" ");
            return (
              <div className="commitCards" key={index}>
                <h5
                  style={{
                    fontFamily: "Roboto Condensed, sans-serif",
                    fontWeight: "600",
                    letterSpacing: "1px",
                  }}
                >
                  <u>File at the stage of commit :</u>
                </h5>
                <div className="content">{value.content}</div>
                <div>
                  <i className="fa-solid fa-pencil"></i> By{" "}
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      fontFamily: "PT serif,serif",
                    }}
                  >
                    {value.commitedby}
                  </span>{" "}
                  @ <span>{localTime}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="footer">
          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/homepage")}
          >
            Back To HomePage <i className="fa-solid fa-door-open"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ViewCommits;
