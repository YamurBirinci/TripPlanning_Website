import React, { useState } from 'react';
import '../styles/ExploreDetailModal.css'; 
import PhotoGallery from './PhotoGallery'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';

const ExploreDetailModal = ({ isOpen, closeModal, placeInfo, placeReviews, images }) => {
  const [visibleCommentPanel, setVisibleCommentPanel] = useState(false);
  const [comment, setComment] = useState('');

  if (!isOpen) {
    return ;
  }

  const SettingComment = (event) => {
    setComment(event.target.value); 
  };

  const VisiblePanel = () => {setVisibleCommentPanel(true);};
  const UnvisiblePanel = () => {setVisibleCommentPanel(false);};

  const targetPlaceReviews = placeReviews.filter(placeReviews => placeReviews.name === placeInfo.name && placeReviews.rate != null);
  const averageRate = targetPlaceReviews.reduce((total, placeReviews) => total+placeReviews.rate, 0)/targetPlaceReviews.length;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <button className="close" style={{backgroundColor: 'transparent', border: 'none'}} onClick={closeModal}>X</button>
      <div className="modal-content">
        <div className="PhotoGallery-Container" style={{marginTop: '20px'}} >
          <PhotoGallery images={images} />
        </div>

        <h1 style={{marginTop: '20px', left: '46px', position: 'relative'}}>{placeInfo.name}
        <FontAwesomeIcon icon={faStar} style={{ color: "#e6b70f", left: '20px', position: 'relative', marginRight: '15px', fontSize:'20px'}} /> {averageRate} 
        </h1>

        <p style={{marginTop: '-15px', display:'list-item', left: '68px', position: 'relative'}}>{placeInfo.type}</p>
        <p style={{left: '45px', position: 'relative', color: 'black', width: '762px', marginBottom: '-40px'}}>{placeInfo.definition}</p>
        <button className='Comment-Button' onClick={VisiblePanel} style={{width: '770px', position: 'relative', left: '30px', borderBottom: '2px solid #A6A6A6', paddingBottom: '15px', textAlign: 'right'}}> <FontAwesomeIcon icon={faCommentDots}  /> Comment</button>

        {visibleCommentPanel && (<div className='Comment-Panel' style={{ top: '30px', position: 'relative', width: '770px', left: "40px", height: '300px', marginBottom: '20px'}}>
          <button className="close" style={{border: '1px solid #a6a6a6c2', color: 'black', fontSize: '30px', borderRadius: '8px'}} onClick={UnvisiblePanel}>x</button>
          <div className='container' style={{ height: '150px', marginBottom: '-150px'}}>
            <div className="text_group field" style={{ width: '200px', left: '15px', top: '-90px'}}>
              <input type="input" className="text_box" style={{ width: '120px'}} placeholder="Vote" name="Vote" id='Vote' required />
              <label htmlFor="Vote" className="group_label">Your Vote</label>
            </div>
          </div>
          <textarea className='Comment-Input' style={{ top: '120px', position: 'relative', width: '690px', left: "40px", height: '100px', marginBottom: '20px', marginTop: '-20px'}} 
            value={comment}      
            placeholder="Please enter your comment"
            onChange={SettingComment} 
          />
          <button className='search_button' style={{ left: '245px', top: '140px', transform: 'scale(0.85)'}}onClick={UnvisiblePanel}> <FontAwesomeIcon icon={faCommentDots}  /> Add Comment</button>
        </div>)}

        {placeReviews.map((review, index) => (
          <div key={index}>
            <div style={{width: '800px', padding: '10px'}}>
              <div className='Comment-Box'>{review.comment} 
              <p style={{position: 'relative', left: '635px', fontSize: '15px'}}>{review.date}</p>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>,
    document.body
  );
};

export default ExploreDetailModal;
