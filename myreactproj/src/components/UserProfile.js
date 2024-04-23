import React, { useState } from 'react';
import '../styles/UserProfile.css';
import '../styles/Primary.css'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCoins} from '@fortawesome/free-solid-svg-icons';



function SignUp() {

    const [activeButton, setActiveButton] = useState('MyProfile');
    const [activePanel, setActivePanel] = useState('MyProfile-Panel');

    const clickingButton = (buttonId, panelName) => {
        setActiveButton(buttonId);
        setActivePanel(panelName);
    };

    const navigate = useNavigate();

    const ClickingHomepage = () => {
        navigate('/');
    };

    return (
        <div className="Background_Rectangle" style={{ height: '800px'}}>
            <button class="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent'}} onClick={ClickingHomepage} ></button>
            <button className={`MyProfileMyDiscounts ${activeButton === 'MyProfile' ? 'Active-MyProfileMyDiscounts' : ''}`}
                onClick={() => clickingButton('MyProfile', 'MyProfile-Panel')}>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> My Profile
            </button>
            <button className={`MyProfileMyDiscounts ${activeButton === 'MyDiscounts' ? 'Active-MyProfileMyDiscounts' : ''}`}
                onClick={() => clickingButton('MyDiscounts', 'MyDiscounts-Panel')}>
                <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon> My Discounts
            </button>

            <div class="line" style={{ top: '220px'}}></div>

            {activePanel === 'MyProfile-Panel' && <div className='MyProfile-Panel'>
                <div className="MyProfileMyDiscounts-Panel-Container">
                    <div className="container">
                        <div className="form__group field" style={{ width: '200px', left: '-40px', top: '-70px' }}>
                            <input type="input" className="form__field" style={{ width: '200px'}} placeholder="First Name" name="Name" id='Name' required/>
                            <label for="name" className="form__label">First Name</label>
                        </div>
                        <div className="form__group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                            <input type="input" className="form__field" style={{ width: '200px'}} placeholder="Last Name" name="Last Name" id='LastName' required />
                            <label for="name" className="form__label">Last Name</label>
                        </div>
                    </div>
                    <div className="form__group field" style={{ width: '459px', top: '-170px', left: '375px'}}>
                        <input type="input" className="form__field" style={{ width: '459px'}} placeholder="mail" name="mail" id='mail' required />
                        <label for="mail" className="form__label">E-mail</label>
                    </div>
                    <div className="form__group field" style={{ width: '459px', top: '-270px', left: '375px'}}>
                        <input type="password" className="form__field" style={{ width: '459px'}} placeholder="Password" name="Password" id='Password' required />
                        <label for="Password" className="form__label">Password</label>
                    </div>
                    <div className="form__group field" style={{ width: '459px', top: '-370px', left: '375px'}}>
                        <input type="password" className="form__field" style={{ width: '459px'}} placeholder="Password Confirmation" name="Confirmation" id='Confirmation' required />
                        <label for="Confirmation" className="form__label">Password Confirmation</label>
                    </div>
                    <button className="signup_button" style={{marginTop: '20px'}}>Update!</button>
                </div>
            </div>}

            {activePanel === 'MyDiscounts-Panel' && <div className='MyDiscounts-Panel'>
                <div className="MyProfileMyDiscounts-Panel-Container" style={{top: '280px'}}>
                    <div className="Discounts-Box">
                        <div>Number of comments</div> 
                        <div style={{fontSize: '35px', fontWeight: 'bold'}}>?</div> 
                    </div>
                    <div className="Discounts-Box"> 
                        <div>Number of reservations</div> 
                        <div style={{fontSize: '35px', fontWeight: 'bold'}}>?</div> 
                    </div>
                    <div className="Discounts-Box" style={{backgroundColor: '#6d9b6d62'}}> 
                        <div>The discount I won</div> 
                        <div style={{fontSize: '35px', fontWeight: 'bold'}}>?</div> 
                    </div>
                </div>
            </div>}

            

        </div>
    );

}
export default SignUp;