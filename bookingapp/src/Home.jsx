import { Link } from "react-router-dom";

let Home = () => {
    return <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"80vh"}}>
        <div >
        <Link to="/Employee"><button type="button" class="btn btn-primary btn-lg">Employee</button></Link>
        <Link to="/Admin"><button type="button" class="btn btn-secondary btn-lg">Admin</button></Link>
        </div>
    </div>
}

export default Home;