import React, { useState } from 'react';
import '../styles/UserProfile.css';
import '../styles/Primary.css'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCoins, faBed} from '@fortawesome/free-solid-svg-icons';
import Angeles1 from '../images/Angeles1.PNG';
import Angeles5 from '../images/Angeles5.PNG';

const UserReservations = [
    { Rez_Date: "13/08/2024 - 16/08/2024", Hotel_Name: "Hotel Angeles Center", Hotel_Info: "4-Star Hotel", Hotel_Location: "Calle Juan De Mata Carriazo 7, Seville, Spain", Hotel_Price: 146, image: Angeles1 },
    { Rez_Date: "29/05/2024 - 04/09/2024", Hotel_Name: "Hotel Cervantes", Hotel_Info: "5-Star Hotel", Hotel_Location: "Old Town, Seville, Spain", Hotel_Price: 176, image: Angeles5},
];


function UserProfile() {

    const [activeButton, setActiveButton] = useState('MyProfile');
    const [activePanel, setActivePanel] = useState('MyProfile-Panel');

    const clickingButton = (buttonId, panelName) => {
        setActiveButton(buttonId);
        setActivePanel(panelName);
    };


    const ConfirmToCancel = () => {
        const isConfirmed = window.confirm("Are you sure?");
        if (isConfirmed) {
            ClickingHomepage();
        } 
    }
    
    const navigate = useNavigate();

    const ClickingHomepage = () => {
        navigate('/');
    };

    return (
        <div className="Background_Rectangle" style={{ height: '800px'}}>
            <button className="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent'}} onClick={ClickingHomepage} ></button>
            <button className={`ProfileButton ${activeButton === 'MyProfile' ? 'Active-ProfileButton' : ''}`}
                onClick={() => clickingButton('MyProfile', 'MyProfile-Panel')}>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> My Profile
            </button>
            <button className={`ProfileButton ${activeButton === 'MyReservations' ? 'Active-ProfileButton' : ''}`}
                onClick={() => clickingButton('MyReservations', 'MyReservations-Panel')}>
                <FontAwesomeIcon icon={faBed}></FontAwesomeIcon> My Reservations
            </button>
            <button className={`ProfileButton ${activeButton === 'MyDiscounts' ? 'Active-ProfileButton' : ''}`}
                onClick={() => clickingButton('MyDiscounts', 'MyDiscounts-Panel')}>
                <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon> My Discounts
            </button>

            <div className="line" style={{ top: '220px'}}></div>

            {activePanel === 'MyProfile-Panel' && <div className='MyProfile-Panel'>
                <div className="ProfileButton-Panel-Container">
                    <div className="container">
                        <div className="form__group field" style={{ width: '200px', left: '-40px', top: '-70px' }}>
                            <input type="input" className="form__field" style={{ width: '200px'}} placeholder="First Name" name="Name" id='Name' required/>
                            <label htmlFor="name" className="form__label">First Name</label>
                        </div>
                        <div className="form__group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                            <input type="input" className="form__field" style={{ width: '200px'}} placeholder="Last Name" name="Last Name" id='LastName' required />
                            <label htmlFor="name" className="form__label">Last Name</label>
                        </div>
                    </div>
                    <div className="form__group field" style={{ width: '459px', top: '-170px', left: '375px'}}>
                        <input type="input" className="form__field" style={{ width: '459px'}} placeholder="mail" name="mail" id='mail' required />
                        <label htmlFor="mail" className="form__label">E-mail</label>
                    </div>
                    <div className="form__group field" style={{ width: '459px', top: '-270px', left: '375px'}}>
                        <input type="password" className="form__field" style={{ width: '459px'}} placeholder="Password" name="Password" id='Password' required />
                        <label htmlFor="Password" className="form__label">Password</label>
                    </div>
                    <div className="form__group field" style={{ width: '459px', top: '-370px', left: '375px'}}>
                        <input type="password" className="form__field" style={{ width: '459px'}} placeholder="Password Confirmation" name="Confirmation" id='Confirmation' required />
                        <label htmlFor="Confirmation" className="form__label">Password Confirmation</label>
                    </div>
                    <button className="signup_button" style={{marginTop: '20px'}}>Update!</button>
                </div>
            </div>}

            {activePanel === 'MyReservations-Panel' && <div className='MyReservations-Panel'>
                <div className="ProfileButton-Panel-Container">
                <div className='Scroll-Area' style={{top: '-25px', position: 'relative', height: '630px'}}>

                    {UserReservations.map(Hotel => 
                        (<div key={Hotel}> <div className="Search-Container">
                        <img className='Search-Image' src={Hotel.image} alt={Hotel.image}></img>
                        <div>
                            <div style={{fontWeight: 'bold', fontSize: '28px', marginBottom: '5px'}}>{Hotel.Hotel_Name}</div>
                            <div style={{color: 'rgb(83, 83, 83)', fontSize: '24px', marginBottom: '5px'}}>{Hotel.Rez_Date}</div>
                            <div style={{fontSize: '24px'}}>{Hotel.Hotel_Location}</div>
                        </div>
                </div>
                <button className="cancel_button" style={{left: '880px', top: '-30px', fontSize: '22px', width: '250px', height: '50px', borderRadius: '15px'}} onClick={ConfirmToCancel}>Cancel the Reservation!</button> 
            </div>))} 

</div>
                </div>
            </div>}

            {activePanel === 'MyDiscounts-Panel' && <div className='MyDiscounts-Panel'>
                <div className="ProfileButton-Panel-Container" style={{top: '280px'}}>
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
export default UserProfile;