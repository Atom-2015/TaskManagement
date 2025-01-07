

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import backgroundImage from '../img/Worldmap.png'; 
import logo from '../Media/atom1.png';
import { Oval } from 'react-loader-spinner'; 
import './siginresponsive.css'


function Sign_in() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);

    async function HandleSignin(e) {
        e.preventDefault();
        setLoader(true);
        try {
            const response = await axios.post('http://13.201.248.202:3001/api/Signin', { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.data;
            setLoader(false);
            if (data.user) {
                localStorage.setItem('token', data.user);
                localStorage.setItem('company_id', data.company_id);
                window.location.href = '/main';
            } else {
                // alert('Please check your username and password');
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
            <div 
                className="d-flex flex-column justify-content-center align-items-center min-vh-100" 
                style={{
                    // backgroundImage: `url(${backgroundImage})`, 
                    // backgroundSize: 'cover', 
                    // backgroundPosition: 'center',
                    // backgroundRepeat: 'no-repeat',
                    // position: 'relative',
                    // opacity: '1'
                }}
            >
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)'
                    }}
                ></div>
                
                <div className="card p-4 shadow-lg w-100 ]" id='signinMain' style={{ maxWidth: '400px', position: 'relative', zIndex: 1 , background: '#1e1e1e' }}>
                    <div className='textsign'><h1 className='text-center text-white'>Sign In</h1></div>
                    <div className='d-flex justify-center'>
                        <img src={logo} alt="Atom Aviation Logo" className='rounded-2xl mb-3 h-[200px]' id='imagesign' />
                    </div>

                    <form onSubmit={HandleSignin}>
                        <div className="form-group mb-3 emailSign">
                            <label className="form-label text-white">Email Address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Enter Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="form-group mb-3 emailSign">
                            <label className="form-label text-white">Password</label>
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

                    <p className="text-center mt-3 text-white" id='parasign'>
                        Don't have an account? <Link to="/signup" className="text-white">Sign up here</Link>
                    </p>

                    <div className="text-center mt-3" id='para2sign'>
                        <Link to="/terms" className="text-white me-3">Terms and Conditions</Link>
                        <Link to="/contact" className="text-white">Contact Us</Link>
                    </div>
                </div>

                <footer 
                    className="position-fixed bottom-0 start-0 p-3"
                    style={{ left: '0', bottom: '0', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white' }}
                >
                    <div className="d-flex align-items-center">
                        <span className="me-3">v1.0.0</span>
                    </div>
                </footer>
            </div>
        )}
        </>
    );
}

export default Sign_in;
