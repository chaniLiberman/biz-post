import { FunctionComponent, useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiteTheme } from "../App";

interface NavbarProps {
    userInfo: any;
    setUserInfo: Function;
    darkMode:boolean;
    setDarkMode:Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({ userInfo, setUserInfo ,darkMode,setDarkMode}) => {
    let theme =useContext(SiteTheme);
    let navigate = useNavigate();
    return (
        <div className={`navbarStyle ${theme}`}>
            <nav className="navbar navbar-expand-lg shadow" data-bs-theme={`${theme}`}>
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/cards">
                        <img src="/Images/logo.PNG" style={{ width: "220px", height: "65px" }} />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">

                        <div className="navbar-nav">
                            <NavLink className="nav-link" to="/about">ABOUT</NavLink>
                        </div>

                        <div className="navbar-nav">
                            <NavLink className="nav-link" to="/cards">HOME</NavLink>
                        </div>

                        <div className="navbar-nav">
                            {userInfo.role == "Regular" || userInfo.role == "Business" || userInfo.role == "Admin" ? (
                                <NavLink className="nav-link" to="fav-cards">FAV CARDS</NavLink>
                            )
                                :
                                (null)
                            }
                        </div>


                        <div className="navbar-nav">
                            {userInfo.role == "Business" || userInfo.role == "Admin" ? (
                                <NavLink className="nav-link" to="/my-cards">MY CARDS</NavLink>
                            )
                                :
                                (null)
                            }
                        </div>

                        <div className="navbar-nav">
                            {userInfo.role == "Admin" && (
                                <NavLink className="nav-link" to="/sand-box">SAND BOX</NavLink>
                            )}
                        </div>

                        <form className="d-flex justify-content-space-between ml-auto">
                            {userInfo.email == false && <>
                                <div className="navbar-nav">
                              <NavLink className="nav-link" to="/register">SIGNUP</NavLink>
                              </div>
                              <div className="navbar-nav">
                              <NavLink className="nav-link" to="/login">LOGIN</NavLink>
                              </div>
                            </>}

                            <div onClick={() => {setDarkMode(!darkMode);
                            localStorage.setItem("darkMode", JSON.stringify(!darkMode));}}>
                                {darkMode? (<i className="fa-solid fa-moon fa-xl pt-3" style={{color: "#ffffff"}}></i>) : (<i className="fa-solid fa-sun fa-xl pt-3"></i>)}
                            </div>

                            {userInfo.email && (
                                <>
                                    <div className="ml-auto d-flex ms-auto" role="search">
                                        <img src="/Images/user.png" alt="user" style={{ width: "40px", height: "40px" }} onClick={() => {
                                            alert("click ok if you want to logout")
                                            sessionStorage.removeItem("userInfo")
                                            setUserInfo({ email: false, role: false })
                                            navigate("/cards")
                                        }} />
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div >
            </nav >
        </div>
        )
}

export default Navbar;