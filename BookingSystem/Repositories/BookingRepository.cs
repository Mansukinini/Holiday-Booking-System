using BookingSystem.Models;
using System.Text.RegularExpressions;

namespace BookingSystem.Repositories
{
    public class BookingRepository
    {
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
    }
}
