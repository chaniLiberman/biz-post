import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { checkUser, getTokenDetails } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbacksService";


interface LoginProps {
    setUserInfo: Function
}

const Login: FunctionComponent<LoginProps> = ({ setUserInfo }) => {
    let navigate = useNavigate();
    let formik = useFormik(
        {
            initialValues: {
                password: "",
                email: "",
            },
            validationSchema: yup.object(
                {
                    email: yup.string().required().email("Please Enter Valid Email"),
                    password: yup.string().required().min(8),
                }
            ),
            onSubmit: (values) => {
                checkUser(values)
                    .then((res) => {
                        navigate("/cards");
                        successMsg(`hello ${values.email}`)
                        sessionStorage.setItem(
                            "token",
                            JSON.stringify({
                                token:res.data
                            }));
                        sessionStorage.setItem(
                            "userInfo",
                            JSON.stringify({
                                email: (getTokenDetails() as any).email,
                                role: (getTokenDetails() as any).role,
                                id: (getTokenDetails() as any)._id
                            }));
                            
                            setUserInfo(
                                JSON.parse(sessionStorage.getItem("userInfo") as string)
                            );
                        }
                    )
                     .catch((err) => {
                        errorMsg("Wrong email or password")
                        console.log(err)
                    });
            }
        }
    );
    return (
        <div>
        <h5 className="display-1 text-center">LOGIN</h5>
            <div className="container col-md-3 text-center pt-3 input backGround">
                <form className="text-center" onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="floatingInput"> Email *</label>
                        {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="floatingPassword">Password *</label>
                        {formik.touched.password && formik.errors.password && <p className="text-danger">{formik.errors.password}</p>}
                    </div>

                    <button type="submit" className="btn btn-success mt-3 w-100" style={{ background: "#947427", border: "#947427" }}
                        disabled={!formik.isValid || !formik.dirty}>
                        LOGIN
                    </button>
                </form>
                <Link to="/register">new user ? register here</Link>
            </div>
        </div>
    )
}

export default Login;