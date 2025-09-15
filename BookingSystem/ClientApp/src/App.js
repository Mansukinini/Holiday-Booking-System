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
            <InquiryBooking bookingTypes={bookingTypes} onBookingAdded={handleBookingAdded} />

            { bookingDetails && (
                <PersonForm bookingDetails={bookingDetails} onBookingAdded={handlePersonAdded}  />
            )}           

            {bookings.length > 0 && (<hr />)}
            {bookings.length > 0 && (<BookingList bookings={bookings} onBookingDeleted={handleBookingDeleted} />)}            
        </div>
    );
}

export default App;
