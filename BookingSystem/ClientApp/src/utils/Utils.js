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
    },
    // generateToken(length) {
    //     let result = '';
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     const charactersLength = characters.length;
    //     for (let i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    // },
    // isMobile: function () {
    //     return window.matchMedia("only screen and (max-width: 760px)").matches;
    // },
    // areEqual: function (obj1, obj2) {
    //     return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
    // },
    // capitalize: function (obj1) {
    //     return obj1.charAt(0).toUpperCase() + obj1.substr(1);
    // },
    // upperCase: function (obj1) {
    //     return obj1.toUpperCase();
    // },
    // lowerFirstChar: function (obj1) {
    //     return obj1.charAt(0).toLowerCase() + obj1.substr(1);
    // },
    // compareGuid(guid1, guid2) {
    //     if (guid1 && guid2) {
    //         return guid1.replace(/[{}]/g, "").toLowerCase() === guid2.replace(/[{}]/g, "").toLowerCase();
    //     }
    //     return false;
    // },
    // escapeRegExp(text) {
    //     return text.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&');
    // },
    // getURLForWorkflowId(workflowConfig, workflowId) {
    //     let url = '';

    //     for (var key in workflowConfig) {
    //         if (workflowConfig.hasOwnProperty(key)) {
    //             if (workflowConfig[key].id)
    //                 if (Utils.compareGuid(workflowConfig[key].id, workflowId))
    //                     url = workflowConfig[key].url;
    //         }
    //     }

    //     return url;
    // },
    // getViewModelForWorkflowId(workflowConfig, workflowId) {
    //     let viewModel = '';

    //     for (var key in workflowConfig) {
    //         if (workflowConfig.hasOwnProperty(key)) {
    //             if (workflowConfig[key].id)
    //                 if (Utils.compareGuid(workflowConfig[key].id, workflowId))
    //                     viewModel = workflowConfig[key].viewModel;
    //         }
    //     }

    //     return viewModel;
    // },
    // compareMaxValidityPeriods(value1, value2) {
    //     //Check if the second value is bigger than the first value
    //     if (value1 == null && value2 != null) {
    //         return true;
    //     }
    //     else if ((value1 == null && value2 == null) || (value1 != null && value2 == null)) {
    //         return false;
    //     }

    //     let numbers1 = value1.match(/\d+/g).map(Number)[0];
    //     let numbers2 = value2.match(/\d+/g).map(Number)[0];

    //     if (value1.toLowerCase().indexOf('day') > -1 && value2.toLowerCase().indexOf('day') > -1) {
    //         return numbers2 > numbers1;
    //     }
    //     else if (value1.toLowerCase().indexOf('year') > -1 && value2.toLowerCase().indexOf('year') > -1) {
    //         return numbers2 > numbers1;
    //     }
    //     else if (value1.toLowerCase().indexOf('day') > -1 && value2.toLowerCase().indexOf('year') > -1) {
    //         return true;
    //     }
    //     else if (value1.toLowerCase().indexOf('year') > -1 && value2.toLowerCase().indexOf('day') > -1) {
    //         return false;
    //     }

    //     return false;
    // },
    // reviveResponse(response) {
    //     let result = null;

    //     let parsed = JSON.parse(response);

    //     let revive = function me(obj) {
    //         let newObj = {};

    //         for (var key in obj) {
    //             if (key) {
    //                 if (obj.hasOwnProperty(key)) {
    //                     let newKey = key.charAt(0).toLowerCase() + key.slice(1);

    //                     if (Array.isArray(obj[key])) {
    //                         newObj[newKey] = [];

    //                         for (var i = 0; i < obj[key].length; i++) {
    //                             if (obj[key][i] !== null && typeof obj[key][i] === 'object') {
    //                                 newObj[newKey].push(me(obj[key][i]));
    //                             } else {
    //                                 newObj[newKey].push(obj[key][i]);
    //                             }
    //                         }
    //                     } else if (obj[key] !== null && typeof obj[key] === 'object') {
    //                         newObj[newKey] = me(obj[key]);
    //                     } else {
    //                         newObj[newKey] = obj[key];
    //                     }
    //                 }
    //             }
    //         }

    //         return newObj;
    //     };

    //     if (Array.isArray(parsed)) {
    //         result = [];
    //         for (var i = 0; i < parsed.length; i++) {
    //             if (parsed[i] !== null && typeof parsed[i] === 'object') {
    //                 result.push(revive(parsed[i]));
    //             } else {
    //                 result.push(parsed[i]);
    //             }
    //         }
    //     } else {
    //         result = revive(parsed);
    //     }

    //     return result;
    // }
}

export default Utils;