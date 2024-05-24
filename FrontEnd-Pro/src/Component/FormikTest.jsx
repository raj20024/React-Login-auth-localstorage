import axios from "axios";
import React, { useState } from "react";
import * as yup from "yup";
import { Formik, useFormik, ErrorMessage } from "formik";
//const api="http://localhost:5000/signup";
const FormikTest = () => {
    const registerHandler = async (values, actions) => {
        //formik.setFieldValue
       // console.log(values.photo[0])
        // const payload = {
        //     name: values.name,
        //     email: values.email,
        //     password: values.password,
        //     language: values.language,
        //     occupation: values.occupation,
        //     gender: values.gender,
        //     photo: values.photo,
        // };

    const formData_2 = new FormData();
    formData_2.append("name", values.name);
    formData_2.append("email", values.email);
    formData_2.append("password", values.password);
    formData_2.append("gender", values.gender);
    formData_2.append("occupation", values.occupation);
    formData_2.append("language", values.language);
    for (let i = 0; i < values.photo.length; i++) {
        formData_2.append("photo", values.photo[0]);
    }

    console.log(formData_2)
        axios.post("http://localhost:5000/signup2", formData_2, {
            headers: {
                ///accessToken: localStorage.getItem("accessToken"),
                "content-type": "multipart/form-data",
            },
        })
            .then(res => {
                if (res.status === 200) {
                    // 200 means POST method response with success 
                    // Pass your server response to Formik
                    actions.setStatus({ success: 'Email sent !' })
                    actions.resetForm();
                    actions.setFieldValue("photo",'',false);
                    actions.setSubmitting(false);
                }
            })
            .catch(err => console.log(err))
    };
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            language: [],
            occupation: "",
            gender: "",
            photo: null,
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .min(3, "Must be more than 3 characters")
                .required("Required"),
            email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Required"),
            password: yup.string().required("Required"),

        }),
        onSubmit: registerHandler
    });

    return (
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div className="container">
                <div>Success message here:

                    <div>Success message here: {formik.setStatus.success}</div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <label>name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formik.values.name}
                            placeholder="Enter name Name"
                            className="form-control"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <p style={{ color: "red" }}>{formik.errors.name}</p>
                        ) : null}
                    </div>
                    <div className="col-lg-4">
                        <label>email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p style={{ color: "red" }}>{formik.errors.email}</p>
                        ) : null}
                    </div>
                    <div className="col-lg-4">
                        <label>Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <p style={{ color: "red" }}>{formik.errors.password}</p>
                        ) : null}
                    </div>


                    <div>
                        <label className="form-label">Occupation:</label>
                        <select className="form-select" aria-label="Default select example" name="occupation" onChange={formik.handleChange}>
                            <option defaultValue>Open this select menu</option>
                            <option defaultValue="1">Job</option>
                            <option defaultValue="2">Business</option>
                        </select>

                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1"
                            value="Male"
                            checked={formik.values.gender.includes('Male')}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault2"
                            value="Female"
                            checked={formik.values.gender.includes('Female')}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Female
                        </label>
                    </div>
                    <div className="htmlForm-check">
                        <input className="htmlForm-check-input" type="checkbox" name='language' id="flexCheckDefault"
                            value="Html"
                            checked={formik.values.language.includes('Html')}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label className="htmlForm-check-label" htmlFor="flexCheckDefault">
                            Default checkbox
                        </label>
                    </div>
                    <div className="htmlForm-check">
                        <input className="htmlForm-check-input" name='language' type="checkbox" id="flexCheckChecked"

                            value="Java"
                            checked={formik.values.language.includes('Java')}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}


                        />
                        <label className="htmlForm-check-label" htmlFor="flexCheckChecked">
                            Checked checkbox
                        </label>
                    </div>

                    {/* <input
            autoComplete="off"
            multiple
            id="image"
            name="photo"
            accept='image/*'
            type="file"
            onChange={event => formik.setFieldValue("photo",event.currentTarget.files[0])}
       /> */}
                    <input
                        name="photo"
                        type="file"
                        multiple
                        onChange={(event) => {
                            formik.setFieldValue("photo", event.currentTarget.files);
                        }}
                    />
                    <div className="col-lg-12 mt-4">
                        <input type="submit" className="btn btn-primary" value={"submit"} disabled={formik.isSubmitting} />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FormikTest;
