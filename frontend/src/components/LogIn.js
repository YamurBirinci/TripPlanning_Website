import React, { useState } from 'react';
import '../styles/LogIn.css';
import '../styles/Primary.css'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

function LogIn() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const ClickingHomepage = () => {
        navigate('/');
    };

    const ClickingSignUp = () => {
        navigate('/SignUp');
    };

    const handleMailChange = (e) => {
        setMail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {   
        fetch('http://localhost:8081/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.jwt) {
                login({ userId: data.userId, role: data.role, jwt: data.jwt });
                toast.success('You have successfully logged in, The Journey begins!');
                navigate('/'); 
            } else {
                toast.error('Please try again!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error('Please try again!');
        });
    };



    return (
        <div className='background-homepage'>
            <ToastContainer />
            <div className="Background_SignUp_Rectangle" style={{transform: 'scale(0.87)'}}>
                <button className="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent'}} onClick={ClickingHomepage}></button>
                <div className="SignUp-line"></div>
                
                <div className="text_group field" style={{ width: '459px', top: '0px', left: '375px'}}>
                    <input 
                        type="email" 
                        className="text_box" 
                        style={{ width: '459px'}} 
                        placeholder="mail" 
                        name="mail" 
                        id='mail' 
                        required 
                        value={mail}
                        onChange={handleMailChange}
                    />
                    <label htmlFor="mail" className="group_label"> <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> E-mail</label>
                </div>
                <div className="text_group field" style={{ width: '459px', top: '-90px', left: '375px'}}>
                    <input 
                        type="password" 
                        className="text_box" 
                        style={{ width: '459px'}} 
                        placeholder="Password" 
                        name="Password" 
                        id='Password' 
                        required 
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <label htmlFor="Password" className="group_label"> <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password</label>
                </div>

                <button className="login_button" onClick={handleLogin}>Log In!</button>
                <button className="to_signup" onClick={ClickingSignUp}>I want to create an account</button>
            </div>
        </div>
    );
}

export default LogIn;
