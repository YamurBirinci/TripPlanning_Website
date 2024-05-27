import '../styles/Homepage.css'; 
import '../styles/Primary.css'; 
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faLocationDot, faChild, faCalendarDays } from '@fortawesome/free-solid-svg-icons';


function Homepage() {
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const navigate = useNavigate();

    const ClickingLogin = () => {
        navigate('/Login');
    };

    const ClickingSearch = () => {
        navigate('/Search');
    };


    return (
        <div className='background-homepage'>
            <div className="Background_Rectangle" style={{transform: 'scale(0.9)'}}>
                

                <div className="name_logo"></div>
                <button className="Login" onClick={ClickingLogin}>Log In</button>
                <div className="line"></div>
                
                <div className="text_group field" style={{ top: '-50px' }}>
                    <input type="input" className="text_box" placeholder="Destination" name="destination" id="destination" required />
                    <label htmlFor="destination" className="group_label"><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Destination</label>
                </div>

                <div className="container">
                    <div className="text_group field" style={{ width: '300px', left: '55px', top: '-130px' }}>
                        <input
                        type="text"
                        className="text_box"
                        style={{ width: '210px'}}
                        placeholder="Adult"
                        name="Adult"
                        id="Adult"
                        required
                    />
                    <label htmlFor="Adult" className="group_label" > <FontAwesomeIcon icon={faPerson}></FontAwesomeIcon> Number of Adult</label>
                    </div>

                    
        
                    <div className="text_group field" style={{ width: '300px', left: '25px', top: '-130px' }}>
                        <input
                        type="text"
                        className="text_box"
                        style={{ width: '210px'}}
                        placeholder="Kids"
                        name="Kids"
                        id="Kids"
                        required
                    />
                    <label htmlFor="Kids" className="group_label"> <FontAwesomeIcon icon={faChild}></FontAwesomeIcon> Number of Kids</label>
                    </div>
                </div>

                <div className="container">
                    <div className="text_group field" style={{ width: '300px', left: '55px', top: '-210px' }}>
                        <input
                        type="text"
                        className="text_box"
                        style={{ width: '210px'}}
                        placeholder="Start Date"
                        name="start_date"
                        id="start_date"
                        required
                        onFocus={() => setShowStartDatePicker(true)}
                        value={selectedStartDate.toISOString().substring(0, 10)}
                        readOnly
                    />
                    <label htmlFor="start_date" className="group_label"> <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> Start Date</label>
                    <div className="datepicker-container">
                        {showStartDatePicker && (
                        <DatePicker
                            selected={selectedStartDate}
                            onChange={(date) => {
                            setSelectedStartDate(date);
                            setShowStartDatePicker(false);
                        }}
                        minDate={new Date()}
                        inline
                        />
                    )}
                    </div>
                    </div>

                    
        
                    <div className="text_group field" style={{ width: '300px', left: '25px', top: '-210px' }}>
                        <input
                        type="text"
                        className="text_box"
                        style={{ width: '210px'}}
                        placeholder="End Date"
                        name="end_date"
                        id="end_date"
                        required
                        onFocus={() => setShowEndDatePicker(true)}
                        value={selectedEndDate.toISOString().substring(0, 10)}
                        readOnly
                    />
                    <label htmlFor="end_date" className="group_label"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> End Date</label>
                    <div className="datepicker-container">
                        {showEndDatePicker && (
                        <DatePicker
                            selected={selectedEndDate}
                            onChange={(date) => {
                            setSelectedEndDate(date);
                            setShowEndDatePicker(false);
                        }}
                        minDate={new Date()}
                        inline
                        />
                        )}
                    </div>
                    </div>
                </div>


                <button className="search_button" style={{top: '-150px' }} onClick={ClickingSearch}>Find Your Journey</button>
        </div>
    </div>
    );
}


export default Homepage;