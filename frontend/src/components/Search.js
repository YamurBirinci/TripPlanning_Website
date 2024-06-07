import React, { useEffect, useState } from 'react';
import '../styles/Primary.css'; 
import '../styles/Search.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faMagnifyingGlass, faHouse, faLocationDot, faMagnifyingGlassLocation, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext'ten user'ı alın
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Search() {
    const [hotels, setHotels] = useState([]);
    const [selectedRates, setSelectedRates] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredHotels, setFilteredHotels] = useState([]);
    const { user } = useAuth();

    // URL parametrelerini doğru aldığımızdan emin olalım
    const destination = searchParams.get('destination') || '';
    const adults = parseInt(searchParams.get('adults'), 10) || 1;
    const kids = parseInt(searchParams.get('kids'), 10) || 0;
    const start_date = searchParams.get('startDate') || '';
    const end_date = searchParams.get('endDate') || '';

    const [newDestination, setNewDestination] = useState(destination);
    const [newStartDate, setNewStartDate] = useState(start_date);
    const [newEndDate, setNewEndDate] = useState(end_date);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/hotels/search?destination=${destination}&adults=${adults}&kids=${kids}&start_date=${start_date}&end_date=${end_date}`);
                const data = await response.json();
                setHotels(data);
                setFilteredHotels(data);  // Başlangıçta tüm otelleri göster
                console.log('Fetched Hotels:', data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };
    
        fetchHotels();
    }, [destination, adults, kids, start_date, end_date]);

    const navigate = useNavigate();

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
        } else {
            navigate('/Login');
        }
    };

    const ClickingExplore = (hotelID, roomTypeID) => {
        
        navigate(`/SelectedHotel/${hotelID}/${roomTypeID}?start_date=${start_date}&end_date=${end_date}`);
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

        if (!newStartDate || !newEndDate) {
            toast.error('Please enter valid start and end dates!');
            return;
        }
        if (newEndDate <= newStartDate) {
            toast.error('End date must be after start date!');
            return;
        }
        navigate(`/Search?${queryParams}`);
    };

    const StarIcon = () => <FontAwesomeIcon icon={faStar} style={{ color: "orange", marginRight: '3px'}} />;
    const starsArray = (numStars) => Array(numStars).fill(0).map((_, index) => <StarIcon key={index} />);


    const FilterRate = (rate) => {
        const newSelection = [...selectedRates];

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
            <ToastContainer />
            <div className="Background_Rectangle" style={{ height: '900px', transform: 'scale(0.90)' }}>
                <div className="Layer" style={{ width: '77px' }}></div>
                <button className="Button" style={{ transform: 'translateX(+65px)' }} onClick={ClickingMyProfile}
                    onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                    onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '18px', color: "#004AAD", marginRight: '15px' }} />Profile
                </button>
                <div className="Layer" style={{ top: '55px', width: '77px' }}></div>
                <button className="Button" style={{ transform: 'translateX(+65px)', top: '75px' }} onClick={ClickingHomepage}
                    onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                    onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
                    <FontAwesomeIcon icon={faHouse} style={{ fontSize: '18px', color: "#004AAD", marginRight: '15px' }} /> Main
                </button>

                <div className="container" style={{ marginTop: '30px', marginBottom: '30px' }}>
                    <div className="text_group field" style={{ width: '280px', left: '-65px', marginRight: '10px', top:'-105px' }}>
                        <input
                            style={{ width: '280px', left: '0px', marginRight: '10px' }}
                            type="text"
                            className="text_box"
                            placeholder="New Destination"
                            value={newDestination}
                            onChange={(e) => setNewDestination(e.target.value)}
                        />
                        <label htmlFor="newDestination" className="group_label"><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Destination</label>
                    </div>
                    <div className="text_group field" style={{ width: '180px', left: '-30px' , top:'-105px'}}>
                        <input
                            style={{ width: '200px', marginRight: '10px' }}
                            type="date"
                            className="text_box"
                            value={newStartDate}
                            onChange={(e) => setNewStartDate(e.target.value)}
                        />
                        <label htmlFor="newStartDate" className="group_label"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> Start Date</label>
                    </div>
                    <div className="text_group field" style={{ width: '180px', left: '20px' , top:'-105px'}}>
                        <input
                            style={{ width: '200px', marginRight: '10px' }}
                            type="date"
                            className="text_box"
                            value={newEndDate}
                            onChange={(e) => setNewEndDate(e.target.value)}
                        />
                        <label htmlFor="newEndDate" className="group_label"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> End Date</label>
                    </div>
                    <button className="Find_Button" style={{ width: '250px', left: '85px', height: '68px', top:'10px' }} onClick={handleSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlassLocation} style={{ color: "white", padding: '10px' }} />
                        Find New Journey
                    </button>
                </div>

                <div className='line' style={{ marginTop: '-100px' }}></div>
                <div style={{ display: 'flex' }}>
                    <div className='filter' style={{ top: '0px', width: '200px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '20px', height: '725px', color: 'grey' }}>
                        <div>
                            <h3 style={{ color: '#636363' }}>Rate</h3>
                            {[5, 4, 3, 2, 1].map((rate, index) => (
                                <div key={index}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedRates.includes(rate)}
                                            onChange={() => FilterRate(rate)}
                                        />
                                        {starsArray(rate)}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 style={{ color: '#636363', borderTop: '1px solid #C9C9C9', paddingTop: '10px', marginTop: '40px' }}>Price</h3>
                            <div className="container" style={{ transform: 'scale(0.8)', height: '70px' }}>
                                <div className="text_group field" style={{ width: '300px', left: '-0px', top: '-130px' }}>
                                    <input
                                        type="text"
                                        className="text_box"
                                        style={{ width: '50px' }}
                                        placeholder="Min"
                                        name="Min"
                                        id="Min"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="Min" className="group_label"> Min</label>
                                </div>
                                <p style={{ transform: 'scale(2)', left: '-05px', top: '-05px', position: 'relative' }}>-</p>

                                <div className="text_group field" style={{ width: '300px', left: '0px', top: '-130px' }}>
                                    <input
                                        type="text"
                                        className="text_box"
                                        style={{ width: '50px' }}
                                        placeholder="Max"
                                        name="Max"
                                        id="Max"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="Max" className="group_label"> Max</label>
                                </div>
                            </div>
                        </div>

                        <button className='Submit-Search-Button' style={{ left: '15px' }} onClick={handleFilter}>
                            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon> Filter
                        </button>
                    </div>
                    <div className='Scroll-Area'>
                    {(filteredHotels.length > 0 ? filteredHotels : hotels).map((hotel, index) => (
                        <div key={`${hotel.hotelID}-${index}`}>
                            <div className="Search-Container" style={{ transform: 'scale(0.85)', left: '-45px', marginTop: '5px', marginBottom: '-20px', position: 'relative' }}>
                                <img className='Search-Image' src={`${process.env.PUBLIC_URL}/images/${hotel.imageURL}`} alt={hotel.hotel_name} />
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '28px', marginTop: '35px' }}>{hotel.hotel_name}</div>
                                    <div style={{ color: 'rgb(83, 83, 83)', fontSize: '24px', marginTop: '0px' }}>{hotel.star}-Stars Hotel</div>
                                    <div style={{ fontSize: '24px', marginTop: '10px' }}>{hotel.roomSize}</div>
                                </div>
                                <div style={{ position: 'fixed', fontSize: '30px', marginTop: '40px', left: '925px', zIndex: '100', color: '#1c6632' }}>${hotel.dailyPrice}</div>
                                <button className="explore_button" onClick={() => ClickingExplore(hotel.hotelID, hotel.room_typeID)}>Explore!</button>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
