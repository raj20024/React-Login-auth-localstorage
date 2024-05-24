import React, { useState } from 'react'

function Checkbox() {

    const [data, setData] = useState({
        language:[]
    })
    const handleChange = (e) => {
        console.log(data.language)
        if (e.target.checked) {
            setData({language :[...data.language, e.target.value]})
        } else {
            setData({language:data.language.filter((el) => el !== e.target.value)})
        }

    }
    const submitHandle=(e)=>{
        e.preventDefault();
        console.log(data)
    }

    return (
        <>
            <div className='w-50'>
                <form onSubmit={submitHandle}>
                    
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
                    <button className="btn btn-primary mt-3"
                        type="submit">Submit</button>
                </form>
            </div>

        </>
    )
}

export default Checkbox