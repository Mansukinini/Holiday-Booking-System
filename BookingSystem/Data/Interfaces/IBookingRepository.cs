using BookingSystem.Models;

namespace BookingSystem.Data.Interfaces
{
    public interface IBookingRepository
    {
        List<Booking> GetAllBookings();
        Booking PostBooking(List<Booking> bookings, Booking booking);
        Booking PutBooking(List<Booking> bookings, Guid id, Booking updatedBooking);
        bool DeleteBooking(List<Booking> bookings, Guid id);
    }
}
