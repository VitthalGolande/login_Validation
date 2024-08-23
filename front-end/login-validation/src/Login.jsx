import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  Validation from'./Loginvalidation'
import Axios from "axios"

function Login() {
    const [values, setValues] = useState({
        email: '',
        password :''
    })
    const navigate = useNavigate();
    const [error, setErrors]=useState({})

    const handleInput=(event)=>{
        setValues(prev =>({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
       setErrors(Validation(values));

       if(error.email === '' && error.password === ''){
        Axios.post("http://localhost:8081/login", values)
        .then(res => {
            if(res.data === "success"){
                navigate("/home")
            }else{
                alert("No Record Exist")
            }
        })
        .catch(err => console.log(err))
       }
    }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
       <div className='bg-white p-3 rounded w-25 '>
        <h2>Login</h2>
           <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='Enter email' className='form-control rounded-0'
                    onChange={handleInput} name='email'/>
                    {error.email && <span className='text-danger'>{error.email}</span>} 
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter password' className='form-control rounded-0'
                    onChange={handleInput} name='password'/>
                    {error.password && <span className='text-danger'>{error.password}</span>}
                </div>
                <button type="submit" className='btn btn-success w-100 rounded-0'><strong>Log in</strong></button>
                <p>You are agree to our terms and conditions</p>
                <Link to='/Signup' className='btn btn-default border w-100 bg-light rounded-0'>Create Account</Link>
            </form>
       </div>
    </div>
  )
}

export default Login