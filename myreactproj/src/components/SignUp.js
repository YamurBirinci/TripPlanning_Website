import React  from 'react';
import '../styles/SignUp.css';
import '../styles/Primary.css'; 
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const navigate = useNavigate();

    const ClickingHomepage = () => {
        navigate('/');
    };
    const ClickingLogin = () => {
        navigate('/Login');
    };
    return (
        <div class="Background_SignUp_Rectangle">
            <button class="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent'}} onClick={ClickingHomepage} ></button>
            <div class="SignUp-line"></div>
            
            <div class="container">
                <div class="form__group field" style={{ width: '200px', left: '-40px', top: '-70px' }}>
                    <input type="input" class="form__field" style={{ width: '200px'}} placeholder="First Name" name="Name" id='Name' required />
                    <label for="name" class="form__label">First Name</label>
                </div>
                <div class="form__group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                    <input type="input" class="form__field" style={{ width: '200px'}} placeholder="Last Name" name="Last Name" id='LastName' required />
                    <label for="name" class="form__label">Last Name</label>
                </div>
            </div>
            <div class="form__group field" style={{ width: '459px', top: '-170px', left: '375px'}}>
                <input type="input" class="form__field" style={{ width: '459px'}} placeholder="mail" name="mail" id='mail' required />
                <label for="mail" class="form__label">E-mail</label>
            </div>
            <div class="form__group field" style={{ width: '459px', top: '-270px', left: '375px'}}>
                <input type="password" class="form__field" style={{ width: '459px'}} placeholder="Password" name="Password" id='Password' required />
                <label for="Password" class="form__label">Password</label>
            </div>
            <div class="form__group field" style={{ width: '459px', top: '-370px', left: '375px'}}>
                <input type="password" class="form__field" style={{ width: '459px'}} placeholder="Password Confirmation" name="Confirmation" id='Confirmation' required />
                <label for="Confirmation" class="form__label">Password Confirmation</label>
            </div>

            <button className="signup_button">Sign up!</button>
            <button className="to_login" onClick={ClickingLogin}>I already have an account</button>

        </div>
    );

}
export default SignUp;