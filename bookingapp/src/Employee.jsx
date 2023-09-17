import axios from "axios"
import {Navigate, useNavigate} from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import EmpDashboard from "./EmpDashboard";
import EmpNoti from "./EmpNoti";

let Employee = () => {
    let [userinfo,setUserinfo] = useState({})
    
    const emailRef = useRef("");
    const passRef = useRef("");
    const navigate = useNavigate();
    const [show,setShow] = useState("login");

    const login = () => {
      //console.log(emailRef.current.value)

      axios.post("/logincheck",{email:emailRef.current.value,
      password:passRef.current.value}).then((res)=>{
        if(res.data===true){
          console.log("done")
          setShow("dashboard")
        }
        else{
          alert("false")
    }})
    }

    const updateShow = (showstatus) => {
      setShow(showstatus);
    }
    
    useEffect(()=>{console.log(show)},[])

    return <div>{show==="login" ? <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6 bg-light p-4 rounded">
        <h3 className="mb-4 text-center">Employee Login</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="form-control"
              placeholder="Your email address"
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={passRef}
              className="form-control"
              placeholder="Your password"
            />
          </div>
  
          <div className="mb-3 text-center">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={login}
              >
                Sign In
              </button>
            </div>
  
      
          </div>
        </form>
      </div>
    </div>
  </div>
  :show==="dashboard"?<EmpDashboard func={updateShow}/>:<EmpNoti func={updateShow}/>}</div>
} 


export default Employee;