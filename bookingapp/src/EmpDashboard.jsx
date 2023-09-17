import axios from "axios";
import { useRef, useState } from "react";
import EqSelectMenu from "./EqSelectMenu";

const EmpDashboard = (props) => {
    const [sports, setSports] = useState([]);
    const [venues, setVenues] = useState([]);
    const [equipmentCount, setEquipmentCount] = useState(0);
    const [selectedEquipment, setSelectedEquipment] = useState([]);

    const selectedSport = useRef([]);
    const selectedVenue = useRef([]);

    const sportsinfo = () => {
        axios.get("/getsportinfo").then((res) => {
            setSports(res.data);
        });
    };

    const venuesinfo = () => {
        axios.post("/getvenuesinfo", { sport: selectedSport.current.value }).then((res) => {
            setVenues(res.data);
        });
    };

    const approvalrequest = () => {
        if (!selectedSport.current.value || !selectedVenue.current.value || equipmentCount === 0) {
            alert("Please fill in all the required fields.");
            return;
        }

        axios.post("/api/notifications/requestreceived", {
            sport: selectedSport.current.value,
            venue: selectedVenue.current.value,
            equipment: selectedEquipment,
        })
        .then(() => {
            setEquipmentCount(0);
            selectedSport.current.value = "";
            selectedVenue.current.value = "";
            setSelectedEquipment([]);
            alert("Request has been sent to the admin.");
        });
    };

    const generateEquipmentComponents = () => {
        const equipmentComponents = [];
        for (let i = 0; i < equipmentCount; i++) {
            equipmentComponents.push(
                <div key={i} className="mb-3">
                    <EqSelectMenu
                        sport={selectedSport.current.value}
                        venue={selectedVenue.current.value}
                        placeholder={`Equipment ${i + 1} Placeholder`}
                        onSelect={(selected) => {
                            setSelectedEquipment((prevSelected) => [...prevSelected, selected]);
                        }}
                    />
                </div>
            );
        }
        return equipmentComponents;
    };

    return (
        <div>
            <div style={{ marginLeft: "10px", marginTop: "10px" }}>
                <button
                    type="button"
                    className="btn btn-info btn-lg"
                    onClick={() => {
                        props.func("notifications");
                    }}
                >
                    Notifications
                </button>
            </div>

            <div className="container mt-5" style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
                <h2>Select Event Details</h2>

                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="selectSport" className="form-label">Select Sport</label>
                        <select
                            id="selectSport"
                            className="form-select form-select-lg mb-3"
                            ref={selectedSport}
                            aria-label=".form-select-lg example"
                            onClick={sportsinfo}
                            style={{ backgroundColor: '#fff' }}
                        >
                            <option value="" disabled selected>
                                Choose a Sport
                            </option>
                            {sports.map((sport) => (
                                <option key={sport.Name}>{sport.Name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="selectVenue" className="form-label">Select Venue</label>
                        <select
                            id="selectVenue"
                            className="form-select form-select-lg mb-3"
                            ref={selectedVenue}
                            aria-label=".form-select-lg example"
                            onClick={venuesinfo}
                            style={{ backgroundColor: '#fff' }}
                        >
                            <option value="" disabled selected>
                                Choose a Venue
                            </option>
                            {venues.map((data) => (
                                <option key={data.Venue}>{data.Venue}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        {generateEquipmentComponents()}
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="numberEq" className="form-label">Enter Number of Equipments</label>
                        <input
                            id="numberEq"
                            type="number"
                            className="form-control mb-3"
                            placeholder="Enter number of equipment components"
                            value={equipmentCount}
                            onChange={(e) => setEquipmentCount(parseInt(e.target.value))}
                        />
                        <button
                            type="button"
                            className="btn btn-success btn-lg"
                            onClick={approvalrequest}
                        >
                            Send Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpDashboard;
