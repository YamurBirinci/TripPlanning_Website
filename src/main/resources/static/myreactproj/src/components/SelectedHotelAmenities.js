import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGolfBallTee, faGamepad, faSpa, faSquareParking, faTableTennis, faPaw, faMugSaucer, faBus, faWheelchair, faUtensils, faSmoking, faBriefcase, faWifi, faSwimmer, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import '../styles/SelectedHotelAmenities.css'; 

const amenitiesIcons = {
    wifi: faWifi,
    pool: faSwimmer,
    gym: faDumbbell,
    briefcase: faBriefcase,
    smoking: faSmoking,
    restaurant: faUtensils,
    wheelchair: faWheelchair,
    bus: faBus,
    breakfast: faMugSaucer,
    pets: faPaw,
    tennis: faTableTennis,
    parking: faSquareParking,
    spa: faSpa,
    game: faGamepad,
    golf: faGolfBallTee
};

const amenitiesDescriptions = {
    wifi:       'Free Internet Access       ',
    pool:       'Swimming Pool              ',
    gym:        'Fitness Center             ',
    briefcase:  'Business Center            ',
    smoking:    'Non Smoking Rooms          ',
    restaurant: 'Restaurant                 ',
    wheelchair: 'Accessible Rooms           ',
    bus:        'Airport Shuttle            ',
    breakfast:  'Free Breakfast             ',
    pets:       'Pets Allowed               ',
    tennis:     'Tennis court & Equipment   ',
    parking:    'Free Parking               ',
    spa:        'Spa/Sauna                  ',
    game:       'Playground for children    ',
    golf:       'Golf Course                '
  };
  

function SelectedHotelAmenities({ features }) {
    return (
        <div className='Amenities-Container'>
            <div className="Amenities" >
            {features.map(feature => (
                <div className="Amenities-Item" key={feature}>
                    <FontAwesomeIcon style={{ 
                        backgroundColor: '#E0E0E0', 
                        borderRadius: '50px', 
                        padding: '7px', 
                        border: '1px solid #a6a6a6a1', 
                        height: '35px',
                        width: '35px',
                        marginRight: '10px',
                        color: '#202020'}} 
                    icon={amenitiesIcons[feature]}  /> 
                    {amenitiesDescriptions[feature] }
                </div>
            ))}
            </div>
        </div>
    );
}


export default SelectedHotelAmenities;