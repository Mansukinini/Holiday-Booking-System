using Microsoft.AspNetCore.Mvc;
using BookingSystem.Models;

[ApiController]
[Route("api/[controller]")]
public class PeopleController : ControllerBase
{
    private static List<Person> _peoples = new List<Person>();

    // GET: api/People
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_peoples);
    }

    // POST: api/People
    [HttpPost]
    public IActionResult Post([FromBody] Person person)
    {
        if (ModelState.IsValid)
        {
            person.Id = Guid.NewGuid();
            _peoples.Add(person);
            return CreatedAtAction(nameof(Get), new { id = person.Id }, person);
        }
        return BadRequest(ModelState);
    }

    // PUT: api/People/{id}
    [HttpPut("{id}")]
    public IActionResult Put(Guid id, [FromBody] Person updatedPerson)
    {
        var existingPerson = _peoples.FirstOrDefault(b => b.Id == id);
        if (existingPerson == null)
        {
            return NotFound();
        }

        existingPerson.Name = updatedPerson.Name;
        existingPerson.Surname = updatedPerson.Surname;
        existingPerson.ContactNo = updatedPerson.ContactNo;
        existingPerson.Email = updatedPerson.Email;

        return NoContent();
    }

    // DELETE: api/People/{id}
    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var peopleToRemove = _peoples.FirstOrDefault(b => b.Id == id);
        if (peopleToRemove == null)
        {
            return NotFound();
        }
        _peoples.Remove(peopleToRemove);
        return NoContent();
    }
}