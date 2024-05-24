import React from 'react'
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-50 mx-auto bg-light rounded-4 shadow-lg p-5 mt-5">
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Email is Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Password is Required';
            }
            return errors;
          }}

          onSubmit={(values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append("email", values.email);
            formData.append("password", values.password);
            axios.post("http://localhost:5000/login", formData, {
              headers: {
                ///accessToken: localStorage.getItem("accessToken"),
                "content-type": "application/json",
              },
            }


            )
              .then(res => {
                console.log(res)
                // setmessage('Form submitted successfully!');

                localStorage.setItem("user", JSON.stringify(res.data[0].user));
                //e.target.reset();
                navigate('/');
              }
              )
              .catch(err => console.log(err))

          }}
        >

          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */

          }) => (

            <form onSubmit={handleSubmit}>
              <div>
                <label className='form-label'>Email</label>
                <input
                  className='form-control'
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && <small className='text-danger'>{errors.email}</small>}
              </div>
              <div >
                <label className='form-label'>Password</label>
                <input
                  className='form-control'
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />


                {errors.password && touched.password && <small className='text-danger'>{errors.password}</small>}
              </div>
              <button type="submit" disabled={isSubmitting} className='btn btn-danger mt-3'>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Login