import React, { useEffect, useState } from 'react';
import '../styles/Primary.css'; 
import '../styles/SelectedHotel.css'; 
import PhotoGallery from './PhotoGallery'; 
import SelectedHotelAmenities from './SelectedHotelAmenities'; 
import SelectedHotelReviews from './SelectedHotelReviews'; 
import SelectedHotelExplore from './SelectedHotelExplore'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faHotel, faMagnifyingGlassLocation, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation, useParams  } from 'react-router-dom';


//Otel bilgileri #############################################################################
const Hotel_Name = "Hotel Angeles Center";
const Hotel_Date = "03/14/24 - 03/15/24";
const Hotel_Info = "4-Star Hotel";
const Hotel_Location = "Calle Juan De Mata Carriazo 7, Seville, Spain";
const Hotel_Price = "146";

const reviews = [
    { date: 'Feb 24, 2024', locationRating: 9, staffRating: 10, cleanlinessRating: 8, comment: "The staff was very friendly and accommodating. I also liked the free airport shuttle service, which was the main reason I booked this hotel. Otherwise, it is in the middle of nowhere!" },
    { date: 'Feb 22, 2024', locationRating: 4, staffRating: 3, cleanlinessRating: 2, comment: "Convenient but no luxurious features. Staff were courteous and rooms were reasonably clean. Whole hotel needs modernisa" },
    { date: 'Feb 20, 2024', locationRating: 6, staffRating: 10, cleanlinessRating: 10, comment: "The food was great. The hotel was terrific, thank you for this wonderful experience!" },
    { date: 'Feb 10, 2024', locationRating: 8, staffRating: 8, cleanlinessRating: 7, comment: "The staff was very friendly and accommodating. I also liked the free airport shuttle service, which was the main reason I booked this hotel. Otherwise, it is in the middle of nowhere!" },
    { date: 'Feb 05, 2024', locationRating: 2, staffRating: 1, cleanlinessRating: 2, comment: "Convenient but no luxurious features. Staff were courteous and rooms were reasonably clean. Whole hotel needs modernisa" },
    { date: 'Feb 02, 2024', locationRating: 10, staffRating: 9, cleanlinessRating: 9, comment: "The food was great. The hotel was terrific, thank you for this wonderful experience! The staff was very friendly and accommodating. I also liked the free airport shuttle service, which was the main reason I booked this hotel. Otherwise, it is in the middle of nowhere! The food was great. The hotel was terrific, thank you for this wonderful experience! The staff was very friendly and accommodating. " },
    
];
//#############################################################################


function SelectedHotel() {

    const [activeButton, setActiveButton] = useState('Overview');
    const [activePanel, setActivePanel] = useState('Overview-Panel');
    const { hotelID, roomTypeID } = useParams(); 
    const [selectedHotels, setSelectedHotels] = useState([]);
    const [roomPrice, setRoomPrice] = useState(null);


    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/hotels/${hotelID}/${roomTypeID}`);
                const data = await response.json();
                setSelectedHotels(data);
                
                const room = data.rooms.find(r => r.roomTypeID === parseInt(roomTypeID));
                if (room) {
                    setRoomPrice(room.dailyPrice);
                }
                                
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotelDetails();
    }, [hotelID, roomTypeID]);

    const images = selectedHotels.images ? selectedHotels.images.map(image => `${process.env.PUBLIC_URL}/images/${image.imageURL}`) : [];
    console.log(images);
    const reviews = selectedHotels.reviews ? selectedHotels.reviews : [];
    console.log(reviews);
    const hotelFeatures = selectedHotels.amenities ? selectedHotels.amenities.map(amenity => amenity.amenity_name) : [];

    

    const clickingButton = (buttonId, panelName) => {
        setActiveButton(buttonId);
        setActivePanel(panelName);
    };

    const navigate = useNavigate();

    const ClickingMyProfile = () => {
        navigate('/MyProfile');
    };

    const ClickToBook = () => {
        navigate('/Payment');
    };

    const ClickingSearch = () => {
        navigate('/Search');
    };

    const ClickingHomepage = () => {
        navigate('/');
    };

    
  return (
    <div className='background'>
        <div className="Background_Rectangle" style={{ height: '900px', transform: 'scale(0.90)'}}>
            <div className="Layer"></div>
            <button className="Button" style={{ transform: 'translateX(+65px)' }} onClick={ClickingMyProfile}
                onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
                <FontAwesomeIcon icon={faUser} style={{ fontSize: '18px', color: "#004AAD", marginRight: '15px'}} />Profile
            </button>
            <div className="Layer" style={{top: '65px',width: '63px'}}></div>
            <button className="Button" style={{ transform: 'translateX(+65px)', top: '75px'}} onClick={ClickingHomepage}
                onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
                <FontAwesomeIcon icon={faHouse} style={{ fontSize: '18px', color: "#004AAD", marginRight: '15px'}} /> Main
            </button>

            <div className="Gallery" style={{ marginTop: '50px'}}>
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
                <button className={`Hotel_Detail_Button ${activeButton === 'Reviews' ? 'Active-Hotel_Detail_Button' : ''}`}
                    onClick={() => clickingButton('Reviews', 'Reviews-Panel')}>
                    Reviews
                </button> 
                <button className={`Hotel_Detail_Button ${activeButton === 'Location' ? 'Active-Hotel_Detail_Button' : ''}`}
                    onClick={() => clickingButton('Location', 'Location-Panel')}>
                    Location
                </button>  
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
                <button className='Booking_Button' onClick={ClickToBook}>Book Now</button>
            </div>}
            
            {activePanel === 'Amenities-Panel' && <div className='Amenities-Panel'>
                <SelectedHotelAmenities features={hotelFeatures} />
            </div>}

            {activePanel === 'Reviews-Panel' && <div className='Reviews-Panel'>
                <SelectedHotelReviews reviews={reviews} />
            </div>}
            
            {activePanel === 'Explore-Panel' && <div className='Explore-Panel'>
                <SelectedHotelExplore explores={Hotel_Name} />
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