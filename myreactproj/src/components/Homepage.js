import '../styles/Homepage.css'; 
import '../styles/Primary.css'; 
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

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
        <div class="Background_Rectangle">

            <div class="name_logo"></div>
            <button className="Login" onClick={ClickingLogin}>Log In</button>
            <div class="line"></div>
            
            <div class="form__group field">
                <input type="input" class="form__field" placeholder="Destination" name="destination" id="destination" required />
                <label for="destination" class="form__label">Destination</label>
            </div>

            <div class="container">
                <div className="form__group field" style={{ width: '300px', left: '55px', top: '-80px' }}>
                    <input
                    type="text"
                    className="form__field"
                    style={{ width: '210px'}}
                    placeholder="Start Date"
                    name="start_date"
                    id="start_date"
                    required
                    onFocus={() => setShowStartDatePicker(true)}
                    value={selectedStartDate.toISOString().substring(0, 10)}
                    readOnly
                />
                <label htmlFor="start_date" className="form__label">Start Date</label>
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
    
                <div className="form__group field" style={{ width: '300px', left: '25px', top: '-80px' }}>
                    <input
                    type="text"
                    className="form__field"
                    style={{ width: '210px'}}
                    placeholder="End Date"
                    name="end_date"
                    id="end_date"
                    required
                    onFocus={() => setShowEndDatePicker(true)}
                    value={selectedEndDate.toISOString().substring(0, 10)}
                    readOnly
                />
                <label htmlFor="end_date" className="form__label">End Date</label>
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


            <button className="search_button" onClick={ClickingSearch}>Find Your Journey</button>
    </div>
    );
}


export default Homepage;