import React, { useState, useEffect } from 'react';
import '../styles/SignUp.css';
import '../styles/Primary.css'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faCreditCard, faClock } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const searchParams = new URLSearchParams(location.search);
    const hotelID = searchParams.get('hotelID');
    const roomTypeID = searchParams.get('roomTypeID');
    const userID = searchParams.get('userID');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [number, setNumber] = useState('');
    const [cvc, setCvc] = useState('');

    const ClickingHomepage = () => {
        navigate('/');
    };

    const validateInputs = () => {
        if (isNaN(month) || isNaN(year) || isNaN(number) || isNaN(cvc)) {
            toast.error("Please enter only valid values.");
            return false;
        }
        return true;
    };

    const ComfirmToPayment = () => {
        console.log(roomTypeID);
        if (validateInputs()) {
            const isConfirmed = window.confirm("Are you sure?");
            if (isConfirmed) {
                const reservation = {
                    startDate,
                    endDate,
                    room_typeID: parseInt(roomTypeID),
                    userID: parseInt(userID)
                };
    
                console.log("Sending JSON:", JSON.stringify(reservation));  // Add this line to log the JSON
    
                fetch(`http://localhost:8081/api/reservations?hotelId=${parseInt(hotelID)}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservation),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Reservation created successfully:', data);
                    toast.success("Reservation created successfully!");
                    ClickingHomepage();
                })
                .catch(error => {
                    console.error('Error:', error);
                    toast.error("Failed to create reservation.");
                });
            }
        }
    };

    useEffect(() => {
        console.log(`Hotel ID: ${hotelID}`);
        console.log(`Room Type ID: ${roomTypeID}`);
        console.log(`User ID: ${userID}`);
        console.log(`Start Date: ${startDate}`);
        console.log(`End Date: ${endDate}`);
    }, [hotelID, roomTypeID, userID, startDate, endDate]);

    return (
        <div className='background'>
            <div className="Background_SignUp_Rectangle" style={{transform: 'scale(0.90)'}}>
                <button className="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent'}} onClick={ClickingHomepage} ></button>
                <div className="SignUp-line"></div>
                
                <div className='Payment-Panel-Container'>
                    <div className="container">
                        <div className="text_group field" style={{ width: '200px', left: '-40px', top: '-70px' }}>
                            <input 
                                type="text" 
                                className="text_box" 
                                style={{ width: '200px'}} 
                                placeholder="month" 
                                name="month" 
                                id='month' 
                                required 
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            />
                            <label htmlFor="month" className="group_label"><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Month</label>
                        </div>
                        <div className="text_group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                            <input 
                                type="text" 
                                className="text_box" 
                                style={{ width: '200px'}} 
                                placeholder="year" 
                                name="year" 
                                id='year' 
                                required 
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                            <label htmlFor="year" className="group_label"><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Year</label>
                        </div>
                    </div>
                    <div className="text_group field" style={{ width: '459px', top: '-170px', left: '375px'}}>
                        <input 
                            type="text" 
                            className="text_box" 
                            style={{ width: '459px'}} 
                            placeholder="Number" 
                            name="Number" 
                            id='Number' 
                            required 
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        <label htmlFor="Number" className="group_label"><FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon> Card Number</label>
                    </div>
                    <div className="text_group field" style={{ width: '459px', top: '-270px', left: '375px'}}>
                        <input 
                            type="text" 
                            className="text_box" 
                            style={{ width: '459px'}} 
                            placeholder="CVC" 
                            name="CVC" 
                            id='CVC' 
                            required 
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                        />
                        <label htmlFor="CVC" className="group_label"> <FontAwesomeIcon icon={faHashtag}></FontAwesomeIcon> CVC Code</label>
                    </div>

                    <button className="Payment_button" onClick={ComfirmToPayment}>Pay Now!</button>

                    <div className="info">
                        <p>Hotel ID: {hotelID}</p>
                        <p>Room Type ID: {roomTypeID}</p>
                        <p>User ID: {userID}</p>
                        <p>Start Date: {startDate}</p>
                        <p>End Date: {endDate}</p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
export default Payment;
