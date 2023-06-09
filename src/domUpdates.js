// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getData, getAllData } from '../apiCalls';
import { getCustomerBookings } from './customers';
import flatpickr from 'flatpickr';

const bookingsContainer = document.querySelector('.bookings')

let roomsData;
let customersData;
let bookingsData;
let customerBookings;
let currentCustomerBookings;

// =====================================================================
// ============================  FUNCTIONS  ============================
// =====================================================================

window.addEventListener('load', function() {
  setData();
  getData('bookings').then(result => {
    customerBookings = result.bookings;
    currentCustomerBookings = getCustomerBookings(customerBookings, 9);
    console.log('current customer bookings', currentCustomerBookings)
    showCustomerBookings();
    flatpickr('#date', {
      dateFormat: "Y-m-d",
      minDate: "today",
    });
  });
});

const showCustomerBookings = () => {
  let totalSpent = getTotalSpent();
  bookingsContainer.innerHTML = "";
  currentCustomerBookings.forEach((booking) => {
    bookingsContainer.innerHTML += `
      <div class="single-booking">Date: ${booking.date} <br> Room: ${booking.roomNumber}
      </div>`
  });
  bookingsContainer.innerHTML += `Your total amount spent is: $${totalSpent}`
};

const getTotalSpent = () => {
  let roomsBookedNumbers = [];
  let totalSpent = 0;
  currentCustomerBookings.forEach((booking) => {
    roomsBookedNumbers.push(booking.roomNumber)
  });

  roomsData.forEach((room) => {
    if (roomsBookedNumbers.includes(room.number)) {
      totalSpent += room.costPerNight
    }
  });

  return totalSpent.toFixed(2);
}

const setData = () => {
  getAllData().then(data => {
    roomsData = data[0].rooms;
    customersData = data[1].customers;
    bookingsData = data[2].bookings;
  });
};


export {
  setData,
  showCustomerBookings
};