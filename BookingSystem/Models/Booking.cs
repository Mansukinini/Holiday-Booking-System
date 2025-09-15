using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BookingSystem.Models
{
    public class Booking
    {
        public Guid Id { get; set; }
        public string? Type { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
