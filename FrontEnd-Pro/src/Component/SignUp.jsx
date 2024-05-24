import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SignUp() {
    // const [name, setName] = useState();
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    const navigate =useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        occupation: '',
        gender: '',
        language: [],


    });
   
    const [files, setFile] = useState([]);
    const [fileError, setFileError] = useState("")
    const [errors, setErrors] = useState({});
    const [message, setmessage] = useState("");
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    const handleChange = (e) => {
        console.log(formData);
        if (e.target.name === "language") {
            //let copy = {...formData}
            if (e.target.checked) {
                setFormData({...formData,'language': [...formData.language, e.target.value]})
            } else {
                alert(formData.language)
                setFormData({...formData,'language': formData.language.filter((el) => el !== e.target.value) })
            }
            //setFormData(copy)

        } else {
            setFormData(() => ({
                ...formData, [e.target.name]: e.target.value
            }))
        }

    }


    // const config={
    //     Headers:{
    //         "content-Type":"multipart/form-data"
    //     }
    // }
    const formData_2 = new FormData();
    formData_2.append("name", formData.name);
    formData_2.append("email", formData.email);
    formData_2.append("password", formData.password);
    formData_2.append("gender", formData.gender);
    formData_2.append("occupation", formData.occupation);
    formData_2.append("language", formData.language);
    for (let i = 0; i < files.length; i++) {
        formData_2.append("photo", files[i]);
    }

    console.log(formData_2);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log( formData)
        const newErrors = validateForm(formData);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            if (files.length === 0) {
                return setFileError('Upload File');
            } else {
                axios.post("http://localhost:5000/signup", formData_2,)
                    .then(res => {
                        console.log(res)
                        setmessage('Form submitted successfully!');
                        localStorage.setItem("user", JSON.stringify(res.data[0].user));
                        //console.log(res.data[0].user)
                       //e.target.reset();
                        setFormData({name:""});
                        navigate('/ridrect');
                    }
                    )
                    .catch(err => console.log(err))
            }

        } else {
            console.log(`Form submission failed due to validation errors.`);
        }
    };

    const validateForm = (data) => {
       // console.log('datavalidation' + data)
        const errors = {};
        if(!data.name.trim()) {
            errors.name = 'name is required';
        }
        if(!data.gender) {
           
            errors.gender = 'gender is required';
        }
        if(data.language.length === 0) {
            errors.language = 'language is required' ;
        }
       
        if (!data.occupation) {
            errors.occupation = 'occupation is required';
        }
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }
        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 8) {
            errors.password = `Password must be at 
            least 8 characters long`;
        }
        return errors;
    };

    useEffect(()=>{
        const auth =localStorage.getItem('user')
        if(auth){
            navigate('/') 
        }
    })

  
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100 ">


                <form onSubmit={handleSubmit} className='col-md-6 bg-light p-4 shadow-lg rounded-4'>
                    {message &&
                        <span className="error-message" style={{ color: "green", fontSize: "18px" }}>
                            {message}
                        </span>
                    }
                    <div>
                        <label className="form-label">
                            name:
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            defaultValue={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name &&
                            <span className="error-message" style={{ color: "red", fontSize: "11px" }}>
                                {errors.name}
                            </span>
                        }
                    </div>
                    <div>
                        <label className="form-label">
                            Email:
                        </label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            defaultValue={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email &&
                            <span className="error-message" style={{ color: "red", fontSize: "11px" }}>
                                {errors.email}
                            </span>
                        }
                    </div>
                    <div>
                        <label className="form-label">Password:</label>
                        <input className="form-control" type="password" name="password" defaultValue={formData.password}
                            onChange={handleChange} />
                        {errors.password && <span className="error-message" style={{ color: "red", fontSize: "11px" }}>
                            {errors.password}
                        </span>
                        }
                    </div>
                   
                    <div>
                        <label className="form-label">Occupation:</label>
                        <select className="form-select" aria-label="Default select example" name="occupation" defaultValue={formData.occupation} onChange={handleChange}>
                            <option defaultValue>Open this select menu</option>
                            <option defaultValue="1">Job</option>
                            <option defaultValue="2">Business</option>
                        </select>
                        {errors.occupation && <span className="error-message" style={{ color: "red", fontSize: "11px" }}>
                            {errors.occupation}
                        </span>
                        }
                    </div>
                    <div>
                        <label className="form-label">Gender</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="exampleRadios1" value="Male" onChange={handleChange} />
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="exampleRadios2" value="Female" onChange={handleChange} />
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                Female
                            </label>
                        </div>

                        {errors.gender && <span className="error-message" style={{ color: "red", fontSize: "11px" }}>
                            {errors.gender}
                        </span>
                        }
                    </div>
                    <div>
                        <label className="form-label">Laguage:</label>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue="Hindi" name="language" onChange={handleChange} />
                            <label className="form-check-label"  >Hindi  </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue="English" name="language" onChange={handleChange}  />
                            <label className="form-check-label" >    English  </label>
                        </div>
                        {errors.language && <span className="error-message" style={{ color: "red", fontSize: "11px" }}>
                            {errors.language}
                        </span>
                        }
                    </div>
                    <div>
                        <label className="form-label">Profile:</label>
                        <input className="form-control" type="file" multiple name='photo' onChange={(e) => setFile(e.target.files)}
                        />
                        {fileError && <span className="error-message" style={{ color: "red", fontSize: "11px" }}>
                            {fileError} </span>}
                    </div>

                    <button className="btn btn-primary mt-3"
                        type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default SignUp