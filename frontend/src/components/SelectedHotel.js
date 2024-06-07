import React, { useEffect, useState } from 'react';
import '../styles/Primary.css'; 
import '../styles/SelectedHotel.css'; 
import PhotoGallery from './PhotoGallery'; 
import SelectedHotelAmenities from './SelectedHotelAmenities'; 
import SelectedHotelReviews from './SelectedHotelReviews'; 
import SelectedHotelExplore from './SelectedHotelExplore'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faHotel, faLocationDot, faMagnifyingGlassLocation, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SelectedHotel() {
    const [activeButton, setActiveButton] = useState('Overview');
    const [activePanel, setActivePanel] = useState('Overview-Panel');
    const { hotelID, roomTypeID } = useParams(); 
    const [selectedHotels, setSelectedHotels] = useState({});
    const [roomPrice, setRoomPrice] = useState(null);
    const [newDestination, setNewDestination] = useState('');
    const [newStartDate, setNewStartDate] = useState('');
    const [newEndDate, setNewEndDate] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const start_date = searchParams.get('start_date') || '';
    const end_date = searchParams.get('end_date') || '';

    useEffect(() => {
        console.log(`Start Date: ${start_date}`);
        console.log(`End Date: ${end_date}`);

        const fetchHotelDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/hotels/${hotelID}/${roomTypeID}`);
                const data = await response.json();
                setSelectedHotels(data);
                setNewDestination(data.address);
                console.log(user.userId);

                const today = new Date().toISOString().split('T')[0];
                setNewStartDate(start_date || today);
                setNewEndDate(end_date || today);

                const room = data.rooms.find(r => r.roomTypeID === parseInt(roomTypeID));
                if (room) {
                    setRoomPrice(room.dailyPrice);
                }
                console.log(selectedHotels);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotelDetails();
    }, [hotelID, roomTypeID, start_date, end_date]);

    const images = selectedHotels.images ? selectedHotels.images.map(image => `${process.env.PUBLIC_URL}/images/${image.imageURL}`) : [];
    const reviews = selectedHotels.reviews ? selectedHotels.reviews : [];
    const hotelFeatures = selectedHotels.amenities ? selectedHotels.amenities.map(amenity => amenity.amenity_name) : [];

    const handleSearch = () => {
        const queryParams = new URLSearchParams({
            destination: newDestination,
            adults: 1,
            kids: 0,
            startDate: newStartDate,
            endDate: newEndDate,
        }).toString();
        navigate(`/Search?${queryParams}`);
    };

    const clickingButton = (buttonId, panelName) => {
        setActiveButton(buttonId);
        setActivePanel(panelName);
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

    const ClickToBook = (hotelID, roomTypeID, userID, startDate, endDate) => {
        navigate(`/Payment?hotelID=${hotelID}&roomTypeID=${roomTypeID}&userID=${userID}&startDate=${startDate}&endDate=${endDate}`);
    };
    

    const ClickingHomepage = () => {
        navigate('/');
    };

    return (
        <div className='background'>
            <div className="Background_Rectangle" style={{ height: '900px', transform: 'scale(0.90)'}}>
                {user && (
                    <div>
                        <div className="Layer" style={{width: '80px', height: '100px'}}></div>
                        <button className="Button" style={{ transform: 'translateX(+65px)' }} onClick={ClickingMyProfile}
                            onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                            onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
                            <FontAwesomeIcon icon={faUser} style={{ fontSize: '18px', color: "#004AAD", marginRight: '15px'}} />Profile
                        </button>
                    </div>
                )}

                <div className="Layer" style={{top: '65px',width: '63px'}}></div>
                <button className="Button" style={{ transform: 'translateX(+65px)', top: '75px'}} onClick={ClickingHomepage}
                    onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                    onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
                    <FontAwesomeIcon icon={faHouse} style={{ fontSize: '18px', color: "#004AAD", marginRight: '15px'}} /> Main
                </button>

                <div className="container" style={{ marginTop: '10px', marginBottom: '30px', transform: 'scale(0.85)' }}>
                    <div className="text_group field" style={{ width: '280px', left: '-110px', marginRight: '10px', top:'-105px' }}>
                        <input
                            style={{ width: '340px', left: '0px', marginRight: '10px' }}
                            type="text"
                            className="text_box"
                            placeholder="New Destination"
                            value={newDestination}
                            onChange={(e) => setNewDestination(e.target.value)}
                        />
                        <label htmlFor="newDestination" className="group_label"> <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Destination</label>
                    </div>
                    <div className="text_group field" style={{ width: '160px', left: '0px' , top:'-105px'}}>
                        <input
                            style={{ width: '170px', marginRight: '10px' }}
                            type="date"
                            className="text_box"
                            value={newStartDate}
                            onChange={(e) => setNewStartDate(e.target.value)}
                        />
                        <label htmlFor="newStartDate" className="group_label"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> Start Date</label>
                    </div>
                    <div className="text_group field" style={{ width: '160px', left: '38px' , top:'-105px'}}>
                        <input
                            style={{ width: '170px', marginRight: '10px' }}
                            type="date"
                            className="text_box"
                            value={newEndDate}
                            onChange={(e) => setNewEndDate(e.target.value)}
                        />
                        <label htmlFor="newEndDate" className="group_label"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> End Date</label>
                    </div>
                    <button className="Find_Button" style={{ width: '380px', left: '105px', height: '68px', top:'10px', fontSize: '26px' }} onClick={handleSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlassLocation} style={{ color: "white", padding: '10px', fontSize: '26px' }} />
                        Find New Journey
                    </button>
                </div>

                <div className="Gallery" style={{ marginTop: '-120px'}}>
                    <PhotoGallery images={images} />
                </div> 

                <div className="container"style={{ marginTop: '30px'}}>
                    <button className={`Hotel_Detail_Button ${activeButton === 'Overview' ? 'Active-Hotel_Detail_Button' : ''}`}
                        onClick={() => clickingButton('Overview', 'Overview-Panel')}>
                        Overview
                    </button>
                    <button className={`Hotel_Detail_Button ${activeButton === 'Amenities' ? 'Active-Hotel_Detail_Button' : ''}`}
                        onClick={() => clickingButton('Amenities', 'Amenities-Panel')}>
                        Amenities
                    </button>
                    {user && (
                    <button className={`Hotel_Detail_Button ${activeButton === 'Reviews' ? 'Active-Hotel_Detail_Button' : ''}`}
                        onClick={() => clickingButton('Reviews', 'Reviews-Panel')}>
                        Reviews
                    </button> )}
                    <button className={`Hotel_Detail_Button ${activeButton === 'Explore' ? 'Active-Hotel_Detail_Button' : ''}`}
                        onClick={() => clickingButton('Explore', 'Explore-Panel')}>
                        Explore
                    </button>           
                </div>

                <div style={{ 
                    position: 'relative',
                    height: '3px',
                    width: '1125px',
                    backgroundColor: '#C9C9C9', 
                    marginTop: '-1px',
                    left: '65px'
                }}></div>

                {activePanel === 'Overview-Panel' && <div className='Overview-Panel'>
                    <div style={{ fontSize: '30px', fontWeight: 'Bold', left: '85px', position: 'relative', marginTop: '50px', display: 'block', maxWidth: '1000px'}}>{selectedHotels.hotelName}</div>
                    <div style={{ fontSize: '25px',left: '85px', position: 'relative', marginTop: '10px', maxWidth: '1000px'}}>{selectedHotels.star}-Star Hotel</div>
                    <div style={{ fontSize: '25px',left: '85px', position: 'relative', marginTop: '10px', color: '#545454', maxWidth: '800px'}}>{selectedHotels.address}</div>
                    <div style={{ fontWeight: 'Bold', fontSize: '50px',left: '1020px', position: 'relative', top: '-120px', color: '#1c6632'}}>${roomPrice}</div>
                    
                    {(user && ['customer'].includes(user.role))&& (
                    <button className='Booking_Button' onClick={() => ClickToBook(hotelID, roomTypeID, user.userId, newStartDate, newEndDate)}>Book Now</button>
                    )}    
                    </div>}
                
                {activePanel === 'Amenities-Panel' && <div className='Amenities-Panel'>
                    <SelectedHotelAmenities features={hotelFeatures} />
                </div>}

                {activePanel === 'Reviews-Panel' && <div className='Reviews-Panel'>
                <SelectedHotelReviews reviews={reviews} hotelID={hotelID} userID={user.userId} />
                </div>}
                
                {activePanel === 'Explore-Panel' && <div className='Explore-Panel'>
                    <SelectedHotelExplore hotelID={hotelID} />
                </div>}

                {activePanel === 'Location-Panel' && <div className='Location-Panel'>
                    <div className='Location_Image'>
                    </div>
                </div>}

            </div>
        </div>
    );
}

export default SelectedHotel;

