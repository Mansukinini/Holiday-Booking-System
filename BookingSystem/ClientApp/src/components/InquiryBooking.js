import React, { useState } from 'react';

const InquiryBooking = ({ bookingType, setBookingType, onBookingAdded }) => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    
    const capturedates = (e) => {
        e.preventDefault();
        const newBooking = { type: bookingType, dateFrom, dateTo };
        
        onBookingAdded(newBooking);
    };

    const bookingTypes = [
        { id: 1, type: 'Apartment', description: 'Room Booking' },
        { id: 2, type: 'Car', description: 'Equipment Booking' },
        { id: 3, type: 'Show', description: 'Event Booking' },
    ];

    return (
        <div className="div-section show">
            <div className="section-row">
                <h5 className="sub-heading">
                    What Would You Like To Book?
                </h5>
                <div className="col-12">
                    { bookingTypes.map(item => (
                        <button
                            key={item.id}
                            type="button"
                            className={`btn btn-outline-secondary btn-pill ${bookingType === item.type ? 'active' : ''}`}
                            onClick={() => setBookingType(item.type)}>
                            {item.type}
                        </button>
                    ))}
                </div>
                <br/>
                { bookingType && (
                    <table className="table table-borderless" style={{ display: 'inline-block', width: 'auto' }}>
                        <tbody>
                            <tr>
                                <td><label htmlFor="date-from">Date From</label></td>
                                <td><input type="date" className="form-control" value={dateFrom} onChange={e => setDateFrom(e.target.value)} required /> </td>
                                <td><label htmlFor="date-to">Date To</label></td>
                                <td><input type="date" className="form-control" value={dateTo} onChange={e => setDateTo(e.target.value)} required /></td>
                                <td><button className="btn btn-outline-primary btn-square" onClick={capturedates}>Next</button>  </td>
                            </tr>
                        </tbody>
                    </table>)
                }   
            </div>
        </div>
    );
};

export default InquiryBooking;

