import React, { useState } from 'react';
import '../styles/Primary.css'; 
import '../styles/SelectedHotel.css'; 
import PhotoGallery from './PhotoGallery'; 
import SelectedHotelAmenities from './SelectedHotelAmenities'; 
import SelectedHotelReviews from './SelectedHotelReviews'; 
import SelectedHotelExplore from './SelectedHotelExplore'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHotel, faMagnifyingGlassLocation, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import Angeles1 from '../images/Angeles1.PNG';
import Angeles2 from '../images/Angeles2.PNG';
import Angeles3 from '../images/Angeles3.PNG';
import Angeles4 from '../images/Angeles4.PNG';
import Angeles5 from '../images/Angeles5.PNG';
import Angeles6 from '../images/Angeles6.PNG';

const images = [
    Angeles1,
    Angeles2,
    Angeles3,
    Angeles4,
    Angeles5,
    Angeles6,
];

//Otel bilgileri #############################################################################
const Hotel_Name = "Hotel Angeles Center";
const Hotel_Date = "03/14/24 - 03/15/24";
const Hotel_Info = "4-Star Hotel";
const Hotel_Location = "Calle Juan De Mata Carriazo 7, Seville, Spain";
const Hotel_Price = "146";
const hotelFeatures = ['bus', 'wifi', 'wheelchair', 'pool', 'gym', 'briefcase', 'restaurant', 'smoking'];

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
    
  return (
    <div className="Background_Rectangle" style={{ height: '900px'}}>
        <div className="Layer"></div>
        <button className="Button" style={{ transform: 'translateX(+65px)' }} onClick={ClickingMyProfile}
            onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
            onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '18px', color: "#004AAD", marginRight: '15px'}} />Profile
        </button>
      
        <div className="container">
            <div className="Hotel-Info">
                <FontAwesomeIcon icon={faHotel} style={{ color: "#004AAD", padding: '10px'}} />
                {Hotel_Name}
            </div>
            <div className="Hotel-Info">
                <FontAwesomeIcon icon={faCalendarDays} style={{color: "#004AAD", padding: '10px'}} />
                {Hotel_Date}
            </div>
            <button className="Find_Button" onClick={ClickingSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlassLocation} style={{ color: "white", padding: '10px'}} />
                Find New Journey
            </button>
        </div>

        <div className="Gallery" style={{ marginTop: '30px'}}>
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
            <div style={{ fontSize: '30px', fontWeight: 'Bold', left: '85px', position: 'relative', marginTop: '50px', display: 'block', maxWidth: '1000px'}}>{Hotel_Name}</div>
            <div style={{ fontSize: '25px',left: '85px', position: 'relative', marginTop: '10px', maxWidth: '1000px'}}>{Hotel_Info}</div>
            <div style={{ fontSize: '25px',left: '85px', position: 'relative', marginTop: '10px', color: '#545454', maxWidth: '800px'}}>{Hotel_Location}</div>
            <div style={{ fontWeight: 'Bold', fontSize: '50px',left: '1020px', position: 'relative', top: '-120px', color: '#17AD38'}}>${Hotel_Price}</div>
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

    </div>
  );
}

export default SelectedHotel;