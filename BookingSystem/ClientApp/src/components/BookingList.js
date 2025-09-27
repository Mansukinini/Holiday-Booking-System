import React, { useState } from 'react';
import axios from 'axios';

const BookingList = ({ bookings, onBookingDeleted }) => {
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/Bookings/${id}`);
            onBookingDeleted();
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    const handleEditClick = (booking) => {
        setEditId(booking.id);
        setEditData({
            refNo: booking.refNo,
            name: booking.person.name,
            surname: booking.person.surname,
            email: booking.person.email,
            contactNo: booking.person.contactNo,
            type: booking.type,
            dateFrom: booking.dateFrom.slice(0, 10),
            dateTo: booking.dateTo.slice(0, 10)
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSave = async (id) => {
        const updatedBooking = {
            id,
            refNo: editData.refNo,
            type: editData.type,
            dateFrom: new Date(editData.dateFrom).toISOString(),
            dateTo: new Date(editData.dateTo).toISOString(),
            person: {
                name: editData.name,
                surname: editData.surname,
                email: editData.email,
                contactNo: editData.contactNo
            }
        };
        try {
            await axios.put(`/api/Bookings/${id}`, updatedBooking);
            setEditId(null);
            setEditData({});
            onBookingDeleted();
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    const handleEditCancel = () => {
        setEditId(null);
        setEditData({});
    };

    return (
        <div className="row">
            <h3 className="heading">Existing Bookings</h3>
            <table className='table table-striped table-hover align-items-start'>
                <thead >
                    <tr>
                        <th>Reference No</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Contact No</th>
                        <th>Book Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Days</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            {editId === booking.id ? (
                                <>
                                    <td>
                                        <input className="form-control"
                                            name="refNo"
                                            value={editData.refNo}
                                            onChange={handleEditChange}
                                            readOnly
                                        />
                                    </td>
                                    <td>
                                        <input className="form-control"
                                            name="name"
                                            value={editData.name}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input className="form-control"
                                            name="surname"
                                            value={editData.surname}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input className="form-control"
                                            name="email"
                                            value={editData.email}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input className="form-control"
                                            name="contactNo"
                                            value={editData.contactNo}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input className="form-control"
                                            name="type"
                                            value={editData.type}
                                            onChange={handleEditChange}
                                            readOnly
                                        />
                                    </td>
                                    <td>
                                        <input className="form-control"
                                            type="date"
                                            name="dateFrom"
                                            value={editData.dateFrom}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input className="form-control"
                                            type="date"
                                            name="dateTo"
                                            value={editData.dateTo}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>{booking.numberOfDays}</td>
                                    <td>                                        
                                        <span onClick={() => handleEditSave(booking.id)} style={{cursor:"pointer", marginRight:"10px"}}>
                                            <i className="bi bi-check-circle" title="Save"></i>
                                        </span>
                                        <span onClick={handleEditCancel} style={{cursor:"pointer"}}>
                                            <i className="bi bi-x-circle" title="Cancel"></i>
                                        </span>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{booking.refNo}</td>
                                    <td>{booking.person.name}</td>
                                    <td>{booking.person.surname}</td>
                                    <td>{booking.person.email}</td>
                                    <td>{booking.person.contactNo}</td>
                                    <td>{booking.type}</td>
                                    <td>{new Date(booking.dateFrom).toLocaleDateString()}</td>
                                    <td>{new Date(booking.dateTo).toLocaleDateString()}</td>
                                    <td>{booking.numberOfDays}</td>
                                    <td>
                                        <span onClick={() => handleEditClick(booking)} style={{cursor:"pointer" , marginRight:"10px"}}>
                                            <i className="fas fa-edit" title="Edit"></i>
                                        </span>
                                        <span onClick={() => handleDelete(booking.id)} style={{cursor:"pointer"}}>
                                            <i className="fas fa-trash-alt" title="Delete"></i>
                                        </span>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingList;