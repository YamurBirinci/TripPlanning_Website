import '../styles/SelectedHotelReviews.css'; 
import '../styles/Primary.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

function SelectedHotelReviews({ reviews }) {

    let ratingNumber = reviews.length;
    const locationSum = reviews.reduce((sum, row) => sum + row.locationRating, 0);
    const staffSum = reviews.reduce((sum, row) => sum + row.staffRating, 0);
    const cleanlinessSum = reviews.reduce((sum, row) => sum + row.cleanlinessRating, 0);

    const [visibleCommentPanel, setVisibleCommentPanel] = useState(false);
    const [comment, setComment] = useState('');

    const VisiblePanel = () =>{setVisibleCommentPanel(true);};
    const UnvisiblePanel = () => {setVisibleCommentPanel(false);};

    const settingComment = (event) => {
        setComment(event.target.value); 
    };

    

    return (
        <div className='Reviews-Container'>
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

                    {visibleCommentPanel && (<div className='Comment-Panel'>
                        <button className="close" style={{border: '1px solid #a6a6a6c2', color: 'black', fontSize: '30px'}} onClick={UnvisiblePanel}>x</button>
                        <div className='container' style={{ height: '150px'}}>
                            <div className="text_group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                                <input type="input" className="text_box" style={{ width: '120px'}} placeholder="Location" name="Location" id='LocationRate' required />
                                <label for="LocationRate" className="group_label">Location</label>
                            </div>
                            <div className="text_group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                                <input type="input" className="text_box" style={{ width: '120px'}} placeholder="StaffRate" name="StaffRate" id='StaffRate' required />
                                <label for="StaffRate" className="group_label">Staff</label>
                            </div>
                            <div className="text_group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                                <input type="input" className="text_box" style={{ width: '120px'}} placeholder="CleanlinessRate" name="CleanlinessRate" id='CleanlinessRate' required />
                                <label for="CleanlinessRate" className="group_label">Cleanliness</label>
                            </div>
                        </div>
                        <div>
                            <textarea className='Comment-Input' 
                                value={comment}      
                                placeholder="Please enter your comment"
                                onChange={settingComment}  
                            />
                            <button className='search_button' style={{ left: '415px', top: '30px'}}onClick={UnvisiblePanel}> <FontAwesomeIcon icon={faCommentDots}  /> Add Comment</button>
                        </div>
                    </div>)}
                </div> 

                {reviews.map(review => 
                    (<div key={review}> <div className="Comments-Container">
                        <div className='Comment-Rating'>{((review.locationRating + review.staffRating + review.cleanlinessRating)/3).toFixed(1)}</div>
                        <div className='Comment'>
                    {review.comment}</div></div> <div className="Date">{review.date}</div> 
                </div>))} 
        </div>
    );
}


export default SelectedHotelReviews;
