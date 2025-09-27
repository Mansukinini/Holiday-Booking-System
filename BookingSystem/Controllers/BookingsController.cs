using Microsoft.AspNetCore.Mvc;
using BookingSystem.Models;
using BookingSystem.Data.Repositories;
using BookingSystem.Data.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private static List<Booking> _bookings = new List<Booking>();/*
    private readonly IBookingRepository _bookingRepository;

    public BookingsController(IBookingRepository bookingRepository)
    {
        _bookingRepository = bookingRepository;
    }*/

    // GET: api/bookings
    [HttpGet]
    public IActionResult Get()
    {
        /*
        var bookings = _bookingRepository.GetAllBookings();
        return StatusCode(200, bookings);*/
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
            _bookings.Add(BookingRepository.PostBooking(_bookings, booking));
            return CreatedAtAction(nameof(Get), new { id = booking.Id }, booking);
        }

        return BadRequest(ModelState);
    }
    
    // PUT: api/bookings/{id}
    [HttpPut("{id}")]
    public IActionResult Put(Guid id, [FromBody] Booking updatedBooking)
    {
        var result = BookingRepository.PutBooking(_bookings, id, updatedBooking);        
        if (result == null)
        {
            return NotFound();
        }        

        return StatusCode(200, result);
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
        var result = _bookings.Remove(bookingToRemove);
        return StatusCode(200, result);
    }
}