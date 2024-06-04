import React, { useState } from 'react';
import '../styles/SignUp.css';
import '../styles/Primary.css'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const navigate = useNavigate();

    const ClickingHomepage = () => {
        navigate('/');
    };

    const ClickingLogin = () => {
        navigate('/Login');
    };

    const handleSignUp = () => {
        if (password !== passwordConfirmation) {
            toast.error('The two passwords do not match. Please try again.');
            return;
        }

        fetch('http://localhost:8081/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                first_name: firstName, 
                last_name: lastName, 
                mail, 
                password,
                role: 'Customer'
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            toast.success('You have successfully registered!');
            setTimeout(() => {
                navigate('/Login');
            }, 5000);
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error('Something went wrong, please try again!');
        });
    };

    return (
        <div className='background-homepage'>
            <ToastContainer />
            <div className="Background_SignUp_Rectangle" style={{transform: 'scale(0.9)'}}>
                <button className="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent'}} onClick={ClickingHomepage}></button>
                <div className="SignUp-line"></div>
                
                <div className="container">
                    <div className="text_group field" style={{ width: '200px', left: '-40px', top: '-70px' }}>
                        <input 
                            type="input" 
                            className="text_box" 
                            style={{ width: '200px'}} 
                            placeholder="First Name" 
                            name="Name" 
                            id='Name' 
                            required 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label htmlFor="name" className="group_label"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> First Name</label>
                    </div>
                    <div className="text_group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                        <input 
                            type="input" 
                            className="text_box" 
                            style={{ width: '200px'}} 
                            placeholder="Last Name" 
                            name="Last Name" 
                            id='LastName' 
                            required 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label htmlFor="name" className="group_label"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Last Name</label>
                    </div>
                </div>
                <div className="text_group field" style={{ width: '459px', top: '-170px', left: '375px'}}>
                    <input 
                        type="input" 
                        className="text_box" 
                        style={{ width: '459px'}} 
                        placeholder="mail" 
                        name="mail" 
                        id='mail' 
                        required 
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />
                    <label htmlFor="mail" className="group_label"><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> E-mail</label>
                </div>
                <div className="text_group field" style={{ width: '459px', top: '-270px', left: '375px'}}>
                    <input 
                        type="password" 
                        className="text_box" 
                        style={{ width: '459px'}} 
                        placeholder="Password" 
                        name="Password" 
                        id='Password' 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="Password" className="group_label"><FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password</label>
                </div>
                <div className="text_group field" style={{ width: '459px', top: '-370px', left: '375px'}}>
                    <input 
                        type="password" 
                        className="text_box" 
                        style={{ width: '459px'}} 
                        placeholder="Password Confirmation" 
                        name="Confirmation" 
                        id='Confirmation' 
                        required 
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <label htmlFor="Confirmation" className="group_label"><FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password Confirmation</label>
                </div>

                <button className="signup_button" onClick={handleSignUp}>Sign up!</button>
                <button className="to_login" onClick={ClickingLogin}>I already have an account</button>
            </div>
        </div>
    );
}

export default SignUp;
