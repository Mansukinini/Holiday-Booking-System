import React, { useState } from 'react';

const BookingForm = ({ bookingType, onBookingAdded }) => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const capturedates = (e) => {
        e.preventDefault();
        const newBooking = { type: bookingType, dateFrom, dateTo };
        
        onBookingAdded(newBooking);
        setDateFrom('');
        setDateTo('');
    };

    return (
        <div className="div-section show">
            <div className="section-row">
                <div className="row">
                    <h5 className="sub-heading">Please select dates</h5>
                </div>
                <table className="table table-borderless" style={{ display: 'inline-block', width: 'auto' }}>
                    <tbody>
                        <tr>
                            <td><label htmlFor="date-from">Date From</label></td>
                            <td><input type="date" class="form-control" value={dateFrom} onChange={e => setDateFrom(e.target.value)} required /> </td>
                            <td><label htmlFor="date-to">Date To</label></td>
                            <td><input type="date" class="form-control" value={dateTo} onChange={e => setDateTo(e.target.value)} required /></td>
                            <td><button className="btn btn-outline-primary btn-square" onClick={capturedates}>Next</button>  </td>
                        </tr>
                    </tbody>
                </table>           
            </div>
        </div>             
    );
};

export default BookingForm;