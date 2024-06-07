import React, { useEffect, useState } from 'react';
import '../styles/SelectedHotelExplore.css'; 
import ExploreDetailModal from './ExploreDetailModal'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function SelectedHotelExplore({ hotelID }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [explores, setExplores] = useState([]);
    const [images, setImages] = useState({});
    const [reviews, setReviews] = useState({});

    useEffect(() => {
        const fetchHotelExplores = async () => {
            if (!hotelID) return;

            try {
                const response = await fetch(`/api/hotels/${hotelID}/explores`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    const dataWithIds = data.map((explore, index) => ({ ...explore, exploreID: index + 1 }));
                    setExplores(dataWithIds);
                    dataWithIds.forEach(explore => {
                        fetchExploreImages(explore.exploreID);
                        fetchExploreReviews(explore.exploreID);
                    });
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching explores:', error);
            }
        };

        fetchHotelExplores();
    }, [hotelID]);

    const fetchExploreImages = async (exploreID) => {
        if (!exploreID) return;
        try {
            const response = await fetch(`/api/explores/${exploreID}/images`);
            let data = await response.json();
            if (Array.isArray(data)) {
                data = data.map(img => `${process.env.PUBLIC_URL}/images/${img}`);
                setImages(prevImages => ({ ...prevImages, [exploreID]: data }));
            } else {
                console.error('Invalid data format for images:', data);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const fetchExploreReviews = async (exploreID) => {
        if (!exploreID) return;
        try {
            const response = await fetch(`/api/explores/${exploreID}/reviews`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setReviews(prevReviews => ({ ...prevReviews, [exploreID]: data }));
            } else {
                console.error('Invalid data format for reviews:', data);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const getPlaceReviews = (exploreID) => reviews[exploreID] || [];

    const getAverageRate = (exploreID) => {
        const targetPlaceReviews = reviews[exploreID] || [];
        const totalRate = targetPlaceReviews.reduce((total, review) => total + (review.rate || 0), 0);
        const averageRate = (targetPlaceReviews.length > 0 ? totalRate / targetPlaceReviews.length : '');
        return averageRate;
    };

    const openModal = (explore) => {
        setSelectedPlace(explore);
        setIsModalOpen(true);
    };

    return (
        <div className='Explore-Container'>
            <div className="Places-Container">
                {explores.map(explore => (
                    <button className="Places-Item" key={explore.exploreID} onClick={() => openModal(explore)}>
                        {images[explore.exploreID] && images[explore.exploreID][0] && (
                            <img className='Photo-Container' src={images[explore.exploreID][0]} alt={explore.explore_name} />
                        )}
                        <div className='Explanation-Container'>
                            <div className='Header-Container' style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>{explore.explore_name}</div>
                            <FontAwesomeIcon icon={faStar} style={{ color: "#e6b70f", left: '-5px', position: 'relative', marginRight: '-2px', fontSize: '20px' }} /> {getAverageRate(explore.exploreID)}
                        </div>
                    </button>
                ))}
            </div>

            {selectedPlace && (
                <ExploreDetailModal 
                    isOpen={isModalOpen} 
                    closeModal={() => setIsModalOpen(false)} 
                    placeInfo={selectedPlace} 
                    placeReviews={getPlaceReviews(selectedPlace.exploreID)}
                    images={images[selectedPlace.exploreID] || []}
                />
            )}
        </div>
    );
}

export default SelectedHotelExplore;
