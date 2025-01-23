import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../Media/signup-vector.avif'; 
import './siginresponsive.css';

function Sign_up() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [company, setCompany] = useState('');
  const navigate = useNavigate();

  // Handle form submission
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
      const data = response.data;
      navigate('/signin');
      console.log(data.message);
    } catch (error) {
      console.error('Error Signing up user:', error);
    }
  };

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#fff' }}>
      {/* Left side: Image */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} alt="Atom Aviation Logo" className="rounded-2xl" style={{ maxHeight: '80%', maxWidth: '80%' }} />
      </div>

      {/* Right side: Form */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card p-3 shadow-lg w-75" style={{ background: '#fff' }}>
          <h1 className="text-center text-[30px] mb-1">Sign Up Here</h1>
          <hr className='m-1' />

          <form onSubmit={SignupUser}>
            <div className="form-group mb-3">
              <div className='font-bold'>
                <label className="form-label">Name</label>
              </div>
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
              <div className='font-bold'>
                <label className="form-label">Email</label>
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                className="form-control"
                placeholder='Email'
                required
              />
            </div>

            <div className="form-group mb-3">
              <div className='font-bold'>
                <label className="form-label">Password</label>
              </div>
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
              <div className='font-bold'>
                <label className="form-label">Confirm Password</label>
              </div>
              <input
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                type='password'
                className="form-control"
                placeholder='Confirm Password'
                required
              />
            </div>

            <div className="form-group mb-3">
              <div className='font-bold'>
                <label className="form-label">Company Name</label>
              </div>
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

          <p className="text-center mt-3">
            Have an account? <Link to="/signin">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sign_up;
