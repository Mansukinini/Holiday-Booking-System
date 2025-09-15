using BookingSystem.Models;
using BookingSystem.Repositories;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class PersonBookingController : ControllerBase
{
    private static readonly List<PersonBooking> _personBookings = new List<PersonBooking>();

    // GET: api/PersonBooking
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_personBookings);
    }

    // POST: api/PersonBooking
    [HttpPost]
    public IActionResult Post([FromBody] PersonBooking personBooking)
    {
        if (ModelState.IsValid)
        {
            _personBookings.Add(BookingRepository.GetPersonBooked(personBooking, _personBookings));
            return CreatedAtAction(nameof(Get), new { id = personBooking.Id }, personBooking);
        }
        return BadRequest(ModelState);
    }

    // PUT: api/PersonBooking/{id}
    [HttpPut("{id}")]
    public IActionResult Put(Guid id, [FromBody] PersonBooking updatedPerson)
    {
        var existingPerson = _personBookings.FirstOrDefault(b => b.Id == id);
        if (existingPerson == null)
        {
            return NotFound();
        }
        
        existingPerson.People?.Name = updatedPerson.People?.Name;
        existingPerson.People?.Surname = updatedPerson.People?.Surname;
        existingPerson.People?.ContactNo = updatedPerson.People?.ContactNo;
        existingPerson.People?.Email = updatedPerson.People?.Email;
        existingPerson.Bookings?.Type = updatedPerson.Bookings?.Type;
        existingPerson.Bookings?.DateFrom = (DateTime)updatedPerson.Bookings.DateFrom;
        existingPerson.Bookings?.DateTo = (DateTime)(updatedPerson.Bookings.DateTo);
        existingPerson.DateFrom = updatedPerson.DateFrom;
        existingPerson.DateTo = updatedPerson.DateTo;

        return NoContent();
    }

    // DELETE: api/PersonBooking/{id}
    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var peopleToRemove = _personBookings.FirstOrDefault(b => b.Id == id);
        if (peopleToRemove == null)
        {
            return NotFound();
        }
        _personBookings.Remove(peopleToRemove);
        return NoContent();
    }
}