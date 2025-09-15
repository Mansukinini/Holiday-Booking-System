using Microsoft.AspNetCore.Mvc;
using BookingSystem.Models;
using BookingSystem.Repositories;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private static List<Booking> _bookings = new List<Booking>();

    // GET: api/bookings
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_bookings);
    }

    // GET: api/bookings
    [HttpGet("bookingType")]
    public IActionResult GetBookingType()
    {
        return Ok(BookingType.bookingTypesList);
    }

    // POST: api/bookings
    [HttpPost]
    public IActionResult Post([FromBody] Booking booking)
    {
        if (ModelState.IsValid)
        {
            _bookings.Add(BookingRepository.GetBooking(_bookings, booking));
            return CreatedAtAction(nameof(Get), new { id = booking.Id }, booking);
        }

        return BadRequest(ModelState);
    }

    // PUT: api/bookings/{id}
    [HttpPut("{id}")]
    public IActionResult Put(Guid id, [FromBody] Booking updatedBooking)
    {
        var existingBooking = _bookings.FirstOrDefault(b => b.Id == id);
        if (existingBooking == null)
        {
            return NotFound();
        }

        existingBooking.Type = updatedBooking.Type;
        existingBooking.RefNo = updatedBooking.RefNo;
        existingBooking.DateFrom = updatedBooking.DateFrom;
        existingBooking.DateTo = updatedBooking.DateTo;
        existingBooking.People = updatedBooking.People;
        existingBooking.CreatedOn = updatedBooking.CreatedOn;

        return NoContent();
    }

    // DELETE: api/bookings/{id}
    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var bookingToRemove = _bookings.FirstOrDefault(b => b.Id == id);
        if (bookingToRemove == null)
        {
            return NotFound();
        }
        _bookings.Remove(bookingToRemove);
        return NoContent();
    }
}