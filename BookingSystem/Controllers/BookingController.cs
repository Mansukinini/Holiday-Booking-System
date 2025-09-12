using BookingSystem.Models;
using BookingSystem.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BookingSystem.Controllers
{
    public class BookingController : Controller
    {
        private static readonly List<Booking> _bookings = new List<Booking>();
        private static int _nextBookingId = 1;

        // GET: /Bookings
        public IActionResult Index()
        {
            return View(_bookings);
        }

        // POST: /Bookings/Create
        [HttpPost]
        public IActionResult Create(Booking booking)
        {
            if (ModelState.IsValid)
            {
                booking.Id = _nextBookingId++;
                booking.RefNo = BookingRepository.GenerateRefNo(_bookings);
                booking.NumberOfDays = booking.ToDate.Subtract(booking.FromDate).Days; 
                booking.CreatedOn = DateTime.Now; 
                _bookings.Add(booking);
            }

            return RedirectToAction("Index");
        }

        // POST: /Bookings/Edit
        [HttpPost]
        public IActionResult Edit(int id, Booking updatedBooking)
        {
            var existingBooking = _bookings.FirstOrDefault(b => b.Id == id);
            if (existingBooking != null && ModelState.IsValid)
            {
                existingBooking.Name = updatedBooking.Name;
                existingBooking.Surname = updatedBooking.Surname;
                existingBooking.Email = updatedBooking.Email;
                existingBooking.ContactNo = updatedBooking.ContactNo;
                existingBooking.Item = updatedBooking.Item;
                existingBooking.Description = updatedBooking.Description;
                existingBooking.FromDate = updatedBooking.FromDate;
                existingBooking.ToDate = updatedBooking.ToDate;
                existingBooking.NumberOfDays = updatedBooking.NumberOfDays;
                existingBooking.CreatedOn = updatedBooking.CreatedOn;
            }

            return RedirectToAction("Index");
        }

        // POST: /Bookings/Delete
        [HttpPost]
        public IActionResult Delete(int id)
        {
            var bookingToRemove = _bookings.FirstOrDefault(b => b.Id == id);
            if (bookingToRemove != null)
            {
                _bookings.Remove(bookingToRemove);
            }

            return RedirectToAction("Index");
        }
    }
}