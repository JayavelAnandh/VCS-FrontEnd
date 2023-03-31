import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewCommits = () => {
  const { id } = useParams();
  const [historyArray, setHistoryArray] = useState([]);
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
    } catch (error) {
      console.log(error);
      alert("error retriving data");
    }
  };
  return (
    <div className="container-lg">
      <div className="row">
        {historyArray.commits}
        {historyArray.map((value, index) => {
          return (
            <div className="col-md-6 card" key={index}>
              
              
              <div><u>CommitedBy:{value.commitedby}</u></div><br/>
              <div><u>CommitedAt:{value.commitedat}</u></div><hr />
              <div>{value.commits}</div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="btn btn-dark col-md-12"
        onClick={() => navigate("/")}
      >
        Back To HomePage
      </button>
    </div>
  );
};
export default ViewCommits;
