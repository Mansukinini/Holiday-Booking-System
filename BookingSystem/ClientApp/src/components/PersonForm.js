import React, { useState } from 'react';
import axios from 'axios';

const PersonForm = ({ bookingDetails, onBookingAdded }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            type: bookingDetails.type,
            refNo: null,
            dateFrom: new Date(bookingDetails.dateFrom).toISOString(),
            dateTo: new Date(bookingDetails.dateTo).toISOString(),
            people: { name, surname, contactNo, email },
            createdOn: new Date().toISOString()
        };
        
        try {
            const response = await axios.post('/api/Bookings', data);
            onBookingAdded(response.data);
            setName('');
            setSurname('');
            setContactNo('');
            setEmail('');
        } catch (error) {
            console.error('Error adding booking:', error);
        }
    };

    return (
        <div className="section-row">
            <h5 className="sub-heading">Please fill with your detail</h5>
            <form onSubmit={handleSubmit}>
                <table className="table table-borderless" style={{ display: 'inline-block', width: 'auto' }}>
                    <tbody>
                        <tr>
                            <td><label>Name:</label></td>
                            <td><input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required /></td>
                            <td><label>Surname:</label></td>
                            <td><input type="text" className="form-control" value={surname} onChange={e => setSurname(e.target.value)} required /></td>
                            <td><label>Contact No:</label></td>
                            <td><input type="text" className="form-control" value={contactNo} onChange={e => setContactNo(e.target.value)} required /></td>
                            <td><label>Email:</label></td>
                            <td><input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required /></td>
                            <td><button type="submit" className="btn btn-outline-primary btn-square">Add </button>  </td>
                        </tr>
                    </tbody>
                </table> 
            </form>
        </div>
    );
};

export default PersonForm;