import React, { useState, useEffect } from 'react';
import '../styles/Primary.css'; 
import '../styles/HotelOwner.css'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHouse, faLocationDot, faRightFromBracket, faMagnifyingGlass, faUser, faSquarePlus, faHotel, faPenToSquare, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

function HotelOwner() {
    const [activeButton, setActiveButton] = useState('MyHotels');
    const [activePanel, setActivePanel] = useState('MyHotels-Panel');
    const [reservations, setReservations] = useState([]);
    const { user, logout } = useAuth();
    const [selectedHotels, setSelectedHotels] = useState([]);
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [unselectedAmenities, setUnselectedAmenities] = useState([
        'Free Internet Access', 'Swimming Pool', 'Fitness Center', 'Business Center',
        'Non Smoking Rooms', 'Restaurant', 'Accessible Rooms', 'Airport Shuttle', 
        'Free Breakfast', 'Pets Allowed', 'Tennis court & Equipment', 'Free Parking', 
        'Spa/Sauna', 'Playground for children', 'Golf Course'
    ]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [newHotel, setNewHotel] = useState({
        hotelName: '',
        location: '',
        amenities: '',
        star: 0,
        price: 0
    });

    const amenitiesKeywords = {
        "Free Internet Access": "wifi",
        "Swimming Pool": "pool",
        "Fitness Center": "gym",
        "Business Center": "briefcase",
        "Non Smoking Rooms": "smoking",
        "Restaurant": "Restaurant",
        "Accessible Rooms": "wheelchair",
        "Airport Shuttle": "bus",
        "Free Breakfast": "breakfast",
        "Pets Allowed": "pets",
        "Tennis court & Equipment": "tennis",
        "Free Parking": "parking",
        "Spa/Sauna": "spa",
        "Playground for children": "game",
        "Golf Course": "golf"
    };

    const SelectingAmenities = (event) => {
        const value = event.target.value;
        setUnselectedAmenities(unselectedAmenities.filter(feature => feature !== value));

        if (selectedAmenities.includes(value)) {
            setSelectedAmenities(selectedAmenities.filter(feature => feature !== value));
        } else {
            setSelectedAmenities([...selectedAmenities, value]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const hotelData = {
            hotel_name: newHotel.hotelName,
            address: newHotel.location,
            star: newHotel.star,
            status: "pending",
            userId: user.userId
        };
    
        try {
            const response = await fetch("http://localhost:8081/api/hotels/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(hotelData),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("Hotel added successfully:", result);
    
                const hotelId = result.hotelID; 
    
                for (const amenity of selectedAmenities) {
                    const amenityData = {
                        hotelID: hotelId,
                        amenity_name: amenitiesKeywords[amenity]
                    };
    
                    await fetch("http://localhost:8081/api/amenities", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(amenityData),
                    });
                }
    
                console.log("Amenities added successfully.");
            } else {
                const errorResult = await response.json();
                console.error("Error submitting new hotel:", errorResult.message);
            }
        } catch (error) {
            console.error("Error submitting new hotel:", error);
        }
    };
    

    const removeAmenities = (feature) => {
        setSelectedAmenities(selectedAmenities.filter(features => features !== feature));
        setUnselectedAmenities([...unselectedAmenities, feature]);
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetchHotelData();
    }, []);

    const fetchHotelData = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/hotels/user/${user.userId}`);
            const data = await response.json();
            setReservations(data);
            console.log(data);
        
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const ClickingHomepage = () => {
        navigate('/');
    };

    const clickingButton = (buttonID, panelName) => {
        setActiveButton(buttonID);
        setActivePanel(panelName);
    };

    const ConfirmToCancel = () => {
        window.confirm("Are you sure?");
    };

    return (
        <div className='background'>
            <div className="Background_Rectangle" style={{ height: '800px', transform: 'scale(0.90)'}}>
                <button className="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent', left: '70px'}} onClick={ClickingHomepage}></button>
                <div className="Layer" style={{top: '25px',width: '77px'}}></div>
                <button className="Button" style={{ transform: 'translateX(+65px)', top: '45px', color: 'black'}} onClick={ClickingHomepage}
                    onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                    onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}
                >
                    <FontAwesomeIcon icon={faHouse} style={{ fontSize: '18px', color: "black", marginRight: '15px'}} /> Main
                </button>
                <button style={{left: '625px'}} className={`ProfileButton ${activeButton === 'MyHotels' ? 'Active-ProfileButton' : ''}`}
                    onClick={() => clickingButton('MyHotels', 'MyHotels-Panel')}>
                    <FontAwesomeIcon icon={faHotel}></FontAwesomeIcon> My Hotels
                </button >
                <button style={{left: '625px'}} className={`ProfileButton ${activeButton === 'AddHotel' ? 'Active-ProfileButton' : ''}`}
                    onClick={() => clickingButton('AddHotel', 'AddHotel-Panel')}>
                    <FontAwesomeIcon icon={faSquarePlus}></FontAwesomeIcon> Add Hotel
                </button>

                <div className="line" style={{ top: '220px'}}></div>

                {activePanel === 'AddHotel-Panel' && <div className='AddHotel-Panel'>
                    <div className="ProfileButton-Panel-Container">
                        <div className="container">
                            <div className="text_group field" style={{ width: '200px', left: '-330px', top: '-105px' }}>
                                <input type="number" className="text_box" style={{ width: '200px', height: '52px'}} placeholder="Star" name="Star" id='Star' value={newHotel.star} onChange={(e) => setNewHotel({ ...newHotel, star: parseInt(e.target.value) })} required />
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
                            {reservations.map((reservation, index) => (
                                <div key={index}> 
                                    <div className="Search-Container" style={{marginBottom: '10px'}}>
                                        <div>
                                            <div style={{fontWeight: 'bold', fontSize: '28px', marginBottom: '5px'}}>{reservation.hotel_name}</div>
                                            <div style={{color: 'rgb(83, 83, 83)', fontSize: '24px', marginBottom: '5px'}}>{reservation.star}-Star Hotel</div>
                                            <div style={{fontSize: '24px'}}>{reservation.address}</div>
                                        </div>
                                    </div> 
                                </div>
                            ))} 
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default HotelOwner;
