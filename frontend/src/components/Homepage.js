import '../styles/Homepage.css'; 
import '../styles/Primary.css'; 
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPerson, faLocationDot, faChild, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext'; 

function Homepage() {
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [destination, setDestination] = useState('');
    const [adults, setAdults] = useState('');
    const [kids, setKids] = useState('');
    const { user, logout } = useAuth();
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:8081/users/${user.userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setUserName(data.first_name);})
                .catch(error => {
                    console.error("There was an error fetching the user data!", error);
                });
        }
    }, [user]);

    const ClickingLogin = () => {
        navigate('/Login');
    };

    const ClickingMyProfile = () => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/Admin');
            } else if (user.role === 'owner') {
                navigate('/HotelOwner');
            } else if (user.role === 'customer') {
                navigate('/MyProfile');
            } else {
                navigate('/Login');
            }
        } 
    };

    const ClickingSearch = () => {
        if (!adults || !kids || isNaN(adults) || isNaN(kids)) {
            toast.error('Please enter valid numbers for adults and kids!');
            return;
        }
        if (!selectedStartDate || !selectedEndDate) {
            toast.error('Please enter valid start and end dates!');
            return;
        }
        if (selectedEndDate <= selectedStartDate) {
            toast.error('End date must be after start date!');
            return;
        }
        const queryParams = new URLSearchParams({
            destination,
            adults,
            kids,
            startDate: selectedStartDate.toISOString().substring(0, 10),
            endDate: selectedEndDate.toISOString().substring(0, 10),
        }).toString();
        navigate(`/Search?${queryParams}`);
    };

    const handleLogout = () => {
        console.log('Logout clicked');
        logout();
    };

    return (
        <div className='background-homepage'>
            <ToastContainer />
            <div className="Background_Rectangle" style={{transform: 'scale(0.87)'}}>
                <div className="name_logo" style={{zIndex:'10000'}}></div>
                {(!user || !['customer', 'admin', 'owner'].includes(user.role)) && (
                    <button className="Login" onClick={ClickingLogin}>Log In</button>
                )}
                {user && (
                <div>
                    <div className="Layer" style={{ width: '77px' }}></div>
                    <button className="Button" style={{ transform: 'translateX(+65px)', backgroundColor: 'white'}} onClick={ClickingMyProfile}
                        onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                        onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
                        <FontAwesomeIcon icon={faUser} style={{ fontSize: '18px', color: "green", marginRight: '15px' }} />Profile
                    </button>
                    <div>
                        <div className="LoginName"> Dear {userName},</div>
                        <button className="Login"onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
                )}
                <div className="line"></div>
                <div className="text_group field" style={{ top: '-50px' }}>
                    <input
                        type="input"
                        className="text_box"
                        placeholder="Destination"
                        name="destination"
                        id="destination"
                        required
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <label htmlFor="destination" className="group_label"><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Destination</label>
                </div>
                <div className="container">
                    <div className="text_group field" style={{ width: '300px', left: '55px', top: '-130px' }}>
                        <input
                            type="text"
                            className="text_box"
                            style={{ width: '210px'}}
                            placeholder="Adult"
                            name="Adult"
                            id="Adult"
                            required
                            value={adults}
                            onChange={(e) => setAdults(e.target.value)}
                        />
                        <label htmlFor="Adult" className="group_label"><FontAwesomeIcon icon={faPerson}></FontAwesomeIcon> Number of Adults</label>
                    </div>
                    <div className="text_group field" style={{ width: '300px', left: '25px', top: '-130px' }}>
                        <input
                            type="text"
                            className="text_box"
                            style={{ width: '210px'}}
                            placeholder="Kids"
                            name="Kids"
                            id="Kids"
                            required
                            value={kids}
                            onChange={(e) => setKids(e.target.value)}
                        />
                        <label htmlFor="Kids" className="group_label"><FontAwesomeIcon icon={faChild}></FontAwesomeIcon> Number of Kids</label>
                    </div>
                </div>
                <div className="container">
                    <div className="text_group field" style={{ width: '300px', left: '55px', top: '-210px' }}>
                        <input
                            type="text"
                            className="text_box"
                            style={{ width: '210px'}}
                            placeholder="Start Date"
                            name="start_date"
                            id="start_date"
                            required
                            onFocus={() => setShowStartDatePicker(true)}
                            value={selectedStartDate.toISOString().substring(0, 10)}
                            readOnly
                        />
                        <label htmlFor="start_date" className="group_label"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> Start Date</label>
                        <div className="datepicker-container">
                            {showStartDatePicker && (
                                <DatePicker
                                    selected={selectedStartDate}
                                    onChange={(date) => {
                                        setSelectedStartDate(date);
                                        setShowStartDatePicker(false);
                                    }}
                                    minDate={new Date()}
                                    inline
                                />
                            )}
                        </div>
                    </div>
                    <div className="text_group field" style={{ width: '300px', left: '25px', top: '-210px' }}>
                        <input
                            type="text"
                            className="text_box"
                            style={{ width: '210px'}}
                            placeholder="End Date"
                            name="end_date"
                            id="end_date"
                            required
                            onFocus={() => setShowEndDatePicker(true)}
                            value={selectedEndDate.toISOString().substring(0, 10)}
                            readOnly
                        />
                        <label htmlFor="end_date" className="group_label"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> End Date</label>
                        <div className="datepicker-container">
                            {showEndDatePicker && (
                                <DatePicker
                                    selected={selectedEndDate}
                                    onChange={(date) => {
                                        setSelectedEndDate(date);
                                        setShowEndDatePicker(false);
                                    }}
                                    minDate={new Date()}
                                    inline
                                />
                            )}
                        </div>
                    </div>
                </div>
                <button className="search_button" style={{top: '-150px' }} onClick={ClickingSearch}>Find Your Journey</button>
            </div>
        </div>
    );
}

export default Homepage;
/*
('Emily', 'Davis', 'emily.davis@example.com', 'password222', 'customer'),
('Michael', 'Scott', 'michael.scott@dundermifflin.com', 'password123', 'owner'),
('Dwight', 'Schrute', 'dwight.schrute@dundermifflin.com', 'password456', 'owner'),
('Jim', 'Halpert', 'jim.halpert@dundermifflin.com', 'password789', 'owner'),
('Pam', 'Beesly', 'pam.beesly@dundermifflin.com', 'password111', 'admin')*/