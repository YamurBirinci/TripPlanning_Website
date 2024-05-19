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
        <div class="Background_SignUp_Rectangle">
            <button class="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent'}} onClick={ClickingHomepage} ></button>
            <div class="SignUp-line"></div>
            
            <div class="form__group field" style={{ width: '459px', top: '0px', left: '375px'}}>
                <input type="input" class="form__field" style={{ width: '459px'}} placeholder="mail" name="mail" id='mail' required />
                <label htmlFor="mail" class="form__label"> <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> E-mail</label>
            </div>
            <div class="form__group field" style={{ width: '459px', top: '-90px', left: '375px'}}>
                <input type="password" class="form__field" style={{ width: '459px'}} placeholder="Password" name="Password" id='Password' required />
                <label htmlFor="Password" class="form__label"> <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password</label>
            </div>

            <button className="login_button">Log In!</button>
            <button className="to_signup" onClick={ClickingSignUp}>I want to create an account</button>

        </div>
    );

}
export default SignUp;