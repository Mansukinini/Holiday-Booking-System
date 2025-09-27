using BookingSystem.Data.Interfaces;
using BookingSystem.Models;
using System.Text.RegularExpressions;

namespace BookingSystem.Data.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private static List<Booking> _bookings = new List<Booking>();

        public BookingRepository(List<Booking> bookings)
        {
            _bookings = bookings;
        }

        public List<Booking> GetAllBookings()
        {
            return _bookings;
        }

        public static Booking PostBooking(List<Booking> bookingList, Booking booking)
        {
            booking.Person = new Person
            {
                Id = Guid.NewGuid(),
                Name = booking.Person.Name,
                Surname = booking.Person.Surname,
                Email = booking.Person.Email,
                ContactNo = booking.Person.ContactNo,
            };

            booking.Id = Guid.NewGuid();
            booking.PersonId = booking.Person.Id;
            booking.RefNo = GenerateRefNo(bookingList);
            booking.CreatedOn = DateTime.Now;

            return booking;
        }
        
        public static Booking PutBooking(List<Booking> bookingList, Guid id, Booking updatedBooking)
        {
            var existingBooking = bookingList.FirstOrDefault(b => b.Id == id);
            if (existingBooking == null)
            {
                return null!;
            }

            existingBooking.Type = updatedBooking.Type;
            existingBooking.RefNo = updatedBooking.RefNo;
            existingBooking.DateFrom = updatedBooking.DateFrom;
            existingBooking.DateTo = updatedBooking.DateTo;
            existingBooking.Person = updatedBooking.Person;
            existingBooking.CreatedOn = updatedBooking.CreatedOn;

            return existingBooking;
        }

        public static string GenerateRefNo(List<Booking> booking) {
            string newRefNo = string.Empty;
            string yearMonth = DateTime.Now.ToString("yyyy-MM");
            int numPadding = 4;

            var refNo = booking.Select(x => x.RefNo).OrderByDescending(x => x).FirstOrDefault();

            var latestRefNo = refNo ?? yearMonth;

            //Build the new Ref No.
            newRefNo = GenerateIncrementalYearMonthRefNo(yearMonth, latestRefNo, numPadding);

            return newRefNo;
        }

        public static string GenerateIncrementalYearMonthRefNo(string prefix, string refNo, int paddedLength)
        {
            int number = StripNumbersFromString(refNo.Replace(prefix, ""));

            return prefix + "-" + (++number).ToString("D" + paddedLength);
        }

        public static int StripNumbersFromString(string value)
        {
            var numbers = Regex.Replace(value, "[^0-9]", "");

            if (int.TryParse(numbers, out int newNumber))
            {
                return newNumber;
            }
            else
            {
                return 0;
            }
        }

        List<Booking> IBookingRepository.GetAllBookings()
        {
            throw new NotImplementedException();
        }

        Booking IBookingRepository.PostBooking(List<Booking> bookings, Booking booking)
        {
            throw new NotImplementedException();
        }

        Booking IBookingRepository.PutBooking(List<Booking> bookings, Guid id, Booking updatedBooking)
        {
            throw new NotImplementedException();
        }

        bool IBookingRepository.DeleteBooking(List<Booking> bookings, Guid id)
        {
            var bookingToRemove = _bookings.FirstOrDefault(b => b.Id == id);
            if (bookingToRemove == null)
            {
                return false;
            }
            var result = _bookings.Remove(bookingToRemove);
            return result;
        }
    }
}
