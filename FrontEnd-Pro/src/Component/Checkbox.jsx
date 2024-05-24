import React, { useState } from 'react'

function Checkbox() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        language :[]
      
    });
 
    const [errors, setErrors] = useState({});
 
    const handleChange = (e) => {
       // const { name, value } = e.target;
       // setFormData({...formData,[name]: value,});
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
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        const newErrors = validateForm(formData);
        setErrors(newErrors);
 
        if (Object.keys(newErrors).length === 0) {
            // Form submission logic here
            console.log('Form submitted successfully!');
        } else {
            console.log(`Form submission failed
             due to validation errors.`);
        }
    };
 
    const validateForm = (data) => {
        const errors = {};
 
        if (!data.username.trim()) {
            errors.username = 'Username is required';
        }
 
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }
 
        return errors;
    };
 
    return (
        <div className="form-container w-50 mx-auto">
            <h2 className="form-title">Form Validation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">
                        Username:
                        </label>
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username &&
                        <span className="error-message">
                            {errors.username}
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
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email &&
                        <span className="error-message">
                            {errors.email}
                        </span>
                    }
                </div>
                <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="language" value="Hindi" onChange={handleChange} />
                        <label className="form-check-label" for="flexRadioDefault2">
                            Hindi
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="language" value="English" onChange={handleChange} />
                        <label className="form-check-label" for="flexRadioDefault2">
                            Hindi
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="language" value="Math" onChange={handleChange} />
                        <label className="form-check-label" for="flexRadioDefault2">
                            Hindi
                        </label>
                    </div>
                
                
                <button className="submit-button"
                    type="submit">Submit</button>
            </form>
        </div>
    );
}
 
export default Checkbox;