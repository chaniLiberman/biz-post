import { FunctionComponent, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SiteTheme, UserInfo } from "../App";

interface FooterProps {
    userInfo: any;
    setUserInfo:Function;
}

const Footer: FunctionComponent<FooterProps> = ({ userInfo,setUserInfo }) => {
     let theme =useContext(SiteTheme);
     let navigate=useNavigate();
    return (
        
        <div className={`footerStyle ${theme}`}>
            <footer className="py-5 pb-3 mt-5 shadow: 0 10px 20px 0 rgba(0,0,0,.1)">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-md-2">
                            <h5>Regular User</h5>
                            <ul className="nav flex-column">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                                {userInfo.role == "Regular" || userInfo.role == "Business" || userInfo.role == "Admin" ? (
                                    <NavLink className="nav-link" to="fav-cards">Fav Cards</NavLink>
                                )
                                    :
                                    (null)
                                }


                            </ul>
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>Business | Admin</h5>
                            <ul className="nav flex-column">
                                {userInfo.role == "Business" || userInfo.role == "Admin" ? (
                                    <NavLink className="nav-link" to="/my-cards">My Cards</NavLink>
                                )
                                    :
                                    (null)
                                }
                                {userInfo.role == "Admin" && (
                                    <NavLink className="nav-link" to="/sand-box">Sand Box</NavLink>
                                )}
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>Connect with us</h5>
                            <ul className="nav flex-column">
                                {userInfo.email == false && <>
                                    <NavLink className="nav-link" to="/register">SIGNUP</NavLink>
                                    <NavLink className="nav-link" to="/login">LOGIN</NavLink>
                                </>}
                                {userInfo.email && (
                                <>
                                        <NavLink className="nav-link" onClick={() => {
                                            alert("click ok if you want to logout");
                                            sessionStorage.removeItem("userInfo");
                                            setUserInfo({ email: false, role: false });
                                            navigate("/cards");
                                        } } to={""}>LOG-OUT</NavLink> 
                                </>
                            )}
                            </ul>
                        </div>

                        <div className="col-md-5 offset-md-1 mb-3">
                            <form>
                                <h5>Subscribe to our newsletter</h5>
                                <p>Monthly digest of what's new and exciting from us.</p>
                                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                    <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                    <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                                    <button className="btn btn-secondary" type="button">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row justify-content-between py-2 my-2 border-top">
                        <p>© 2023 Chani Liberman, Inc. All rights reserved.</p>
                        <ul className="list-unstyled d-flex">
                            <li className="ms-3">
                                <i className="fa-brands fa-twitter fa-xl"></i>
                            </li>
                            <li className="ms-3">
                                <i className="fa-brands fa-facebook-f fa-xl"></i>
                            </li>
                            <li className="ms-3">
                                <i className="fa-brands fa-youtube fa-xl"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer >
        </div>
    )
}

export default Footer;