import axios from "axios";
import { useEffect, useState } from "react";

const EmpNoti = (props) => {
    const [notiData, setNotiData] = useState({});

    useEffect(() => {
        axios.get("/api/notifications/requestreceived").then((res) => {
            setNotiData(res.data);
        });
    }, []);

    return (
        <div>
            <div style={{marginLeft:"10px", marginTop:"10px"}}>
            <button
                type="button"
                className="btn btn-info btn-lg "
                onClick={() => {
                    props.func("dashboard");
                }}
            >
                Dashboard
            </button>
            </div>
            
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Notification Details</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Sport: {notiData.sport}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Venue: {notiData.venue}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Request Status: {notiData.approval}</h6>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default EmpNoti;
