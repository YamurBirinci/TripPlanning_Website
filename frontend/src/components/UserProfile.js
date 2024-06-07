import React, { useState, useEffect } from 'react';
import '../styles/UserProfile.css';
import '../styles/Primary.css'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faCoins, faBed, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext'; // AuthContext'ten user'ı alın

function UserProfile() {

    const [activeButton, setActiveButton] = useState('MyProfile');
    const [activePanel, setActivePanel] = useState('MyReservations-Panel');
    const [reservations, setReservations] = useState([]);
    const { user } = useAuth();

    const navigate = useNavigate();
    console.log(user);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const userResponse = await fetch(`http://localhost:8081/users/${user.userId}`);
                const userData = await userResponse.json();
                console.log("userData", userData);

                const reservationsResponse = await fetch(`http://localhost:8081/users/${userData.userID}/reservations`);
                const reservationsData = await reservationsResponse.json();
                console.log("reservationsData", reservationsData);

                const hotelResponses = await Promise.all(reservationsData.map(reservation =>
                    fetch(`http://localhost:8081/api/hotels/${reservation.hotelID}`)
                ));
                const hotelDataList = await Promise.all(hotelResponses.map(response => response.json()));
                console.log("hotelDataList", hotelDataList);

                const reservationsWithDetails = await Promise.all(reservationsData.map(async (reservation, index) => {
                    const hotelData = hotelDataList[index];
                    const imagesResponse = await fetch(`http://localhost:8081/api/hotels/${reservation.hotelID}/images`);
                    const imagesData = await imagesResponse.json();
                    return { 
                        ...reservation, 
                        hotel: hotelData, 
                        image: imagesData[0].imageURL, 
                        startDate: new Date(reservation.startDate).toLocaleDateString(),
                        endDate: new Date(reservation.endDate).toLocaleDateString()
                    };
                }));

                setReservations(reservationsWithDetails);
                console.log("reservations", reservationsWithDetails);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, [user]);

    const handleDeleteReservation = async (reservationID) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this reservation?");
        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8081/api/reservations/${reservationID}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setReservations(prevReservations => 
                        prevReservations.filter(reservation => reservation.reservationID !== reservationID)
                    );
                    alert("Reservation deleted successfully.");
                } else {
                    alert("Failed to delete reservation.");
                }
            } catch (error) {
                console.error("Error deleting reservation:", error);
            }
        }
    };

    const ClickingHomepage = () => {
        navigate('/');
    };

    const clickingButton = (buttonId, panelName) => {
        setActiveButton(buttonId);
        setActivePanel(panelName);
    };

    /*<button className={`ProfileButton ${activeButton === 'MyProfile' ? 'Active-ProfileButton' : ''}`}
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
                </button>*/

    return (
        <div className='background'>
            <div className="Background_Rectangle" style={{ height: '800px', transform: 'scale(0.90)'}}>
                <button className="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent', left: '70px'}} onClick={ClickingHomepage} ></button>
                    <div className="Layer" style={{top: '25px',width: '77px'}}></div>
                    <button className="Button" style={{ transform: 'translateX(+65px)', top: '45px', color: 'black'}} onClick={ClickingHomepage}
                        onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                        onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
                        <FontAwesomeIcon icon={faHouse} style={{ fontSize: '18px', color: "black", marginRight: '15px'}} /> Main
                    </button>

                <button className={`ProfileButton ${activeButton === 'MyReservations' ? 'Active-ProfileButton' : ''}`}
                    onClick={() => clickingButton('MyReservations', 'MyReservations-Panel')}>
                    <FontAwesomeIcon icon={faBed}></FontAwesomeIcon> My Reservations
                </button>

                <button className= 'ProfileButton'> <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon> Log Out</button>

                <div className="line" style={{ top: '220px'}}></div>

                {activePanel === 'MyProfile-Panel' && <div className='MyProfile-Panel'>
                    <div className="ProfileButton-Panel-Container">
                        <div className="container">
                            <div className="text_group field" style={{ width: '200px', left: '-40px', top: '-70px' }}>
                                <input type="input" className="text_box" style={{ width: '200px'}} placeholder="First Name" name="Name" id='Name' required/>
                                <label htmlFor="name" className="group_label">First Name</label>
                            </div>
                            <div className="text_group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                                <input type="input" className="text_box" style={{ width: '200px'}} placeholder="Last Name" name="Last Name" id='LastName' required />
                                <label htmlFor="name" className="group_label">Last Name</label>
                            </div>
                        </div>
                        <div className="text_group field" style={{ width: '459px', top: '-170px', left: '375px'}}>
                            <input type="input" className="text_box" style={{ width: '459px'}} placeholder="mail" name="mail" id='mail' required />
                            <label htmlFor="mail" className="group_label">E-mail</label>
                        </div>
                        <div className="text_group field" style={{ width: '459px', top: '-270px', left: '375px'}}>
                            <input type="password" className="text_box" style={{ width: '459px'}} placeholder="Password" name="Password" id='Password' required />
                            <label htmlFor="Password" className="group_label">Password</label>
                        </div>
                        <div className="text_group field" style={{ width: '459px', top: '-370px', left: '375px'}}>
                            <input type="password" className="text_box" style={{ width: '459px'}} placeholder="Password Confirmation" name="Confirmation" id='Confirmation' required />
                            <label htmlFor="Confirmation" className="group_label">Password Confirmation</label>
                        </div>
                        <button className="signup_button" style={{marginTop: '20px'}}>Update!</button>
                    </div>
                </div>}

                {activePanel === 'MyReservations-Panel' && <div className='MyReservations-Panel'>
                    <div className="ProfileButton-Panel-Container">
                        <div className='Scroll-Area' style={{top: '-25px', position: 'relative', height: '630px'}}>

                            {reservations.map((reservation, index) => (
                                <div key={index}> 
                                    <div className="Search-Container">
                                        <img className='Search-Image' src={reservation.image} alt={reservation.hotel.hotel_name}></img>
                                        <div>
                                            <div style={{fontWeight: 'bold', fontSize: '28px', marginBottom: '5px'}}>{reservation.hotel.hotel_name}</div>
                                            <div style={{color: 'rgb(83, 83, 83)', fontSize: '24px', marginBottom: '5px'}}>{reservation.startDate} - {reservation.endDate}</div>
                                            <div style={{fontSize: '24px'}}>{reservation.hotel.address}</div>
                                        </div>
                                    </div>
                                    <button 
                                        className="cancel_button" 
                                        style={{left: '880px', top: '-30px', fontSize: '22px', width: '250px', height: '50px', borderRadius: '15px'}} 
                                        onClick={() => handleDeleteReservation(reservation.reservationID)}
                                    >
                                        Cancel the Reservation!
                                    </button> 
                                </div>
                            ))}

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
        </div>
    );

}
export default UserProfile;
