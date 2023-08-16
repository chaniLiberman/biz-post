import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addCard } from "../services/cardsService";
import { successMsg } from "../services/feedbacksService";

interface AddCardProps {

}

const AddCard: FunctionComponent<AddCardProps> = () => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            userId: 0,
            title: "",
            subTitle: "",
            description: "",
            phone: "",
            email: "",
            web: "",
            imageUrl: "",
            imageAlt: "",
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: 0,
            zip: 0,
        },
        validationSchema: yup.object({
            title: yup.string().required(),
            subTitle: yup.string().required(),
            description: yup.string().required().max(15),
            phone: yup.string().required().min(9),
            email: yup.string().required().email("Please Valid Email"),
            web: yup.string(),
            imageUrl: yup.string().required(),
            imageAlt: yup.string().required(),
            state: yup.string(),
            country: yup.string().required(),
            city: yup.string().required(),
            street: yup.string().required(),
            houseNumber: yup.number().required(),
            zip: yup.number()
        }),
        onSubmit: (values) => {
            let userId = JSON.parse(sessionStorage.getItem("userInfo") as string).id
            addCard({ ...values, userId })
                .then((res) => {
                    navigate("/cards")
                    successMsg("card added successfully!!")
                })
                .catch((err) => console.log(err))
        }
    })
    useEffect(() => {
        formik.setFieldValue("houseNumber", "");
      }, []);
  
useEffect(() => {
       formik.setFieldValue("zip", "");
     }, []);
    return (
        <>
                <h5 className="display-1 text-center">Add New Card</h5>
                <div className="container col-md-6 pb-3 input backGround">
                <form className="row g-3" onSubmit={formik.handleSubmit}>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="title"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Title *</label>
                        {formik.errors.title && formik.touched.title && <p className="text-danger">{formik.errors.title}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="subTitle"
                            name="subTitle"
                            onChange={formik.handleChange}
                            value={formik.values.subTitle}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">subTitle *</label>
                        {formik.errors.subTitle && formik.touched.subTitle && <p className="text-danger">{formik.errors.subTitle}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Description *</label>
                        {formik.errors.description && formik.touched.description && <p className="text-danger">{formik.errors.description}</p>}
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
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="web"
                            onChange={formik.handleChange}
                            value={formik.values.web}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Link to your web</label>
                        {formik.errors.web && formik.touched.web && <p className="text-danger">{formik.errors.web}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="imageUrl"
                            onChange={formik.handleChange}
                            value={formik.values.imageUrl}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Choose image *</label>
                        {formik.errors.imageUrl && formik.touched.imageUrl && <p className="text-danger">{formik.errors.imageUrl}</p>}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="name@example.com"
                            name="imageAlt"
                            onChange={formik.handleChange}
                            value={formik.values.imageAlt}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">Write imageAlt *</label>
                        {formik.errors.imageAlt && formik.touched.imageAlt && <p className="text-danger">{formik.errors.imageAlt}</p>}
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
                            placeholder="zip"
                            name="zip"
                            onChange={formik.handleChange}
                            value={formik.values.zip}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="validationCustom01" className="form-label">zip</label>
                        {formik.errors.zip && formik.touched.zip && <p className="text-danger">{formik.errors.zip}</p>}
                    </div>
                    <button className="btn btn-danger col-md-6" onClick={() => navigate(-1)}>Cancel</button>
                    <button className="btn btn-success col-md-6" onClick={() => formik.resetForm()}><i className="fa-solid fa-rotate"></i></button>
                    <button className="btn btn-primary" type="submit" style={{ background: "#947427", border: "#947427" }} disabled={!formik.isValid || !formik.dirty}>Add Card</button>
                </form >
            </div>
        </>
    )
}

export default AddCard;