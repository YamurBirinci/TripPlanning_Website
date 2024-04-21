import React, { useState } from 'react';
import '../styles/Primary.css'; 
import '../styles/SelectedHotel.css'; 
import PhotoGallery from './PhotoGallery'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

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


function SelectedHotel() {
    const Hotel_Name = "Hotel Angeles Center";
    const Hotel_Date = "03/14/24 - 03/15/24";
    const Hotel_Info = "4-Star Hotel";
    const Hotel_Location = "Calle Juan De Mata Carriazo 7, Seville, Spain";
    const Hotel_Price = "146";

    const [activeButton, setActiveButton] = useState('Overview');
    const [activePanel, setActivePanel] = useState('Overview-Panel');


    const clickingButton = (buttonId, panelName) => {
        setActiveButton(buttonId);
        setActivePanel(panelName);
    };

  return (

    <div className="Background_Rectangle" style={{ height: '900px'}}>

        <div className="container">
            <div className="Hotel-Info">
                <FontAwesomeIcon icon={faHotel} style={{ color: "#004AAD", padding: '10px'}} />
                {Hotel_Name}
            </div>
            <div className="Hotel-Info">
                <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#004AAD", padding: '10px'}} />
                {Hotel_Date}
            </div>
        </div>

        <div className="Gallery" style={{ marginTop: '40px'}}>
          <PhotoGallery images={images} />
        </div>

        <div className="container"style={{ marginTop: '45px'}}>
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
            <div style={{ fontSize: '30px', fontWeight: 'Bold', left: '85px', position: 'relative', marginTop: '50px', display: 'block', maxWidth: '1000px'}}>{Hotel_Name}</div>
            <div style={{ fontSize: '25px',left: '85px', position: 'relative', marginTop: '10px', maxWidth: '1000px'}}>{Hotel_Info}</div>
            <div style={{ fontSize: '25px',left: '85px', position: 'relative', marginTop: '10px', color: '#545454', maxWidth: '800px'}}>{Hotel_Location}</div>
            <div style={{ fontWeight: 'Bold', fontSize: '50px',left: '1020px', position: 'relative', top: '-120px', color: '#17AD38'}}>${Hotel_Price}</div>
            <button className='Booking_Button'>Book Now</button>
        </div>}
        
        {activePanel === 'Amenities-Panel' && <div className='Amenities-Panel'></div>}
        {activePanel === 'Reviews-Panel' && <div className='Reviews-Panel'></div>}
        {activePanel === 'Location-Panel' && <div className='Location-Panel'></div>}
        {activePanel === 'Explore-Panel' && <div className='Explore-Panel'></div>}

        
    </div>

  );
}

export default SelectedHotel;