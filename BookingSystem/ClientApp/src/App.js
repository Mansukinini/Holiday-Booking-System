import React, { useState } from 'react';
import axios from 'axios';
import InquiryBooking from './components/InquiryBooking';
// import CaptureBookingDates from './components/CaptureBookingDates';
import PersonForm from './components/PersonForm';
import BookingList from './components/BookingList';
import './App.css';

function App() {
    const [bookings, setBookings] = useState([]);
    const [bookingType, setBookingType] = useState(null);
    const [bookingDetails, setbookingDetails] = useState(null);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('/api/PersonBooking');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    // useEffect(() => {
    //     fetchBookings();
    // }, []);

    const handleBookingAdded = (newBooking) => {
        setbookingDetails(newBooking);
    };

    const handlePersonAdded = (newBooking) => {
        setBookings(prevBookings => [...prevBookings, newBooking]);
        setbookingDetails(null);
    };

    const handleBookingDeleted = () => {
        fetchBookings();
    };

    return (
        <div className="App" style={{ margin: '20px' }}>
            <h3 className="heading">Holiday Booking System </h3>
            <InquiryBooking bookingType={bookingType} setBookingType={setBookingType} onBookingAdded={handleBookingAdded} />

            { bookingDetails && (
                <PersonForm bookingDetails={bookingDetails} onBookingAdded={handlePersonAdded}  />
            )}           

            {bookings.length > 0 && (<hr />)}
            {bookings.length > 0 && (<BookingList bookings={bookings} onBookingDeleted={handleBookingDeleted} />)}            
        </div>
    );
}

export default App;
