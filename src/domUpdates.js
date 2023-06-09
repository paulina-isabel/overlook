// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getData, getAllData } from '../apiCalls';
import { getAvailableRooms, getCustomerBookings } from './customers';
import flatpickr from 'flatpickr';

const bookingsContainer = document.querySelector('.bookings');
const availableRoomsContainer = document.querySelector('.available-rooms')

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
    // upon login, capture customer id to pass in as argument in getCustomerBookings below:
    currentCustomerBookings = getCustomerBookings(customerBookings, 9);
    console.log('current customer bookings', currentCustomerBookings)
    showCustomerBookings();
    flatpickr('#date', {
      dateFormat: "Y/m/d",
      // minDate: "today",
      mode: 'single',
      onChange: function(selectedDate, dateString) {
        showAvailableRooms(dateString, bookingsData, roomsData)
        console.log(selectedDate)
        console.log("Selected date:", dateString);
      }
    });
    
    // console.log('bookings', bookingsData)
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

const showAvailableRooms = (dateStr, bookingsData, roomsData) => {
  availableRoomsContainer.innerHTML = ''
  
  let availableRoomsList = getAvailableRooms(dateStr, bookingsData, roomsData);
  availableRoomsList.forEach((booking) => {
    // console.log('booking', booking)
    availableRoomsContainer.innerHTML += `
      <div class="single-available-room">
        Cost Per Night: $${booking.costPerNight}<br>
        Room Type: ${booking.roomType}<br> 
        Beds: ${booking.numBeds}<br>
        Bed Size: ${booking.bedSize}<br>
        Bidet: ${booking.bidet}<br>
        Room Number: ${booking.number}<br>
        <button class="book-room-button">Book This Room</button>
      </div>`
  });
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