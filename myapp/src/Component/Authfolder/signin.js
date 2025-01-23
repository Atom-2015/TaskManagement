import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../Media/vectorsi.avif';
import { Oval } from 'react-loader-spinner'; 
import './siginresponsive.css';
import axiosInstance from '../../axiosInstance';

function Sign_in() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);

    async function HandleSignin(e) {
        e.preventDefault();
        setLoader(true);
        try {
            const response = await axiosInstance.post('/api/user/Signin', { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.data;
            setLoader(false);
            if (data.user) {
                localStorage.setItem('token', data.user);
                localStorage.setItem('company_id', data.company_id);
                window.location.href = '/dashboard';
            }
        } catch (error) {
            setLoader(false);
            console.log(`Frontend sign_in axios error: ${error}`);
        }
    }

    function resetpass() {
        setEmail('');
        setPassword('');
    }

    return (
        <>
        {loader ? (
            <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    secondaryColor="#4fa94d"
                    ariaLabel="loading"
                    wrapperStyle={{}}
                    visible={true}
                />
            </div>
        ) : (
            <div className="d-flex min-vh-100" style={{ backgroundColor: '#fff' }}>
                {/* Left side: Image */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={logo} alt="Atom Aviation Logo" className="rounded-2xl" style={{ maxHeight: '80%', maxWidth: '80%' }} />
                </div>

                {/* Right side: Form */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="card p-4 shadow-lg w-75" style={{ background: '#fff' }}>
                        <h1 className="text-center">Sign In</h1>
                        <form onSubmit={HandleSignin}>
                            <div className="form-group mb-3">
                                <label className="form-label">Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Enter Email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Enter Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="reset" className="btn btn-secondary" onClick={resetpass}>Reset</button>
                            </div>
                        </form>

                        <p className="text-center mt-3">
                            Don't have an account? <Link to="/signup">Sign up here</Link>
                        </p>

                        <div className="text-center mt-3">
                            <Link to="/terms" className="me-3">Terms and Conditions</Link>
                            <Link to="tel:+91980000000">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default Sign_in;
