using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BookingSystem.Models
{
    public class Booking
    {
        // Person detail
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? ContactNo { get; set; }
        public string? Email { get; set; }

        // item Book
        public string? RefNo { get; set; }
        public string? Item { get; set; }
        public string? Description { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int NumberOfDays { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
