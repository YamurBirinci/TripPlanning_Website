import React  from 'react';
import '../styles/SignUp.css';
import '../styles/Primary.css'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faCreditCard, faClock} from '@fortawesome/free-solid-svg-icons';


function Payment() {

    const navigate = useNavigate();

    const ClickingHomepage = () => {
        navigate('/');
    };

    const ComfirmToPayment = () => {
        const isConfirmed = window.confirm("Are you sure?");
        if (isConfirmed) {
            ClickingHomepage();
        } 
    }

    return (
        <div className="Background_SignUp_Rectangle">
            <button className="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent'}} onClick={ClickingHomepage} ></button>
            <div className="SignUp-line"></div>
            
            <div className='Payment-Panel-Container'>
            <div className="container">
                <div className="form__group field" style={{ width: '200px', left: '-40px', top: '-70px' }}>
                    <input type="input" className="form__field" style={{ width: '200px'}} placeholder="month" name="month" id='month' required />
                    <label htmlFor="month" className="form__label"><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Month</label>
                </div>
                <div className="form__group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                    <input type="input" className="form__field" style={{ width: '200px'}} placeholder="year" name="year" id='year' required />
                    <label htmlFor="year" className="form__label"><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Year</label>
                </div>
            </div>
            <div className="form__group field" style={{ width: '459px', top: '-170px', left: '375px'}}>
                <input type="input" className="form__field" style={{ width: '459px'}} placeholder="Number" name="Number" id='Number' required />
                <label htmlFor="Number" className="form__label"><FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon> Card Number</label>
            </div>
            <div className="form__group field" style={{ width: '459px', top: '-270px', left: '375px'}}>
                <input type="input" className="form__field" style={{ width: '459px'}} placeholder="CVC" name="CVC" id='CVC' required />
                <label htmlFor="CVC" className="form__label"> <FontAwesomeIcon icon={faHashtag}></FontAwesomeIcon> CVC Code</label>
            </div>

            <button className="Payment_button" onClick={ComfirmToPayment}>Pay Now!</button>
            
            </div>
        </div>
    );

}
export default Payment;
