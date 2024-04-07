import '../styles/Homepage.css'; 
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Homepage() {
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    return (
        <div class="Background_Rectangle">
            <div class="name_logo"></div>
            <div class="line"></div>
            <div class="form__group field">
                <input type="input" class="form__field" placeholder="." name="." id='destination' required />
                <label for="name" class="form__label">Destination</label>
            </div>

            <div class="container">
            <div className="form__group2 field">
                <input
                type="text"
                className="form__field2"
                placeholder="Start Date"
                name="start_date"
                id="start"
                required
                onFocus={() => setShowStartDatePicker(true)}
                value={selectedStartDate.toISOString().substring(0, 10)}
                readOnly
            />
            <label htmlFor="start" className="form__label">Start Date</label>
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
    

            <div className="form__group3 field">
                <input
                type="text"
                className="form__field2"
                placeholder="End Date"
                name="end_date"
                id="end"
                required
                onFocus={() => setShowEndDatePicker(true)}
                value={selectedEndDate.toISOString().substring(0, 10)}
                readOnly
            />
            <label htmlFor="start" className="form__label">End Date</label>
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

        <button className="search_button">Find Your Journey</button>
    </div>
    );
}


export default Homepage;