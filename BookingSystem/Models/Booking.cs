using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BookingSystem.Models
{
    public class Booking
    {
        public Guid Id { get; set; }
        public Guid PersonId { get; set; }
        public string? Type { get; set; }
        public string? RefNo { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public int NumberOfDays => (int)(DateTo - DateFrom).TotalDays;
        public Person People { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
    }

    public static class BookingType
    {
        public const string Apartment = "Apartment";
        public const string Vehicle = "Vehicle";
        public const string Show = "Show";
        public const string Other = "Other";

        public static List<string> bookingTypesList = new List<string>() {
            Apartment,
            Vehicle,
            Show,
            Other,
        };
    }
}
