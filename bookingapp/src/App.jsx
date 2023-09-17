import {BrowserRouter,Routes,Route} from "react-router-dom"
import Layout from "./Layout";
import Home from "./Home";
import Employee from "./Employee";
import Admin from "./Admin";
import EmpDashboard from "./EmpDashboard";
import axios from "axios"

import { useEffect, useState } from "react";
import AdmAdd from "./AdminAdd";
import AdminNoti from "./AdminNoti";




let App = () => {
    
    // useEffect(()=>{
    //     axios.get("/api").then((res)=>{console.log(res.data.message)})
    // },[])

    // const message = () => {
    //     axios.post("/postreq",{data:"success data"}).then((res)=>{console.log(res)})
    // }
    
    return <div>
       
        
       
        
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/employee" element={<Employee/>}/>
                {/* <Route path="/employeedashboard" element={<EmpDashboard/>}/>
                <Route path="/admindashboard" element={<AdmAdd/>}/> */}
                {/* <Route path="/notifications" element={<AdminNoti/>}/> */}
            </Route>
        </Routes>
        </BrowserRouter>
    </div>
}

export default App;