import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faHouse, faCircleCheck, faRightFromBracket, faUser, faChartSimple, faHotel} from '@fortawesome/free-solid-svg-icons';
import PhotoGallery from './PhotoGallery';
import AdminStatistics from './AdminStatistics';
import AdminHotelOwnerTable from './AdminHotelOwnerTable';
import '../styles/Primary.css'; 
import '../styles/Admin.css'; 

import Angeles1 from '../images/Angeles1.PNG';
import Angeles2 from '../images/Angeles2.PNG';
import Angeles3 from '../images/Angeles3.PNG';
import Angeles4 from '../images/Angeles4.PNG';
import Angeles5 from '../images/Angeles5.PNG';
import Angeles6 from '../images/Angeles6.PNG';

const images = [
    Angeles1,
    Angeles2,
    Angeles3,
    Angeles4,
    Angeles5,
    Angeles6,
];

const PendingApprovalItems = [
    { Hotel_Name: "Hotel Angeles Center", Hotel_Info: "4-Star Hotel", Hotel_Location: "Calle Juan De Mata Carriazo 7, Seville, Spain", Hotel_Price: 146, Numberimage: 6, PendingApprovalAmenities: ['Free Internet Access', 'Swimming Pool', 'Business Center', 'Accessible Rooms']},
    { Hotel_Name: "Hotel Cervantes", Hotel_Info: "5-Star Hotel", Hotel_Location: "Old Town, Seville, Spain", Hotel_Price: 176, Numberimage: 6, PendingApprovalAmenities: ['Golf Course', 'Free Breakfast', 'Airport Shuttle', 'Accessible Rooms', 'Playground for children']},

];


function Admin() {

    const navigate = useNavigate();

    const ClickingHomepage = () => {
        navigate('/');
    };


    const [activeButton, setActiveButton] = useState('PendingApproval');
    const [activePanel, setActivePanel] = useState('PendingApproval-Panel');

    const [activeImagesButton, setActiveImagesButton] = useState('');
    const [activeImageContainer, setActiveImageContainer] = useState(null);

    const clickingPanelButton=(buttonID,panelName) => {
        setActiveButton(buttonID);
        setActivePanel(panelName);
    };

    const clickingImagesPanelButton=(hotelID,button) => {
        setActiveImagesButton(button);
        setActiveImageContainer(hotelID); 
    };

    const closeContainer = () => {
        setActiveImageContainer(null);
        setActiveImagesButton('');
    };
    

    const ConfirmToApproval = () => {
        window.confirm("Are you sure?");
    }
    const ConfirmToReject = () => {
        window.confirm("Are you sure?");
    }

    return (
        <div className='background'>
            <div className="Background_Rectangle" style={{ height: '800px', transform: 'scale(0.90)'}}>
                <button className="name_logo" style={{ height: '100px', border: '0px', backgroundColor: 'transparent', left: '70px'}} onClick={ClickingHomepage} ></button>
                <div className="Layer" style={{top: '25px',width: '77px'}}></div>
                    <button className="Button" style={{ transform: 'translateX(+65px)', top: '45px', color: 'black'}} onClick={ClickingHomepage}
                        onMouseEnter={event => event.currentTarget.style.transform = 'translateX(0)'}
                        onMouseLeave={event => event.currentTarget.style.transform = 'translateX(+65px)'}>
                        <FontAwesomeIcon icon={faHouse} style={{ fontSize: '18px', color: "black", marginRight: '15px'}} /> Main
                    </button>
                <button style={{left: '180px'}} className={`ProfileButton ${activeButton === 'PendingApproval' ? 'Active-ProfileButton' : ''}`}
                    onClick={() => clickingPanelButton('PendingApproval', 'PendingApproval-Panel')}>
                    <FontAwesomeIcon icon={faHotel}></FontAwesomeIcon> Pending Approval
                </button >
                <button style={{left: '180px'}} className={`ProfileButton ${activeButton === 'HotelOwners' ? 'Active-ProfileButton' : ''}`}
                    onClick={() => clickingPanelButton('HotelOwners', 'HotelOwners-Panel')}>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Hotel Owners
                </button>
                <button style={{left: '180px'}} className={`ProfileButton ${activeButton === 'Statistics' ? 'Active-ProfileButton' : ''}`}
                    onClick={() => clickingPanelButton('Statistics', 'Statistics-Panel')}>
                    <FontAwesomeIcon icon={faChartSimple}></FontAwesomeIcon> Statistics
                </button>
                <button className= 'ProfileButton' style={{left: '180px'}}> <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon> Log Out</button>


                <div className="line" style={{ top: '220px'}}></div>


                {activePanel === 'PendingApproval-Panel' && <div className='PendingApproval-Panel'>
                    <div className="ProfileButton-Panel-Container">
                        <div className='Scroll-Area' style={{top: '-25px', position: 'relative', height: '630px'}}>
                            {PendingApprovalItems.map(Hotel => (
                                <div key={Hotel.Hotel_Name} className="PendingApproval-Container" style={{ position: 'relative', marginBottom: '20px'}}>
                                    {activeImageContainer === Hotel.Hotel_Name && (
                                        <div className='SelectedPendingHotel-Container'>
                                            <div style={{position: 'fixed', height: 'inherit', width: 'inherit'}}>
                                            <PhotoGallery images={images} /> 
                                            </div>
                                            <div className='Close-Pending' onClick={closeContainer}>x</div>
                                        </div>
                                    )}
                                    
                                    <div className="ApprovalInfo" >
                                        <div style={{fontWeight: 'bold', fontSize: '28px', marginBottom: '5px'}}><FontAwesomeIcon icon={faHotel}></FontAwesomeIcon> {Hotel.Hotel_Name}</div>
                                        <div style={{color: 'green', fontSize: '24px', marginBottom: '5px'}}>${Hotel.Hotel_Price}</div>
                                        <div style={{fontSize: '24px'}}> {Hotel.Hotel_Location}</div>
                                        <div style={{fontSize: '24px', fontStyle: 'italic', color: 'grey'}}>{Hotel.PendingApprovalAmenities.join(', ')}</div>
                                    </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'end', marginLeft:'auto', color: 'white'}}>
                                    <div style={{ display: 'grid'}}>
                                        <button 
                                            className={`PendingItems-Button ${activeImagesButton === 'Images' && activeImageContainer === Hotel.Hotel_Name ? 'Active-ProfileButton2' : ''}`} 
                                            onClick={() => clickingImagesPanelButton(Hotel.Hotel_Name, 'Images')}
                                            >
                                            {Hotel.Numberimage} Images
                                        </button>
                                        <button className='Confirm-Reject-Button' style={{color: 'green'}} onClick={ConfirmToApproval}><FontAwesomeIcon icon={faCircleCheck} style={{color: 'green'}}></FontAwesomeIcon> Confirm</button>
                                        <button className='Confirm-Reject-Button' style={{color: 'red'}} onClick={ConfirmToReject}><FontAwesomeIcon icon={faCircleXmark} style={{color: 'red'}}></FontAwesomeIcon> Reject</button>
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

                {activePanel === 'Statistics-Panel' && <div className='Statistics-Panel'>
                    <div className="ProfileButton-Panel-Container" >
                    <AdminStatistics />
                    </div>
                
                </div>}
            </div>
        </div>
    );

}
export default Admin;