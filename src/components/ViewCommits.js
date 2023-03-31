import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewCommits = () => {
  const { id } = useParams();
  const [historyArray, setHistoryArray] = useState([]);
  const [localTime,setLocalTime]= useState('');
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

//   const getLocalTime=(time)=>{
//     var startTime = new Date(time);

//     startTime =   new Date( startTime.getTime() + ( startTime.getTimezoneOffset() * 60000 ) );

//     setLocalTime(startTime);
//     return startTime;

//   }
  return (
    <div className="container-lg">
      <div className="row">
        {historyArray.commits}
        {historyArray.map((value, index) => {
            var responseTime =value.commitedat
           var time = new Date(responseTime)
           var localTime =(new Date(time.getTime() + ( time.getTimezoneOffset() * 60000 ))).toString()
          return (
            
            <div className="col-md-6 card" key={index}>
              
              
              <div><u>CommitedBy:{value.commitedby}</u></div><br/>
              <div ><u>CommitedAt:{localTime}</u></div><hr />
              <div>{value.content}</div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="btn btn-dark col-md-12"
        onClick={() => navigate("/homepage")}
      >
        Back To HomePage
      </button>
    </div>
  );
};
export default ViewCommits;
