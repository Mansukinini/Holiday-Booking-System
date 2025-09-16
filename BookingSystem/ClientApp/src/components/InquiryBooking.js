import React, { useState } from 'react';

const InquiryBooking = ({bookingTypes, onBookingAdded }) => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');    
    const [bookingType, setBookingType] = useState(null);
    
    const capturedates = (e) => {
        e.preventDefault();
        const newBooking = { type: bookingType, dateFrom, dateTo };
        if (!bookingType) {
            alert("Please select a booking type.");
            return;
        }
        if (!dateFrom || !dateTo) {
            alert("Please select both dates.");
            return;
        }
        if (new Date(dateTo) < new Date(dateFrom)) {
            alert("End date cannot be before start date.");
            return;
        }
        onBookingAdded(newBooking);
    };

    return (
        <div className="div-section show">
            <div className="section-row">
                <h5 className="sub-heading">
                    What Would You Like To Book?
                </h5>
                <div className="col-12">
                    { bookingTypes.map(item => (
                        <button
                            key={item}
                            type="button"
                            className={`btn btn-outline-secondary btn-pill ${bookingType === item ? 'active' : ''}`}
                            onClick={() => setBookingType(item)}>
                            {item}
                        </button>
                    ))}
                </div>
                <br/>
                { bookingType && (
                    <table className="table table-borderless" style={{ display: 'inline-block', width: 'auto' }}>
                        <tbody>
                            <tr>
                                <td><label htmlFor="dateFrom">Date From</label></td>
                                <td><input type="date" htmlFor="dateFrom" className="form-control" value={dateFrom} onChange={e => setDateFrom(e.target.value)} required /> </td>
                                <td><label htmlFor="dateTo">Date To</label></td>
                                <td><input type="date" htmlFor="dateTo" className="form-control" value={dateTo} onChange={e => setDateTo(e.target.value)} required /></td>
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

