// import { useHistory } from "react-router-dom";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Checklogin from './CheckLogin';
import './Login.scss';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
function Login() {
    const [loginn, setLogin] = useState({
        acount: '',
        password: ''
    })
    const [user, setUser] = useState({
        role: 'user',
        acount: 'user',
        password: '1234'
    })
    const [admin, setAdmin] = useState({
        role: 'admin',
        acount: 'admin',
        password: '1234'
    })
    let navigate = useNavigate();
    let login = () => {
        // JSON.stringify(user)
        if (loginn.acount == user.acount && loginn.password == user.password) {
            localStorage.setItem("accessToken", user.role);
            navigate("/Page_member");
        }
        else if (loginn.acount == admin.acount && loginn.password == admin.password) {
            localStorage.setItem("accessToken", admin.role);
            // history.replace("/admin")
            navigate("/admin");
        }
        else {
            // history.replace("login")
            alert('nhap sai tk va mk')
        }
    }
    const checkLogin = (event, item) => {
        let coppyState = { ...loginn }
        coppyState[item] = event.target.value;
        setLogin({
            ...coppyState
        })
        // console.log(loginn);
    }
    return <div className="">
        {localStorage.removeItem("accessToken")}
        <div class="container">
            <div class="d-flex justify-content-center h-100">
                <div class="card">
                    <div class="card-header">
                        <h3>Sign In</h3>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </div>
                                <input type="text" class="form-control" placeholder="username" onChange={(event) => checkLogin(event, "acount")} />
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                                </div>
                                <input type="text" class="form-control" placeholder="password" onChange={(event) => checkLogin(event, "password")} />
                            </div>
                            <div class="form-group">
                                <input type="submit" value="Login" class="btn float-right login_btn" onClick={() => login()} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className="container">
            <form className="form-row">
                <div class="form-group col-12">
                    <label >Acount</label>
                    <input type="text" class="form-control" onChange={(event) => checkLogin(event, "acount")} placeholder="Your account" />
                </div>
                <div class="form-group col-12">
                    <label >Password</label>
                    <input type="text" class="form-control" onChange={(event) => checkLogin(event, "password")} placeholder="Password" />
                </div>
                <button type="submit" class="btn btn-primary" onClick={() => login()}>Submit</button>
            </form>
        </div> */}
    </div>
}

export default Login;