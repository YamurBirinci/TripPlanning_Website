import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faHouse, faCircleCheck, faRightFromBracket, faUser, faChartSimple, faHotel } from '@fortawesome/free-solid-svg-icons';
import PhotoGallery from './PhotoGallery';
import AdminStatistics from './AdminStatistics';
import AdminHotelOwnerTable from './AdminHotelOwnerTable';
import '../styles/Primary.css';
import '../styles/Admin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('PendingApproval');
    const [activePanel, setActivePanel] = useState('PendingApproval-Panel');
    const [activeImagesButton, setActiveImagesButton] = useState('');
    const [activeImageContainer, setActiveImageContainer] = useState(null);
    const [pendingApprovalItems, setPendingApprovalItems] = useState([]);

    const ClickingHomepage = () => {
        navigate('/');
    };

    const clickingPanelButton = (buttonID, panelName) => {
        setActiveButton(buttonID);
        setActivePanel(panelName);
    };

    const clickingImagesPanelButton = (hotelID, button) => {
        setActiveImagesButton(button);
        setActiveImageContainer(hotelID);
    };

    const closeContainer = () => {
        setActiveImageContainer(null);
        setActiveImagesButton('');
    };

    const handleApproval = async (hotelID, action) => {
        const confirmMessage = action === 'approve' ? 'approve this hotel?' : 'reject this hotel?';
        if (window.confirm(`Are you sure you want to ${confirmMessage}`)) {
            try {
                const response = await fetch(`http://localhost:8081/api/hotels/${hotelID}/${action}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    toast.success(`Hotel ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
                    fetchPendingApprovalItems();
                } else {
                    toast.error('Something went wrong...');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const fetchPendingApprovalItems = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/hotels/pending');
            if (response.ok) {
                const data = await response.json();
                const hotelsWithDetails = await Promise.all(data.map(async hotel => {
                    const amenitiesResponse = await fetch(`http://localhost:8081/api/hotels/${hotel.hotelID}/amenities`);
                    const imagesResponse = await fetch(`http://localhost:8081/api/hotels/${hotel.hotelID}/images`);
                    const amenities = amenitiesResponse.ok ? await amenitiesResponse.json() : [];
                    const images = imagesResponse.ok ? await imagesResponse.json() : [];
                    const imageURLs = images.map(image => image.imageURL);
                    return { ...hotel, amenities, images: imageURLs };
                }));
                setPendingApprovalItems(hotelsWithDetails);
            } else {
                toast.error('Something went wrong...');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchPendingApprovalItems();
    }, []);

    return (
        <div className='background'>
            <div className="Background_Rectangle" style={{ height: '800px', transform: 'scale(0.90)' }}>
                <button className="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent', left: '70px' }} onClick={ClickingHomepage} ></button>
                <div className="Layer" style={{ top: '25px', width: '77px' }}></div>
                <button className="Button" style={{ transform: 'translateX(+65px)', top: '45px', color: 'black' }} onClick={ClickingHomepage}
                    onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                    onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
                    <FontAwesomeIcon icon={faHouse} style={{ fontSize: '18px', color: "black", marginRight: '15px' }} /> Main
                </button>
                <button style={{ left: '320px' }} className={`ProfileButton ${activeButton === 'PendingApproval' ? 'Active-ProfileButton' : ''}`}
                    onClick={() => clickingPanelButton('PendingApproval', 'PendingApproval-Panel')}>
                    <FontAwesomeIcon icon={faHotel}></FontAwesomeIcon> Pending Approval
                </button >
                <button style={{ left: '320px' }} className={`ProfileButton ${activeButton === 'HotelOwners' ? 'Active-ProfileButton' : ''}`}
                    onClick={() => clickingPanelButton('HotelOwners', 'HotelOwners-Panel')}>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Hotel Owners
                </button>
                
                <button className='ProfileButton' style={{ left: '320px' }}> <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon> Log Out</button>

                <div className="line" style={{ top: '220px' }}></div>

                {activePanel === 'PendingApproval-Panel' && <div className='PendingApproval-Panel'>
                    <div className="ProfileButton-Panel-Container">
                        <div className='Scroll-Area' style={{ top: '-25px', position: 'relative', height: '630px' }}>
                            {pendingApprovalItems.map(hotel => (
                                <div key={hotel.hotelID} className="PendingApproval-Container" style={{ position: 'relative', marginBottom: '20px' }}>
                                    {activeImageContainer === hotel.hotelID && (
                                        <div className='SelectedPendingHotel-Container'>
                                            <PhotoGallery images={hotel.images} />
                                            <div className='Close-Pending' onClick={closeContainer}>x</div>
                                        </div>
                                    )}

                                    <div className="ApprovalInfo" >
                                        <div style={{ fontWeight: 'bold', fontSize: '28px', marginBottom: '5px' }}><FontAwesomeIcon icon={faHotel}></FontAwesomeIcon> {hotel.hotelName}</div>
                                        <div style={{ fontSize: '24px' }}> {hotel.address}</div>
                                        <div style={{ fontSize: '24px', fontStyle: 'italic', color: 'grey' }}>
                                            {hotel.amenities.map(a => a.amenity_name).join(', ')}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'end', marginLeft: 'auto', color: 'white' }}>
                                        <div style={{ display: 'grid' }}>
                                            <button
                                                className={`PendingItems-Button ${activeImagesButton === 'Images' && activeImageContainer === hotel.hotelID ? 'Active-ProfileButton2' : ''}`}
                                                onClick={() => clickingImagesPanelButton(hotel.hotelID, 'Images')}
                                            >
                                                {hotel.images.length} Images
                                            </button>
                                            <button className='Confirm-Reject-Button' style={{ color: 'green' }} onClick={() => handleApproval(hotel.hotelID, 'approve')}><FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green' }}></FontAwesomeIcon> Confirm</button>
                                            <button className='Confirm-Reject-Button' style={{ color: 'red' }} onClick={() => handleApproval(hotel.hotelID, 'reject')}><FontAwesomeIcon icon={faCircleXmark} style={{ color: 'red' }}></FontAwesomeIcon> Reject</button>
                                        </div>
                                    </div>
                                </div>))}
                        </div>
                    </div>
                </div>}

                {activePanel === 'HotelOwners-Panel' && <div className='HotelOwners-Panel'>
                    <div className="ProfileButton-Panel-Container">
                        <AdminHotelOwnerTable />
                    </div>

                </div>}

                
            </div>
        </div>
    );
}
export default Admin;
