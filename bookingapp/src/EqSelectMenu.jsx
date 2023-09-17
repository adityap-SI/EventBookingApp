import axios from "axios";
import { useEffect, useState } from "react";

const EqSelectMenu = (props) => {
    const [equipments, setEquipments] = useState([]);

    const eqsinfo = () => {
        axios.post("/geteqsinfo", { sport: props.sport, venue: props.venue }).then((res) => {
            setEquipments(res.data[0].Equipment);
        });
    }

    const handleEquipmentSelection = (selectedItem) => {
        props.onSelect(selectedItem);
    }

    return (
        <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            onClick={eqsinfo}
            required
            onChange={(e) => handleEquipmentSelection(e.target.value)}
        >
            <option value="" disabled selected>
                Select Equipment
            </option>
            {equipments.map((eq, ind) => (
                <option key={ind} value={eq}>
                    {eq}
                </option>
            ))}
        </select>
    );
}

export default EqSelectMenu;
