


import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../Media/drone1.webp'; 
import logo from '../Media/atom1.png'; 
import './siginresponsive.css'
 

function Sign_up() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [company , setCompany] = useState('');

  // Handle form submission
  const navigate = useNavigate();
  const SignupUser = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://13.201.248.202:3001/api/Signup', {
        name,
        email,
        password,
        confirmpassword,
        company
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      //  handleSuccess("User Created Successfully");
      const data = response.data;
      navigate('/signin')
      console.log(data.message);
      
    } catch (error) {
      // console.error(error.message);
      // handleError(error.response.data.message)
      console.error('Error Signing up user:', error);
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center min-vh-100 " 
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use imported image
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
        
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)' // Overlay color and opacity
        }}
      ></div>
      
      <div className="card p-3 shadow-lg w-100  " id='mainsignup' style={{ maxWidth: '500px', position: 'relative', zIndex: 1 , backgroundColor: '#1e1e1e'  }}>
        <h1 className="text-center text-[30px] mb-1 text-white">Sign Up Here</h1> 
        <hr className='text-white m-1'></hr>

        <div className='d-flex justify-center '>
        <div className='imgsignup'>   <img src={logo} alt="Atom Aviation Logo" className=' rounded-2xl   mb-3 h-[200px]' /> </div>
        </div>
           
        
        <form onSubmit={SignupUser}>
          <div className='flex  justify-between'>
          <div className="form-group mb-3">
           <div className='font-bold'> <label className="form-label text-white">Name</label> </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              className="form-control"
              placeholder='Name'
              required
            />
          </div>
          <div className="form-group mb-3">
          <div className='font-bold'>      <label className="form-label text-white">Email</label></div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              className="form-control"
              placeholder='Email'
              required
            />
          </div>
          </div>






          <div className='flex  justify-between'>
          <div className="form-group mb-3">
          <div className='font-bold'>    <label className="form-label text-white">Password</label>   </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className="form-control"
              placeholder='Password'
              required
            />
          </div>
          <div className="form-group mb-3">
          <div className='font-bold'>   <label className="form-label text-white">Confirm Password</label>  </div>
            <input
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              type='password'
              className="form-control"
              placeholder='Confirm Password'
              required
            />
          </div>
          </div>



          <div className="form-group mb-3">
          <div className='font-bold'>     <label className="form-label text-white ">Company Name</label></div>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              type='text'
              className="form-control"
              placeholder='Company Name'
              required
            />
          </div>

     
          <div className="d-flex justify-content-between">
            <button type='submit' className="btn btn-primary">Submit</button>
            <button type='reset' className="btn btn-secondary">Reset</button>
          </div>
        </form>
        <p className="text-center mt-3 text-white" id='signuppara'>
          Have an account? <Link to="/signin">Sign in here</Link>
        </p>
      </div>
      {/* <ToastContainer/> */}
    </div>
    
  );
}

export default Sign_up;











