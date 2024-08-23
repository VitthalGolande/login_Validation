import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from "./Signupvalidation"
import  Axios  from 'axios'

function Signup() {

    const [values, setValues] = useState({
        name:'',
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
       setErrors(validation(values));
       if(error.name === '' && error.email === '' && error.password === ''){
        Axios.post("http://localhost:8081/Signup", values)
        .then(res => {
            navigate('/');
        })
        .catch(err => console.log(err))
       }
    }


  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
       <div className='bg-white p-3 rounded w-25 '>
        <h2>Sign-up</h2>
           <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type="text" placeholder='Enter name' name='name'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {error.name && <span className='text-danger'>{error.name}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='Enter email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {error.email && <span className='text-danger'>{error.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter password' name='password' 
                    onChange={handleInput} className='form-control rounded-0'/>
                    {error.password && <span className='text-danger'>{error.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Sign up</strong></button>
                <p>Already have a account</p>
                <Link to='/' className='btn btn-default border w-100 bg-light rounded-0'>Back to Login</Link>
            </form>
       </div>
    </div>
  )
}

export default Signup