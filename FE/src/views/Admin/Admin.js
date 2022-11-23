// import { useHistory } from "react-router-dom";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
function Admin() {
    let navigate = useNavigate();
    let Logout = () => {
        localStorage.removeItem("accessToken");
        navigate("/Login")
    }
    return <div>
        <h2>Page Admin</h2>
        <button className="btn btn-danger" onClick={() => Logout()}>Logout</button>
    </div>
}

export default Admin;