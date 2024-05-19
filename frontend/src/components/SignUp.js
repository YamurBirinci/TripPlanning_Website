import React  from 'react';
import '../styles/SignUp.css';
import '../styles/Primary.css'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faEnvelope} from '@fortawesome/free-solid-svg-icons';

function SignUp() {

    const navigate = useNavigate();

    const ClickingHomepage = () => {
        navigate('/');
    };
    const ClickingLogin = () => {
        navigate('/Login');
    };
    return (
        <div className="Background_SignUp_Rectangle">
            <button className="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent'}} onClick={ClickingHomepage} ></button>
            <div className="SignUp-line"></div>
            
            <div className="container">
                <div className="text_group field" style={{ width: '200px', left: '-40px', top: '-70px' }}>
                    <input type="input" className="text_box" style={{ width: '200px'}} placeholder="First Name" name="Name" id='Name' required />
                    <label htmlFor="name" className="group_label"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> First Name</label>
                </div>
                <div className="text_group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                    <input type="input" className="text_box" style={{ width: '200px'}} placeholder="Last Name" name="Last Name" id='LastName' required />
                    <label htmlFor="name" className="group_label"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Last Name</label>
                </div>
            </div>
            <div className="text_group field" style={{ width: '459px', top: '-170px', left: '375px'}}>
                <input type="input" className="text_box" style={{ width: '459px'}} placeholder="mail" name="mail" id='mail' required />
                <label htmlFor="mail" className="group_label"><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> E-mail</label>
            </div>
            <div className="text_group field" style={{ width: '459px', top: '-270px', left: '375px'}}>
                <input type="password" className="text_box" style={{ width: '459px'}} placeholder="Password" name="Password" id='Password' required />
                <label htmlFor="Password" className="group_label"><FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password</label>
            </div>
            <div className="text_group field" style={{ width: '459px', top: '-370px', left: '375px'}}>
                <input type="password" className="text_box" style={{ width: '459px'}} placeholder="Password Confirmation" name="Confirmation" id='Confirmation' required />
                <label htmlFor="Confirmation" className="group_label"><FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password Confirmation</label>
            </div>

            <button className="signup_button">Sign up!</button>
            <button className="to_login" onClick={ClickingLogin}>I already have an account</button>

        </div>
    );

}
export default SignUp;