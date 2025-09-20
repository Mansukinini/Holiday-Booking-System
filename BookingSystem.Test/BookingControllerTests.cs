using AutoFixture;
using BookingSystem.Data.Interfaces;
using BookingSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace BookingSystem.Test
{
    [TestClass]
    public class BookingControllerTests
    {
        private Mock<IBookingRepository> _bookingRepository;
        private Fixture _fixture;
        private BookingsController _controller;

        public BookingControllerTests()
        {
            _bookingRepository = new Mock<IBookingRepository>();
            _fixture = new Fixture();
            _controller = new BookingsController(_bookingRepository.Object); // Initialize _controller here to ensure it is not null
        }

        [TestMethod]
        public void GetAllBookings_ReturnsAllBookings()
        {
            // Arrange
            var bookings = _fixture.CreateMany<Booking>(5).ToList();
            _bookingRepository.Setup(repo => repo.GetAllBookings()).Returns(bookings);

            // Act
            var result = _controller.Get();
            var okResult = result as ObjectResult;

            // Assert
            Assert.IsNotNull(okResult, "Expected ObjectResult but got null.");
            Assert.AreEqual(200, okResult.StatusCode);
            CollectionAssert.AreEqual(bookings, okResult.Value as List<Booking>);
        }

        [TestMethod]
        public void GetBookingType_ReturnsBookingTypes()
        {
            // Act
            var result = _controller.GetBookingType();
            var okResult = result as OkObjectResult;
            // Assert
            Assert.IsNotNull(okResult, "Expected OkObjectResult but got null.");
            Assert.AreEqual(200, okResult.StatusCode);
            CollectionAssert.AreEqual(BookingType.bookingTypesList, okResult.Value as List<string>);
        }

        [TestMethod]
        public void PostBooking_ValidBooking_ReturnsCreatedBooking()
        {
            // Arrange
            var booking = _fixture.Create<Booking>();
            // Act
            var result = _controller.Post(booking);
            var createdAtActionResult = result as CreatedAtActionResult;
            // Assert
            Assert.IsNotNull(createdAtActionResult, "Expected CreatedAtActionResult but got null.");
            Assert.AreEqual(201, createdAtActionResult.StatusCode);
            Assert.AreEqual(booking, createdAtActionResult.Value);
        }
        /*
        [TestMethod]
        public void PutBooking_ExistingId_ReturnsUpdatedBooking()
        {
            // Arrange
            var updatedBooking = _fixture.Create<Booking>();
            var bookingId = updatedBooking.Id;
            _bookingRepository.Setup(repo => repo.PutBooking(It.IsAny<List<Booking>>(), bookingId, updatedBooking)).Returns(updatedBooking);
            // Act
            var result = _controller.Put(bookingId, updatedBooking);
            var okResult = result as ObjectResult;

            // Assert
            Assert.IsNotNull(okResult, "Expected ObjectResult but got null.");
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(updatedBooking, okResult.Value);
        }

        [TestMethod]
        public void PutBooking_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            var updatedBooking = _fixture.Create<Booking>();
            _bookingRepository.Setup(repo => repo.PutBooking(It.IsAny<List<Booking>>(), bookingId, updatedBooking)).Returns((Booking)null!);
            // Act
            var result = _controller.Put(bookingId, updatedBooking);
            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void DeleteBooking_ExistingId_ReturnsOk()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            _bookingRepository.Setup(repo => repo.DeleteBooking(It.IsAny<List<Booking>>(), bookingId)).Returns(true);
            // Act
            var result = _controller.Delete(bookingId);
            var okResult = result as OkResult;
            // Assert
            Assert.IsNotNull(okResult, "Expected OkResult but got null.");
            Assert.AreEqual(200, okResult.StatusCode);
        }


        [TestMethod]
        public void DeleteBooking_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            var bookingId = Guid.NewGuid();
            _bookingRepository.Setup(repo => repo.DeleteBooking(It.IsAny<List<Booking>>(), bookingId)).Returns(false);
            // Act
            var result = _controller.Delete(bookingId);
            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }  */      
    }
}
