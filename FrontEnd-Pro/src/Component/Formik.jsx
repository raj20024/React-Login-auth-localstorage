import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Formik() {
    
    const formik = useFormik({

        initialValues:{
                name: '',
                email: '',
                password: '',
                language: [],
                occupation: '',
                gender: '',
                photot: null,
    
            },

            onSubmit:(values, { setSubmitting, resetForm }) => {
                axios.post('http://localhost:5000/signup', values)
                  .then((response) => {
                    console.log(response.data.message);
                    resetForm();
                  })
                  .catch((error) => {
                    console.error(error);
                  })
                  .finally(() => {
                    setSubmitting(false);
                  });
              } ,

    });

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data"  className='w-50 mx-auto bg-light p-4'>
            <div className="mb-3">
                <label className="form-label">Name </label>
                <input className="form-control"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
                <label className="form-label">Email </label>
                <input className="form-control"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Password </label>
                <input className="form-control"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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

            <div>
                <label className="form-label">Profile:</label>
                <input className="form-control" type="file" multiple name='photo' onChange={(e) =>
            formik.setFieldValue('photo', e.currentTarget.files[0])
          }
                />
            </div>
            <button type="submit">Submit</button>
        </form>
        </Formik>
    );
}

export default Formik