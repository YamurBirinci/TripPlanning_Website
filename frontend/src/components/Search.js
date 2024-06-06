import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import '../styles/Primary.css'; 
import '../styles/Search.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faMagnifyingGlass, faHouse, faLocationDot, faMagnifyingGlassLocation, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

function Search() {
    const [hotels, setHotels] = useState([]);
    const [selectedRates, setSelectedRates] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const navigate = useNavigate();

    const ClickingMyProfile = () => {
        navigate('/MyProfile');
    };

    const ClickingExplore = () => {
        navigate('/SelectedHotel');
    };

    const ClickingHomepage = () => {
        navigate('/');
    };

    const handleSearch = () => {
        const queryParams = new URLSearchParams({
            destination: newDestination || destination,
            adults,
            kids,
            startDate: newStartDate || start_date,
            endDate: newEndDate || end_date,
        }).toString();
        navigate(`/Search?${queryParams}`);
    };

    const StarIcon = () => <FontAwesomeIcon icon={faStar} style={{ color: "orange", marginRight: '3px'}}/>;
    const stars5 = Array(5).fill(<StarIcon />);
    const stars4 = Array(4).fill(<StarIcon />);
    const stars3 = Array(3).fill(<StarIcon />);
    const stars2 = Array(2).fill(<StarIcon />);
    const stars1 = Array(1).fill(<StarIcon />);

    const hotels = [stars5, stars4, stars3, stars2, stars1];
    const amenities = ['All','Free Internet Access', 'Swimming Pool','Fitness Center','Business Center','Non Smoking Rooms','Restaurant','Accessible Rooms','Airport Shuttle','Free Breakfast','Pets Allowed','Tennis court & Equipment','Free Parking','Spa/Sauna','Playground for children','Golf Course'];
    
    const FilterHotel = (hotel) => {
        const newSelection = [...selectedHotels];

        if (selectedRates.includes(rate)) {
            const rateIndex = newSelection.indexOf(rate);
            newSelection.splice(rateIndex, 1);
        } else {
            newSelection.push(rate);
        }
        setSelectedRates(newSelection);
    };

    const handleFilter = () => {
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);

        let filtered = hotels;

        if (!isNaN(min) && !isNaN(max)) {
            filtered = filtered.filter(hotel => hotel.dailyPrice >= min && hotel.dailyPrice <= max);
        }

        if (selectedRates.length > 0) {
            filtered = filtered.filter(hotel => selectedRates.includes(hotel.star));
        }

        setFilteredHotels(filtered);
    };
    
  return (
    <div className='background'>
        <div className="Background_Rectangle" style={{ height: '900px', transform: 'scale(0.90)'}}>
            <div className="Layer" style={{width: '77px'}}></div>
            <button className="Button" style={{ transform: 'translateX(+65px)' }} onClick={ClickingMyProfile}
                onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
                <FontAwesomeIcon icon={faUser} style={{ fontSize: '18px', color: "#004AAD", marginRight: '15px'}} />Profile
            </button>
            <div className="Layer" style={{top: '55px',width: '77px'}}></div>
            <button className="Button" style={{ transform: 'translateX(+65px)', top: '75px'}} onClick={ClickingHomepage}
                onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
                <FontAwesomeIcon icon={faHouse} style={{ fontSize: '18px', color: "#004AAD", marginRight: '15px'}} /> Main
            </button>
            
        
            <div className="container" style={{ marginTop: '30px' , marginBottom: '30px'}}>
                <div className="Hotel-Info" style={{left: '6px'}}>
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
            <div style={{display: 'flex'}}>
                <div className='filter' style={{top: '0px', width: '200px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '20px', height: '725px', color: 'grey'}}>
                <div>
                <h3 style={{color: '#636363'}}>Rate</h3>
                {hotels.map((hotel, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedHotels.includes(hotel)}
                                onChange={() => FilterHotel(hotel)}
                            />
                            {hotel}
                        </label>
                    </div>
                ))}
                </div>
                <div>
                    <h3 style={{color: '#636363', borderTop: '1px solid #C9C9C9', paddingTop:'10px', marginTop:'40px'}}>Amenities</h3>
                    {amenities.map((Amenitie, index) => (
                        <div key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedAmenities.includes(Amenitie)}
                                    onChange={() => FilterMonth(Amenitie)}
                                />
                                {Amenitie}
                            </label>
                        </div>
                    ))}
                    
                </div>

                <div>
                    <h3 style={{color: '#636363', borderTop: '1px solid #C9C9C9', paddingTop:'10px', marginTop:'40px'}}>Price</h3>
                    <div className="container" style={{transform: 'scale(0.8)', height: '70px'}}>
                    <div className="text_group field" style={{ width: '300px', left: '-10px', top: '-130px' }}>
                        <input
                        type="text"
                        className="text_box"
                        style={{ width: '50px'}}
                        placeholder="Min"
                        name="Min"
                        id="Min"
                        required
                    />
                    <label htmlFor="Min" className="group_label" > Min</label>
                    </div>
                    <p style={{transform: 'scale(2)', left: '-05px', top: '-05px', position: 'relative'}}>-</p>
        
                    <div className="text_group field" style={{ width: '300px', left: '0px', top: '-130px' }}>
                        <input
                        type="text"
                        className="text_box"
                        style={{ width: '50px'}}
                        placeholder="Max"
                        name="Max"
                        id="Max"
                        required
                    />
                    <label htmlFor="Max" className="group_label"> Max</label>
                    </div>
                </div>
                    
                </div>
                            
                    <button className='Submit-Search-Button' style={{ left: '15px'}}> <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon> Filter</button>
                </div>
            <div className='Scroll-Area'>

            {Hotels.filter(Hotel => Hotel.Hotel_Location.includes(Search_Location)).map(Hotel => 
                (<div key={Hotel}> <div className="Search-Container" style={{transform: 'scale(0.85)', left: '-45px', marginTop: '5px', marginBottom: '-40px'}}>
                    <img className='Search-Image' src={Hotel.image} alt={Hotel.image}></img>
                    <div>
                        <div style={{fontWeight: 'bold', fontSize: '28px', marginBottom: '5px'}}>{Hotel.Hotel_Name}</div>
                        <div style={{color: 'rgb(83, 83, 83)', fontSize: '24px', marginBottom: '5px'}}>{Hotel.Hotel_Info}</div>
                        <div style={{fontSize: '24px'}}>{Hotel.Hotel_Location}</div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
