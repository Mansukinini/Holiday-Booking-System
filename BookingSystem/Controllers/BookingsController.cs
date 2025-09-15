using Microsoft.AspNetCore.Mvc;
using BookingSystem.Models;
using System.Collections.Generic;
using System.Linq;
using BookingSystem.Repositories;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private static PersonBooking personBooking = new PersonBooking();
    private static readonly List<PersonBooking> _personBookings = new List<PersonBooking>();
    private static List<Booking> _bookings = new List<Booking>();

    // GET: api/bookings
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_bookings);
    }
        
    // POST: api/bookings
    [HttpPost]
    public IActionResult Post([FromBody] Booking booking)
    {
        if (ModelState.IsValid)
        {
            booking.Id = Guid.NewGuid();
            booking.CreatedOn = DateTime.Now;
            personBooking.Id = Guid.NewGuid();
            personBooking.RefNo = BookingRepository.GenerateRefNo(_personBookings);
            personBooking.DateFrom = booking.DateFrom;
            personBooking.DateTo = booking.DateTo;
            personBooking.Bookings = booking;

            _bookings.Add(booking);
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
        existingBooking.DateFrom = updatedBooking.DateFrom;
        existingBooking.DateTo = updatedBooking.DateTo;

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