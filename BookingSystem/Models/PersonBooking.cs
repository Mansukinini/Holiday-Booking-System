namespace BookingSystem.Models
{
    public class PersonBooking
    {        
        public Guid Id { get; set; }
        public Guid PersonId { get; set; }
        public Guid BookingId { get; set; }
        public string? RefNo { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public int NumberOfDays => (int)(DateTo - DateFrom).TotalDays;
        public Person? People { get; set; }
        public Booking? Bookings { get; set; }
    }
}
