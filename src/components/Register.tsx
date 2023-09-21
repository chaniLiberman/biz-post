import { useFormik } from "formik";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addUser, getTokenDetails } from "../services/usersService";
// import { JsxEmit } from "typescript";
// import { json } from "stream/consumers";
// import Card from "../interfaces/Card";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { SiteTheme } from "../App";


interface RegisterProps {
    setUserInfo: Function;
}

const Register: FunctionComponent<RegisterProps> = ({ setUserInfo }) => {
    let theme = useContext(SiteTheme);
    let [roles, setRoles] = useState<boolean>(false);
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            middleName: "",
            phone: "",
            password: "",
            email: "",
            imgUrl: "",
            imgAlt: "",
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: 0,
            zip: 0,
            role: "",
            favCards: [],
        },
        validationSchema: yup.object({
            firstName: yup.string().required().min(2),
            lastName: yup.string().required().min(2),
            middleName: yup.string().notRequired(),
            phone: yup.string().required().min(9),
            email: yup.string().required().email(),
            password: yup.string().required().min(8),
            imgAlt: yup.string().notRequired(),
            imgUrl: yup.string().notRequired(),
            state: yup.string().notRequired(),
            country: yup.string().required().min(2),
            city: yup.string().required().min(2),
            street: yup.string().required().min(2),
            houseNumber: yup.number().required(),
            zip: yup.number().notRequired(),
            role: yup.string().notRequired(),
        }),
        onSubmit: (values) => {
            let role = roles ? 'Business' : 'Regular'
            values = { ...values, role: role }
            addUser({ ...values, favCards: [] })
                .then((res) => {
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
                    successMsg(`hello ${values.email} wellcome`)
                    navigate("/cards");
                    setUserInfo(
                        JSON.parse(sessionStorage.getItem("userInfo") as string)
                    );
                })
                .catch((err) => {
                    errorMsg("Data must be checked again")
                    console.log(err)
                })
        }
    })
    useEffect(() => {
              formik.setFieldValue("houseNumber", "");
            }, []);
        
    useEffect(() => {
             formik.setFieldValue("zip", "");
           }, []);
    return (
        <div className={`registerStyle ${theme}`}>
        <h5 className="display-1 text-center">REGISTER</h5>
            <div className="container col-md-6 text-center input backGround">
                <form className="row g-3" onSubmit={formik.handleSubmit}>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="firstName"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">First name *</label>
                        {formik.errors.firstName && formik.touched.firstName && <p className="text-danger">{formik.errors.firstName}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="middleName"
                            onChange={formik.handleChange}
                            value={formik.values.middleName}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Middle name</label>
                        {formik.errors.middleName && formik.touched.middleName && <p className="text-danger">{formik.errors.middleName}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="lastName"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Last name *</label>
                        {formik.errors.lastName && formik.touched.lastName && <p className="text-danger">{formik.errors.lastName}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Phone *</label>
                        {formik.errors.phone && formik.touched.phone && <p className="text-danger">{formik.errors.phone}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="email" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Email *</label>
                        {formik.errors.email && formik.touched.email && <p className="text-danger">{formik.errors.email}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="password" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Password *</label>
                        {formik.errors.password && formik.touched.password && <p className="text-danger">{formik.errors.password}</p>}

                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="imgUrl"
                            onChange={formik.handleChange}
                            value={formik.values.imgUrl}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Choose Image</label>
                        {formik.errors.imgUrl && formik.touched.imgUrl && <p className="text-danger">{formik.errors.imgUrl}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="imgAlt"
                            onChange={formik.handleChange}
                            value={formik.values.imgAlt}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Write ImgAlt</label>
                        {formik.errors.imgAlt && formik.touched.imgAlt && <p className="text-danger">{formik.errors.imgAlt}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="state"
                            onChange={formik.handleChange}
                            value={formik.values.state}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">State</label>
                        {formik.errors.state && formik.touched.state && <p className="text-danger">{formik.errors.state}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="country"
                            onChange={formik.handleChange}
                            value={formik.values.country}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Country *</label>
                        {formik.errors.country && formik.touched.country && <p className="text-danger">{formik.errors.country}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="city"
                            onChange={formik.handleChange}
                            value={formik.values.city}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">City *</label>
                        {formik.errors.city && formik.touched.city && <p className="text-danger">{formik.errors.city}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="street"
                            onChange={formik.handleChange}
                            value={formik.values.street}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Street *</label>
                        {formik.errors.street && formik.touched.street && <p className="text-danger">{formik.errors.street}</p>}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="number" className="form-control" id="validationCustom01"
                            placeholder="houseNumber"
                            value={formik.values.houseNumber}
                            name="houseNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">House Number *</label>
                        {formik.touched.houseNumber && formik.errors.houseNumber && (<p className="text-danger">{formik.errors.houseNumber}</p>)}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="number" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="zip"
                            onChange={formik.handleChange}
                            value={formik.values.zip}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">zip</label>
                        {formik.errors.zip && formik.touched.zip && <p className="text-danger">{formik.errors.zip}</p>}
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input position-absolute" type="checkbox"
                                onChange={() => setRoles(!roles)}
                                id="invalidCheck"
                                name="role"
                                //onChange={formik.handleChange}
                                value={formik.values.role}
                            //onBlur={formik.handleBlur}
                            />
                            <label className="form-check-label" htmlFor="invalidCheck">
                                Signup as business
                            </label>
                        </div>
                    </div>
                    <button className="btn btn-primary mb-4" type="submit" style={{ background: "#947427", border: "#947427" }} disabled={!formik.isValid || !formik.dirty}>Submit</button>
                </form >
                
                <button className="btn btn-danger col-md-6" onClick={() => navigate(-1)}>Cancel</button>
                    <button className="btn btn-success col-md-6" onClick={() => formik.resetForm()}><i className="fa-solid fa-rotate"></i></button>
                <Link to="/login">already have user ? login here</Link>
            </div>
        </div>
    )
}

export default Register;