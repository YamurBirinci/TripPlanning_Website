import React, { useState } from 'react';
import '../styles/Primary.css'; 
import '../styles/Search.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLocationDot, faMagnifyingGlassLocation, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import Angeles1 from '../images/Angeles1.PNG';
import Angeles5 from '../images/Angeles5.PNG';
import Angeles3 from '../images/Angeles3.PNG';




//Otel bilgileri #############################################################################
const Hotel_Name = "Hotel Angeles Center";
const Search_Location = "Seville";
const Hotel_Date = "03/14/24 - 03/15/24";



const Hotels = [
    { Hotel_Name: "Hotel Angeles Center", Hotel_Info: "4-Star Hotel", Hotel_Location: "Calle Juan De Mata Carriazo 7, Seville, Spain", Hotel_Price: 146, image: Angeles1 },
    { Hotel_Name: "Hotel Cervantes", Hotel_Info: "5-Star Hotel", Hotel_Location: "Old Town, Seville, Spain", Hotel_Price: 176, image: Angeles5},
    { Hotel_Name: "Torre Melina", Hotel_Info: "5-Star Hotel", Hotel_Location: "Barselona, Spain", Hotel_Price: 176, image: Angeles3 },
];
//#############################################################################


function SelectedHotel() {

    const navigate = useNavigate();

    const ClickingMyProfile = () => {
        navigate('/MyProfile');
    };

    const ClickingExplore = () => {
        navigate('/SelectedHotel');
    };
    
  return (
    <div className="Background_Rectangle" style={{ height: '900px'}}>
        <div className="Layer"></div>
        <button className="Button" style={{ transform: 'translateX(+65px)' }} onClick={ClickingMyProfile}
            onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
            onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '18px', color: "#004AAD", marginRight: '15px'}} />Profile
        </button>
      
        <div className="container" style={{ marginTop: '30px' , marginBottom: '30px' }}>
            <div className="Hotel-Info">
                <FontAwesomeIcon icon={faLocationDot} style={{ color: "#004AAD", padding: '10px'}} />
                {Search_Location}
            </div>
            <div className="Hotel-Info">
                <FontAwesomeIcon icon={faCalendarDays} style={{color: "#004AAD", padding: '10px'}} />
                {Hotel_Date}
            </div>
            <button className="Find_Button">
                <FontAwesomeIcon icon={faMagnifyingGlassLocation} style={{ color: "white", padding: '10px'}} />
                Find New Journey
            </button>
        </div>

        <div className='line' style={{marginTop: '60px'}}></div>

        <div className='Scroll-Area'>

        {Hotels.filter(Hotel => Hotel.Hotel_Location.includes(Search_Location)).map(Hotel => 
                    (<div key={Hotel}> <div className="Search-Container">
                        <img className='Search-Image' src={Hotel.image} alt={Hotel.image}></img>
                            <div>
                                <div style={{fontWeight: 'bold', fontSize: '28px', marginBottom: '5px'}}>{Hotel.Hotel_Name}</div>
                                <div style={{color: 'rgb(83, 83, 83)', fontSize: '24px', marginBottom: '5px'}}>{Hotel.Hotel_Info}</div>
                                <div style={{fontSize: '24px'}}>{Hotel.Hotel_Location}</div>
                            </div>
                        </div>
                        <button className="search_button" style={{left: '920px', top: '-30px', fontSize: '22px', width: '200px', height: '50px', borderRadius: '15px'}} onClick={ClickingExplore}>Explore!</button> 
                    </div>))} 

        </div>


    </div>
  );
}

export default SelectedHotel;