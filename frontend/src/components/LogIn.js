import React  from 'react';
import '../styles/LogIn.css';
import '../styles/Primary.css'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons';


function SignUp() {

    const navigate = useNavigate();

    const ClickingHomepage = () => {
        navigate('/');
    };

    const ClickingSignUp = () => {
        navigate('/SignUp');
    };

    return (
        <div className='background-homepage'>
            <div class="Background_SignUp_Rectangle" style={{transform: 'scale(0.9)'}}>
                <button class="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent'}} onClick={ClickingHomepage} ></button>
                <div class="SignUp-line"></div>
                
                <div class="text_group field" style={{ width: '459px', top: '0px', left: '375px'}}>
                    <input type="input" class="text_box" style={{ width: '459px'}} placeholder="mail" name="mail" id='mail' required />
                    <label htmlFor="mail" class="group_label"> <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> E-mail</label>
                </div>
                <div class="text_group field" style={{ width: '459px', top: '-90px', left: '375px'}}>
                    <input type="password" class="text_box" style={{ width: '459px'}} placeholder="Password" name="Password" id='Password' required />
                    <label htmlFor="Password" class="group_label"> <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password</label>
                </div>

                <button className="login_button">Log In!</button>
                <button className="to_signup" onClick={ClickingSignUp}>I want to create an account</button>

            </div>
        </div>
    );

}
export default SignUp;