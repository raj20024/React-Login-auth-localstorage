import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Redirect() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/signup")     
     }, [])
  return (
    <div>{}</div>
  )
}

export default Redirect