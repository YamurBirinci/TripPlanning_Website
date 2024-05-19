import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/SelectedHotelExplore.css'; 
import ExploreDetailModal from './ExploreDetailModal'; 
import React, { useState } from 'react';

import Ceramica_Triana1 from '../images/Ceramica_Triana1.jpg';
import Ceramica_Triana2 from '../images/Ceramica_Triana2.jpg';
import Ceramica_Triana3 from '../images/Ceramica_Triana3.jpg';
import Ceramica_Triana4 from '../images/Ceramica_Triana4.jpg';
import Ceramica_Triana5 from '../images/Ceramica_Triana5.jpg';
import Ceramica_Triana6 from '../images/Ceramica_Triana6.jpg';

import Real_Alcazar1 from '../images/Real_Alcazar1.jpg';
import Real_Alcazar2 from '../images/Real_Alcazar2.jpg';
import Real_Alcazar3 from '../images/Real_Alcazar3.jpg';
import Real_Alcazar4 from '../images/Real_Alcazar4.jpg';
import Real_Alcazar5 from '../images/Real_Alcazar5.jpg';
import Real_Alcazar6 from '../images/Real_Alcazar6.jpg';

const Places = {
    "Hotel Angeles Center": ["Ceramicas Sevilla", "Real Alcazar", "Ceramicas Sevilla", "Real Alcazar", "Ceramicas Sevilla", "Real Alcazar", "Ceramicas Sevilla", "Real Alcazar"],
    "Hotel Giralda Center": ["Blanca Paloma"]
};

const images = {
    "Ceramicas Sevilla": [Ceramica_Triana1, Ceramica_Triana2, Ceramica_Triana3, Ceramica_Triana4, Ceramica_Triana5, Ceramica_Triana6],
    "Real Alcazar": [Real_Alcazar1, Real_Alcazar2, Real_Alcazar3, Real_Alcazar4, Real_Alcazar5, Real_Alcazar6]
};

const reviews = [
    { name: 'Ceramicas Sevilla', date:"Feb 24, 2024" , rate: 9, comment: "Many thanks to the staff who answered all our questions with respect and love throughout the workshop. It was an incredibly enjoyable experience." },
    { name: 'Ceramicas Sevilla', date:"Feb 22, 2024" , rate: 8, comment: "It is incredibly rich in product variety, the employees are very polite." },
    { name: 'Ceramicas Sevilla', date:"Feb 16, 2024" , rate: 7, comment: "Many thanks to the staff who answered all our questions with respect and love throughout the workshop. It was an incredibly enjoyable experience." },
    { name: 'Ceramicas Sevilla', date:"Feb 10, 2024" , rate: 2, comment: "It is ok." },
    { name: 'Real Alcazar', date:"Feb 18, 2024" , rate: 7, comment: "It is incredibly rich in product variety, the employees are very polite." },
    { name: 'Real Alcazar', date:"Feb 10, 2024" , rate: 5, comment: "I like there." },
];

const info = [
    { name: 'Ceramicas Sevilla', type:"Antique Shops & Workshop" , definition: "t is an antique store where ceramic products have been exhibited and sold since 1952. Ceramics workshops can be held by reservation."},
    { name: 'Real Alcazar', type:"Restaurant" , definition: "It is a restaurant founded in 1898 by famous chef Yağmur Helin Sucuoğlu Oğuz."},
];


function SelectedHotelExplore({ explores }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);

    //Seçilen place'den bilgileri ve yorumlarını alır.
    const getPlaceInfo = (name) => info.find(place => place.name === name);
    const getPlaceReviews = (name) => reviews.filter(review => review.name === name);

    //Seçilen place'den ortalama rate döndürür.
    const getAverageRate = (name) => {
        const targetPlaceReviews = reviews.filter(review => review.name === name && review.rate != null);

        const totalRate = targetPlaceReviews.reduce((acc,review) => acc+ review.rate, 0);
        const averageRate = (targetPlaceReviews.length > 0 ? totalRate / targetPlaceReviews.length : 0);

        return averageRate;
    };

    const openModal = (explore) => {
        setSelectedPlace(explore);
        setIsModalOpen(true);
    };
    
    return (
        <div className='Explore-Container'>
            <div className="Places-Container" >
            {Places[explores].map(explore => (
                <button className="Places-Item" key={explore} onClick={() => openModal(explore)}>
                    <img className='Photo-Container' src={images[explore][0]} alt={explore} />
                    <div className='Explanation-Container' >
                        <div className='Header-Container' style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', fontSize:'20px'}}>{explore}</div>
                        <FontAwesomeIcon icon={faStar} style={{ color: "#e6b70f", left: '-5px', position: 'relative', marginRight: '-2px', fontSize:'20px'}} /> {getAverageRate(explore)}
                    </div>
                </button>
            ))}
            </div>

            <ExploreDetailModal 
                isOpen={isModalOpen} 
                closeModal={() => setIsModalOpen(false)} 
                placeInfo={getPlaceInfo(selectedPlace)}
                placeReviews={getPlaceReviews(selectedPlace)} 
                images={images[selectedPlace]}
            />
        </div>
        
    );
}



export default SelectedHotelExplore;
