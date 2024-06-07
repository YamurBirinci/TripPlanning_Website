import '../styles/SelectedHotelReviews.css'; 
import '../styles/Primary.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SelectedHotelReviews({ reviews, hotelID, userID }) {

    let ratingNumber = reviews.length;
    const locationSum = reviews.reduce((sum, row) => sum + row.location_rating, 0);
    const staffSum = reviews.reduce((sum, row) => sum + row.staff_rating, 0);
    const cleanlinessSum = reviews.reduce((sum, row) => sum + row.cleanliness_rating, 0);

    const [visibleCommentPanel, setVisibleCommentPanel] = useState(false);
    const [comment, setComment] = useState('');
    const [locationRating, setLocationRating] = useState('');
    const [staffRating, setStaffRating] = useState('');
    const [cleanlinessRating, setCleanlinessRating] = useState('');

    const VisiblePanel = () => { setVisibleCommentPanel(true); };
    const UnvisiblePanel = () => { setVisibleCommentPanel(false); };

    const settingComment = (event) => {
        setComment(event.target.value); 
    };

    const settingLocationRating = (event) => {
        setLocationRating(event.target.value);
    };

    const settingStaffRating = (event) => {
        setStaffRating(event.target.value);
    };

    const settingCleanlinessRating = (event) => {
        setCleanlinessRating(event.target.value);
    };

    const submitComment = async () => {
        if (isNaN(locationRating) || locationRating < 1 || locationRating > 10) {
            toast.error("Location rating must be a number between 1 and 10");
            return;
        }
        if (isNaN(staffRating) || staffRating < 1 || staffRating > 10) {
            toast.error("Staff rating must be a number between 1 and 10");
            return;
        }
        if (isNaN(cleanlinessRating) || cleanlinessRating < 1 || cleanlinessRating > 10) {
            toast.error("Cleanliness rating must be a number between 1 and 10");
            return;
        }

        const newReview = {
            review_text: comment,
            hotelID: parseInt(hotelID),
            cleanliness_rating: parseInt(cleanlinessRating),
            location_rating: parseInt(locationRating),
            staff_rating: parseInt(staffRating),
            userID: userID
        };
        console.log(hotelID);
        console.log(newReview);

        try {
            const response = await fetch('http://localhost:8081/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
            });

            if (!response.ok) {
                throw new Error('Error submitting comment');
            }

            UnvisiblePanel();

        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <div className='Reviews-Container'>
            <ToastContainer />
                <div className='Rating-Container'> 
                
                    <div className='Rating' style={{left: '50px'}}> 
                        <div style={{ color: '#004AAD', fontSize: '20px', fontWeight: 'Bold', position: 'relative', left: '35px', marginTop: '15px'}}>Overall</div>
                        <div style={{ color: '#004AAD', fontSize: '30px', fontWeight: 'Bold', position: 'relative', left: '50px'}}>{((locationSum+staffSum+cleanlinessSum)/(3*ratingNumber)).toFixed(1)}</div>
                    </div>
                    <div className='Rating' style={{left: '50px'}}> 
                        <div style={{ fontSize: '20px',  position: 'relative', left: '35px', marginTop: '15px'}}>Location</div>
                        <div style={{ fontSize: '30px', position: 'relative', left: '50px'}}>{(locationSum/ratingNumber).toFixed(1)}</div>
                    </div>
                    <div className='Rating' style={{left: '50px'}}> 
                        <div style={{ fontSize: '20px',  position: 'relative', left: '50px', marginTop: '15px'}}>Staff</div>
                        <div style={{ fontSize: '30px', position: 'relative', left: '50px'}}>{(staffSum/ratingNumber).toFixed(1)}</div>
                    </div>
                    <div className='Rating' style={{left: '50px'}}> 
                        <div style={{ fontSize: '20px',  position: 'relative', left: '15px', marginTop: '15px'}}>Cleanliness</div>
                        <div style={{ fontSize: '30px', position: 'relative', left: '50px'}}>{(cleanlinessSum/ratingNumber).toFixed(1)}</div>
                    </div>
                    
                    <button className='Comment-Button' onClick={VisiblePanel}> <FontAwesomeIcon icon={faCommentDots}  /> Comment</button>

                    {visibleCommentPanel && (
                        <div className='Comment-Panel'>
                            <button className="close" style={{border: '1px solid #a6a6a6c2', color: 'black', fontSize: '30px'}} onClick={UnvisiblePanel}>x</button>
                            <div className='container' style={{ height: '150px'}}>
                                <div className="text_group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                                    <input type="number" className="text_box" style={{ width: '120px'}} placeholder="Location" name="Location" id='LocationRate' required 
                                        value={locationRating}
                                        onChange={settingLocationRating}
                                    />
                                    <label htmlFor="LocationRate" className="group_label">Location</label>
                                </div>
                                <div className="text_group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                                    <input type="number" className="text_box" style={{ width: '120px'}} placeholder="StaffRate" name="StaffRate" id='StaffRate' required 
                                        value={staffRating}
                                        onChange={settingStaffRating}
                                    />
                                    <label htmlFor="StaffRate" className="group_label">Staff</label>
                                </div>
                                <div className="text_group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                                    <input type="number" className="text_box" style={{ width: '120px'}} placeholder="CleanlinessRate" name="CleanlinessRate" id='CleanlinessRate' required 
                                        value={cleanlinessRating}
                                        onChange={settingCleanlinessRating}
                                    />
                                    <label htmlFor="CleanlinessRate" className="group_label">Cleanliness</label>
                                </div>
                            </div>
                            <div>
                                <textarea className='Comment-Input' 
                                    value={comment}      
                                    placeholder="Please enter your comment"
                                    onChange={settingComment}  
                                />
                                <button className='search_button' style={{ left: '415px', top: '30px'}} onClick={submitComment}> <FontAwesomeIcon icon={faCommentDots}  /> Add Comment</button>
                            </div>
                        </div>
                    )}
                </div> 

                {reviews.map(review => 
                    (<div key={review.reviewID}> 
                        <div className="Comments-Container">
                            <div className='Comment-Rating' style={{fontSize:'26px'}}>
                                {((review.location_rating + review.staff_rating + review.cleanliness_rating) / 3).toFixed(1)}
                            </div>
                            <div className='Comment'>{review.review_text}</div>
                        </div> 
                        <div className="Date">{review.date}</div> 
                    </div>)
                )} 
        </div>
    );
}

export default SelectedHotelReviews;
