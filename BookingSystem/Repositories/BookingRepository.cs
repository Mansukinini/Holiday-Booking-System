using BookingSystem.Models;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace BookingSystem.Repositories
{
    public class BookingRepository
    {
        public static PersonBooking GetPersonBooked(PersonBooking personBooking, List<PersonBooking> personbookingList)
        {
            personBooking.People = new Person
            {
                Id = Guid.NewGuid(),
                Name = personBooking.People?.Name,
                Surname = personBooking.People?.Surname,
                Email = personBooking.People?.Email,
                ContactNo = personBooking.People?.ContactNo,
            };

            personBooking.Bookings = new Booking
            {
                Id = Guid.NewGuid(),
                Type = personBooking.Bookings?.Type,
                DateFrom = personBooking.DateFrom,
                DateTo = personBooking.DateTo
            };

            personBooking.Id = Guid.NewGuid();
            personBooking.RefNo = BookingRepository.GenerateRefNo(personbookingList);
            personBooking.PersonId = personBooking.People.Id;
            personBooking.BookingId = personBooking.Bookings.Id;
            personBooking.DateFrom = personBooking.Bookings.DateFrom;
            personBooking.DateTo = personBooking.Bookings.DateTo;

            return personBooking;
        } 

        public static string GenerateRefNo(List<PersonBooking> PersonBooking) {
            string newRefNo = string.Empty;
            string yearMonth = DateTime.Now.ToString("yyyy-MM");
            int numPadding = 4;

            var refNo = PersonBooking.Select(x => x.RefNo).OrderByDescending(x => x).FirstOrDefault();

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
    }
}
