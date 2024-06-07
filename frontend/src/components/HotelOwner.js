import React, { useState, useEffect } from 'react';
import '../styles/Primary.css'; 
import '../styles/HotelOwner.css'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHouse, faLocationDot, faRightFromBracket, faMagnifyingGlass, faUser, faSquarePlus, faHotel, faPenToSquare, faMoon} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext'; // AuthContext'ten user'ı alın

function HotelOwner() {
    const [selectedHotels, setSelectedHotels] = useState([]);
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [unselectedAmenities, setUnselectedAmenities] = useState(['Please Select Amenities','Free Internet Access', 'Swimming Pool','Fitness Center','Business Center','Non Smoking Rooms','Restaurant','Accessible Rooms','Airport Shuttle','Free Breakfast','Pets Allowed','Tennis court & Equipment','Free Parking','Spa/Sauna','Playground for children','Golf Course']);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [activeButton, setActiveButton] = useState('MyHotels');
    const [activePanel, setActivePanel] = useState('MyHotels-Panel');
    const { user } = useAuth();
    const [newHotel, setNewHotel] = useState({
        hotelName: '',
        location: '',
        amenities: '',
        star: 0,
        price: 0
    });
    const [reservations, setReservations] = useState([]);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const statuses = ['Inactive', 'Active'];

    const navigate = useNavigate();
    const ClickingHomepage = () => {
        navigate('/');
    };

    

    const SelectingAmenities = (event) => {
        const value = event.target.value;
        setSelectedAmenities(value);
        setUnselectedAmenities(unselectedAmenities.filter(feature => feature !== value));

        if (selectedAmenities.includes(value)) {
            setSelectedAmenities(selectedAmenities.filter(feature => feature !== value));
        } else {
            setSelectedAmenities([...selectedAmenities, value]);
        }
    };
    
    const removeAmenities = (feature) => {
        setSelectedAmenities(selectedAmenities.filter(features => features !== feature));
    };

    const FilterHotel = (hotel) => {
        const newSelection = [...selectedHotels];
        if (selectedHotels.includes(hotel)) {
            const hotelIndex = newSelection.indexOf(hotel);
            newSelection.splice(hotelIndex, 1);
        } else {
            newSelection.push(hotel);
        }
        setSelectedHotels(newSelection);
    };
    
    const FilterMonth = (month) => {
        const newSelection = [...selectedMonths];
        if (selectedMonths.includes(month)) {
            const monthIndex = newSelection.indexOf(month);
            newSelection.splice(monthIndex, 1);
        } else {
            newSelection.push(month);
        }
        setSelectedMonths(newSelection);
    };
    
    const FilterStatu = (status) => {
        const newSelection = [...selectedStatuses];
        if (selectedStatuses.includes(status)) {
            const statusIndex = newSelection.indexOf(status);
            newSelection.splice(statusIndex, 1);
        } else {
            newSelection.push(status);
        }
        setSelectedStatuses(newSelection);
    };

    const clickingButton = (buttonID, panelName) => {
        setActiveButton(buttonID);
        setActivePanel(panelName);
    };

    const ConfirmToCancel = () => {
        window.confirm("Are you sure?");
    };

    const handleSubmit = async () => {
        
    };

    return (
        <div className='background'>
            <div className="Background_Rectangle" style={{ height: '800px', transform: 'scale(0.90)'}}>
                <button className="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent', left: '70px'}} onClick={ClickingHomepage}></button>
                <div className="Layer" style={{top: '25px',width: '77px'}}></div>
                    <button className="Button" style={{ transform: 'translateX(+65px)', top: '45px', color: 'black'}} onClick={ClickingHomepage}
                        onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                        onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
                        <FontAwesomeIcon icon={faHouse} style={{ fontSize: '18px', color: "black", marginRight: '15px'}} /> Main
                    </button>
                <button style={{left: '255px'}} className={`ProfileButton ${activeButton === 'MyHotels' ? 'Active-ProfileButton' : ''}`}
                    onClick={() => clickingButton('MyHotels', 'MyHotels-Panel')}>
                    <FontAwesomeIcon icon={faHotel}></FontAwesomeIcon> My Hotels
                </button >
                <button style={{left: '255px'}} className={`ProfileButton ${activeButton === 'Reservations' ? 'Active-ProfileButton' : ''}`}
                    onClick={() => clickingButton('Reservations', 'Reservations-Panel')}>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Reservations
                </button>
                <button style={{left: '255px'}} className={`ProfileButton ${activeButton === 'AddHotel' ? 'Active-ProfileButton' : ''}`}
                    onClick={() => clickingButton('AddHotel', 'AddHotel-Panel')}>
                    <FontAwesomeIcon icon={faSquarePlus}></FontAwesomeIcon> Add Hotel
                </button>
                <button className='ProfileButton' style={{left: '255px'}}> <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon> Log Out</button>

                <div className="line" style={{ top: '220px'}}></div>

                {activePanel === 'AddHotel-Panel' && <div className='AddHotel-Panel'>
                    <div className="ProfileButton-Panel-Container">
                        <div className="container">
                            <div className="text_group field" style={{ width: '200px', left: '-330px', top: '-105px' }}>
                                <input type="number" className="text_box" style={{ width: '200px', height: '52px'}} placeholder="Star" name="Star" id='Star' value={newHotel.star} onChange={(e) => setNewHotel({ ...newHotel, star: parseInt(e.target.value) })} required/>
                                <label htmlFor="Star" className="group_label"><FontAwesomeIcon icon={faStar}></FontAwesomeIcon> Star</label>
                            </div>
                            <div className="text_group field" style={{ width: '200px', left: '-265px', top: '-105px' }}>
                                <input type="number" className="text_box" style={{ width: '200px', height: '52px'}} placeholder="Price" name="Price" id='Price' value={newHotel.price} onChange={(e) => setNewHotel({ ...newHotel, price: parseFloat(e.target.value) })} required />
                                <label htmlFor="Price" className="group_label"> $ Price</label>
                            </div>
                        </div>
                        <div className="text_group field" style={{ width: '459px', top: '-290px', left: '650px'}}>
                            <input type="text" className="text_box" style={{ width: '459px'}} placeholder="HotelName" name="HotelName" id='HotelName' value={newHotel.hotelName} onChange={(e) => setNewHotel({ ...newHotel, hotelName: e.target.value })} required />
                            <label htmlFor="HotelName" className="group_label"><FontAwesomeIcon icon={faHotel}></FontAwesomeIcon> Hotel Name</label>
                        </div>
                        <div className="text_group field" style={{ top: '-365px', left: '85px'}}>
                            <input type="text" className="text_box" style={{ width: '1025px'}} placeholder="Location" name="Location" id='Location' value={newHotel.location} onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })} required />
                            <label htmlFor="Location" className="group_label"><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Location</label>
                        </div>

                        <div style={{display: 'flex'}}>
                            <div className='Select-Container'>
                                <select value={""} onChange={SelectingAmenities} className='Select-DropBox'> 
                                    {unselectedAmenities.map(feature => (
                                        <option key={feature} value={feature}>{feature}</option>
                                    ))}
                                </select>
                                <div className='Selected-Items-Container'>
                                    {selectedAmenities.map(feature => (
                                        <div key={feature} style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px'}}>
                                            {feature}
                                            <button onClick={() => removeAmenities(feature)} style={{ marginLeft: '10px', cursor: 'pointer', fontSize:'24px', border: 'none'}}>×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='Select-Container'>
                                <button style={{color: 'green',position: 'relative' ,borderRadius: '15px', left: '20px', padding: '15px', border: 'none', fontSize: '24px', cursor: 'pointer'}}>
                                    Upload Image
                                </button>
                            </div>
                        </div>
                        <button className="signup_button" style={{marginTop: '335px'}} onClick={handleSubmit}>Submit for Approval!</button>
                    </div>
                </div>}

                {activePanel === 'MyHotels-Panel' && <div className='MyHotels-Panel'>
                    <div className="ProfileButton-Panel-Container">
                        <div className='Scroll-Area' style={{top: '-25px', position: 'relative', height: '630px'}}>
                            {reservations.map(reservation => (
                                <div key={reservation.reservationID}> 
                                    <div className="Search-Container">
                                        <img className='Search-Image' src={reservation.hotel.imageURL} alt={reservation.hotel.hotelName}></img>
                                        <div>
                                            <div style={{fontWeight: 'bold', fontSize: '28px', marginBottom: '5px'}}>{reservation.hotel.hotelName}</div>
                                            <div style={{color: 'rgb(83, 83, 83)', fontSize: '24px', marginBottom: '5px'}}>{reservation.hotel.star}-Star Hotel</div>
                                            <div style={{fontSize: '24px'}}>{reservation.hotel.address}</div>
                                        </div>
                                    </div>
                                    <button className="owner_button" onClick={ConfirmToCancel}><FontAwesomeIcon icon={faMoon}></FontAwesomeIcon> Vacation Mode</button>  
                                    <button className="owner_button" style={{width: '150px'}}><FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon> Edit!</button>
                                </div>
                            ))} 
                        </div>
                    </div>
                </div>}

                {activePanel === 'Reservations-Panel' && <div className='Reservations-Panel'>
                    <div className="ProfileButton-Panel-Container" >
                        <div style={{display: 'flex'}}>
                            <div className='filter' style={{paddingLeft: '15px'}}>
                                <div>
                                    <h3 style={{color: '#343434'}}>Hotel Name</h3>
                                    {reservations.map(reservation => (
                                        <div key={reservation.reservationID}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedHotels.includes(reservation.hotel.hotelName)}
                                                    onChange={() => FilterHotel(reservation.hotel.hotelName)}
                                                />
                                                {reservation.hotel.hotelName}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h3 style={{color: '#343434',borderTop: '1px solid #C9C9C9', paddingTop: '10px'}}>Rez Month</h3>
                                    {months.map((month, index) => (
                                        <div key={index}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedMonths.includes(month)}
                                                    onChange={() => FilterMonth(month)}
                                                />
                                                {month}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h3 style={{color: '#343434',borderTop: '1px solid #C9C9C9', paddingTop: '10px'}} >Rez Status</h3>
                                    {statuses.map((status, index) => (
                                        <div key={index}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStatuses.includes(status)}
                                                    onChange={() => FilterStatu(status)}
                                                />
                                                {status}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <button className='Submit-Search-Button'> <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon> Filter</button>
                            </div>
                            <div className='Scrolling-Area' >
                                {reservations.map(reservation => (
                                    <div key={reservation.reservationID}> 
                                        <div className="Search-Container" style={{transform: 'scale(0.85)', left: '-70px', marginBottom: '-60px'}}>
                                            <img className='Search-Image' src={reservation.hotel.imageURL} alt={reservation.hotel.hotelName}></img>
                                            <div>
                                                <div style={{fontWeight: 'bold', fontSize: '28px', marginBottom: '5px'}}>{reservation.hotel.hotelName}</div>
                                                <div style={{color: 'rgb(83, 83, 83)', fontSize: '24px', marginBottom: '5px'}}>{reservation.startDate} - {reservation.endDate}</div>
                                                <div style={{fontSize: '24px', color: 'green', fontWeight: 'bold'}}>${reservation.room.dailyPrice}</div>
                                            </div>
                                        </div>
                                        <button className="cancel_button" style={{transform: 'scale(0.8)', left: '690px', fontSize: '22px', width: '250px', height: '50px', borderRadius: '15px'}} onClick={ConfirmToCancel}>Cancel the Reservation!</button> 
                                    </div>
                                ))} 
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}
export default HotelOwner;