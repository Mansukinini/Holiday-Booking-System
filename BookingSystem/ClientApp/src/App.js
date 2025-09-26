import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InquiryBooking from './components/InquiryBooking';
import PersonForm from './components/PersonForm';
import BookingList from './components/BookingList';
import './App.css';

function App() {
    const [bookings, setBookings] = useState([]);
    const [bookingTypes, setBookingTypes] = useState([]);
    const [bookingDetails, setbookingDetails] = useState(null);
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const fetchBookingTypes = async () => {
        try {
            const response = await axios.get('/api/Bookings/bookingType');
            setBookingTypes(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await axios.get('/api/Bookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    useEffect(() => {
        fetchBookingTypes();
        fetchBookings();
    }, []);

    const handleBookingAdded = (newBooking) => {
        setbookingDetails(newBooking);
        setCurrentTabIndex(1); // Move to personal info step
    };

    const handlePersonAdded = (newBooking) => {
        setBookings(prevBookings => [...prevBookings, newBooking]);
        setbookingDetails(null);
        setCurrentTabIndex(2); // Move to booking complete step
    };

    const handleBookingDeleted = () => {
        fetchBookings();
    };

    const handleNewBooking = () => {
        setbookingDetails(null);
        setCurrentTabIndex(0); 
    };

    return (
        <div className="App" style={{ margin: '20px 220px' }}>
            <h3 className="heading">Holiday Booking System</h3>
            {/* <div className="sign-up-box-row row align-items-center justify-content-center">
                <div className="sign-up-box col-5 col-xs-12">
                    <div className="row align-items-center justify-content-center">
                        <div className="col wizard-tabs">
                            <FormWizard 
                                id="bookingWizard" tabs={tabs}
                                currentTabIndex={currentTabIndex} />
                        </div>
                    </div>
                </div>
            </div> */}

            { currentTabIndex === 0 && (<InquiryBooking bookingTypes={bookingTypes} currentTabIndex={currentTabIndex} onBookingAdded={handleBookingAdded} />)}

            { currentTabIndex === 1 && bookingDetails && (
                <PersonForm bookingDetails={bookingDetails} onBookingAdded={handlePersonAdded} />
            )}

            { currentTabIndex === 2 && bookings.length > 0 && (
                <div className="section-row" >
                    <div className="form-group">
                        Thank You! <br/>
                        Your Booking has been successfully submitted. <br/>
                        <br/>
                        Reference Number: <span>{bookings[bookings.length - 1].refNo}</span> <br/>                        
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center" style={{ marginTop: '20px' }}>
                        <button onClick={handleNewBooking} className="btn btn-outline-primary btn-square">New Booking</button> 
                    </div> 
                </div>
            )}

            {bookings.length > 0 && (<hr />)}
            {bookings.length > 0 && (<BookingList bookings={bookings} onBookingDeleted={handleBookingDeleted} />)}            
        </div>
    );
}

export default App;
