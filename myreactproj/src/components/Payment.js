import React  from 'react';
import '../styles/SignUp.css';
import '../styles/Primary.css'; 
import { useNavigate } from 'react-router-dom';

function Payment() {

    const navigate = useNavigate();

    const ClickingHomepage = () => {
        navigate('/');
    };

    return (
        <div class="Background_SignUp_Rectangle">
            <button class="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent'}} onClick={ClickingHomepage} ></button>
            <div class="SignUp-line"></div>
            
            <div className='Payment-Panel-Container'>
            <div class="container">
                <div class="form__group field" style={{ width: '200px', left: '-40px', top: '-70px' }}>
                    <input type="input" class="form__field" style={{ width: '200px'}} placeholder="month" name="month" id='month' required />
                    <label for="month" class="form__label">Expiration Month</label>
                </div>
                <div class="form__group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                    <input type="input" class="form__field" style={{ width: '200px'}} placeholder="year" name="year" id='year' required />
                    <label for="year" class="form__label">Expiration Year</label>
                </div>
            </div>
            <div class="form__group field" style={{ width: '459px', top: '-170px', left: '375px'}}>
                <input type="input" class="form__field" style={{ width: '459px'}} placeholder="Number" name="Number" id='Number' required />
                <label for="Number" class="form__label">Card Number</label>
            </div>
            <div class="form__group field" style={{ width: '459px', top: '-270px', left: '375px'}}>
                <input type="input" class="form__field" style={{ width: '459px'}} placeholder="CVC" name="CVC" id='CVC' required />
                <label for="CVC" class="form__label">CVC Code</label>
            </div>

            <button className="Payment_button">Pay Now!</button>
            
            </div>
        </div>
    );

}
export default Payment;