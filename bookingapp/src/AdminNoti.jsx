import axios from "axios";
import { useEffect, useState } from "react";

const Noti = (props) => {
  const [approval, setApproval] = useState("");
  const [buttonShow, setButtonShow] = useState(true);

  useEffect(() => {
    axios.get("/api/notifications/requestreceived").then((res) => {
      setApproval(res.data.approval);
    });
    if (approval === "pending") {
      setButtonShow(true);
    } else {
      setButtonShow(false);
    }
  }, [approval]);

  const handleUpdateNoti = (result) => {
    axios.put("/api/notifications/requestreceived", { approval: result });
    setButtonShow(false);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Sport: {props.sport}</h4>
        <h4 className="card-title">Venue: {props.venue}</h4>
        {console.log(props.equipment)}
        {props.equipment.map((eq, ind) => {
          return <h4 key={ind}>Equipment No: {ind+1} {eq}</h4>;
        })}

        {buttonShow ? (
          <div>
            <button
              className="btn btn-success"
              onClick={() => handleUpdateNoti("approved")}
            >
              Approve
            </button>
            &nbsp;
            <button
              className="btn btn-danger"
              onClick={() => handleUpdateNoti("rejected")}
            >
              Reject
            </button>
          </div>
        ) : (
          <p className="card-text">{approval}</p>
        )}
      </div>
    </div>
  );
};

const AdminNoti = (props) => {
  const [show, setShow] = useState(false);
  const [sport, setSport] = useState("");
  const [venue, setVenue] = useState("");
  const [equipment,setEquipment] = useState([]);

  useEffect(() => {
    axios.get("/api/notifications/requestreceived").then((res) => {
      if (res.data.sport === undefined) {
        setShow(false);
      } else {
        setShow(true);
        setSport(res.data.sport);
        setVenue(res.data.venue);
        setEquipment(res.data.equipment);
      }
    });
  }, []);

  const handleUpdateShow = () => {
    props.func("dashboard");
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <button className="btn btn-primary mb-3" onClick={handleUpdateShow}>
            Add Event
          </button>
          {show ? (
            <Noti sport={sport} venue={venue} equipment={equipment}/>
          ) : (
            <p className="mt-3">No notifications received</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNoti;
