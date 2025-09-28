/**
 * Utility functions for the Holiday Booking System
 * @namespace Utils
 */
const Utils = {
    emptyGuid: '00000000-0000-0000-0000-000000000000',
    
    // Date formatting and validation
    formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('en-GB');
    },

    isValidDateRange: function(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return start <= end;
    },

    calculateDays: function(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

    // Form validation
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    validatePhone: function(phone) {
        const re = /^[0-9]{10}$/;  // Basic 10-digit validation
        return re.test(phone.replace(/[^0-9]/g, ''));
    },

    validateRequired: function(value) {
        return value !== null && value !== undefined && value.toString().trim() !== '';
    },

    // Booking specific utilities
    isBookingOverlap: function(existing, newBooking) {
        const newStart = new Date(newBooking.dateFrom);
        const newEnd = new Date(newBooking.dateTo);
        const existingStart = new Date(existing.dateFrom);
        const existingEnd = new Date(existing.dateTo);
        
        return newStart <= existingEnd && existingStart <= newEnd;
    },
    generateGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & (0x3 | 0x8));
            return v.toString(16);
        });
    }
}

export default Utils;