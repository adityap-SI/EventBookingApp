import React, { useRef, useState } from "react";
import axios from "axios";

const AdmAdd = (props) => {
  const sportRef = useRef("");
  const venueRef = useRef("");
  const equipmentCountRef = useRef("");
  const timeRef = useRef("");

  const [equipmentItems, setEquipmentItems] = useState([]);
  const [equipmentCount, setEquipmentCount] = useState(0);
  const [errors, setErrors] = useState({
    sport: "",
    venue: "",
    time: "",
  });

  const AddData = () => {
    let formIsValid = true;
    const newErrors = {
      sport: "",
      venue: "",
      time: "",
    };

    if (!sportRef.current.value) {
      newErrors.sport = "Sport field is required.";
      formIsValid = false;
    }

    if (!venueRef.current.value) {
      newErrors.venue = "Venue field is required.";
      formIsValid = false;
    }

    if (equipmentCount === 0) {
      newErrors.equipmentCount = "Please specify the number of equipments.";
      formIsValid = false;
    }

    if (!timeRef.current.value) {
      newErrors.time = "Duration field is required.";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (!formIsValid) {
      return;
    }

    const equipmentData = {
      sport: sportRef.current.value,
      venue: venueRef.current.value,
      equipment: equipmentItems,
      duration: timeRef.current.value,
    };

    axios
      .post("/hrsportsdata", equipmentData)
      .then((response) => {
        alert("Event Added!\nThe event has been successfully added.");
      })
      .catch((error) => {});

    console.log(equipmentData);
  };

  const updateShow = () => {
    props.func("notifications");
  };

  const handleEquipmentCountChange = (event) => {
    let count = parseInt(event.target.value) || 0;
    // Clamp the count to be non-negative
    count = Math.max(0, count);
    setEquipmentCount(count);
    setEquipmentItems(new Array(count).fill(""));
  };

  const renderEquipmentFields = () => {
    const fields = [];

    for (let i = 0; i < equipmentCount; i++) {
      fields.push(
        <div className="mb-3" key={i}>
          <h4>Add Equipment {i + 1}</h4>
          <input
            type="text"
            className="form-control"
            value={equipmentItems[i]}
            onChange={(e) => {
              const updatedItems = [...equipmentItems];
              updatedItems[i] = e.target.value;
              setEquipmentItems(updatedItems);
            }}
          />
        </div>
      );
    }

    return fields;
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <button className="btn btn-primary mb-3" onClick={updateShow}>
            Notifications
          </button>
          <h3>Add Sport</h3>
          <input type="text" className="form-control" ref={sportRef} />
          {errors.sport && <p className="text-danger">{errors.sport}</p>}
          <h3>Add Venue</h3>
          <input type="text" className="form-control" ref={venueRef} />
          {errors.venue && <p className="text-danger">{errors.venue}</p>}
          <h3>Add Number of Equipments</h3>
          <input
            type="number"
            className="form-control"
            ref={equipmentCountRef}
            value={equipmentCount}
            onChange={handleEquipmentCountChange}
          />
          {errors.equipmentCount && (
            <p className="text-danger">{errors.equipmentCount}</p>
          )}
          {renderEquipmentFields()}
          <h3>Add Duration</h3>
          <input type="text" className="form-control" ref={timeRef} />
          {errors.time && <p className="text-danger">{errors.time}</p>}

          <button className="btn btn-success mt-3" onClick={AddData}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmAdd;
