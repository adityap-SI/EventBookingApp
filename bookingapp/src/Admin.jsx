import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdmAdd from "./AdminAdd";
import AdminNoti from "./AdminNoti";

let Admin = () => {
    const emailRef = useRef("");
    const passRef = useRef("");
    const navigate = useNavigate();
    const [show,setShow] = useState("login");

    const changeShow = (data)=>{
      setShow(data)
      //console.log(data)
    }

    // const login = () => {
    //   //console.log(emailRef.current.value)

    //   axios.post("/admincheck",{email:emailRef.current.value,
    //   password:passRef.current.value}).then((res)=>{
    //     if(res.data===true){
    //       console.log("done")
    //       setShow("dashboard")
    //     }
    //     else{
    //       alert("false")
    // }})
    // }


    
    return <div>
        {show==="login" ? <AdminLogin func={changeShow}/> :
         show==="dashboard" ? <AdmAdd func={changeShow}/> : 
        <AdminNoti func={changeShow}/>}
    </div>
}



export default Admin;