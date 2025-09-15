namespace BookingSystem.Models
{
    public class Person
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? ContactNo { get; set; }
        public string? Email { get; set; }
    }
}
