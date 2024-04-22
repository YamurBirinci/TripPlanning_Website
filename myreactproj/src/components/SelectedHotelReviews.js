import '../styles/SelectedHotelReviews.css'; 
import '../styles/Primary.css'; 

function SelectedHotelReviews({ reviews }) {

    let ratingNumber = reviews.length;
    const locationSum = reviews.reduce((sum, row) => sum + row.locationRating, 0);
    const staffSum = reviews.reduce((sum, row) => sum + row.staffRating, 0);
    const cleanlinessSum = reviews.reduce((sum, row) => sum + row.cleanlinessRating, 0);

    return (
        <div className='Reviews-Container'>
                <div className='Rating-Container'> 
                    <div className='Rating'> 
                        <div style={{ color: '#004AAD', fontSize: '20px', fontWeight: 'Bold', position: 'relative', left: '35px', marginTop: '15px'}}>Overall</div>
                        <div style={{ color: '#004AAD', fontSize: '30px', fontWeight: 'Bold', position: 'relative', left: '50px'}}>{((locationSum+staffSum+cleanlinessSum)/(3*ratingNumber)).toFixed(1)}</div>
                    </div>
                    <div className='Rating'> 
                        <div style={{ fontSize: '20px',  position: 'relative', left: '35px', marginTop: '15px'}}>Location</div>
                        <div style={{ fontSize: '30px', position: 'relative', left: '50px'}}>{(locationSum/ratingNumber).toFixed(1)}</div>
                    </div>
                    <div className='Rating'> 
                        <div style={{ fontSize: '20px',  position: 'relative', left: '50px', marginTop: '15px'}}>Staff</div>
                        <div style={{ fontSize: '30px', position: 'relative', left: '50px'}}>{(staffSum/ratingNumber).toFixed(1)}</div>
                    </div>
                    <div className='Rating'> 
                        <div style={{ fontSize: '20px',  position: 'relative', left: '15px', marginTop: '15px'}}>Cleanliness</div>
                        <div style={{ fontSize: '30px', position: 'relative', left: '50px'}}>{(cleanlinessSum/ratingNumber).toFixed(1)}</div>
                    </div>
                </div> 

                {reviews.map(review => 
                    (<div key={review}> <div className="Comments-Container">
                        <div className='Comment-Rating'>{((review.locationRating + review.staffRating + review.cleanlinessRating)/3).toFixed(1)}</div>
                        <div className='Comment'>
                    {review.comment}</div></div> <div className="Date">{review.date}</div> </div>))} 
        </div>
    );
}


export default SelectedHotelReviews;

/*
{reviews.map(review => (
          <div className="Amenities-Item" key={review}>
            <FontAwesomeIcon icon={amenitiesIcons[review]}  /> 
            {amenitiesDescriptions[review] }
          </div>
        ))}
*/