// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getData, getAllData } from '../apiCalls';
import { getAvailableRooms, getCustomerBookings, filterRoomByType } from './customers';
import flatpickr from 'flatpickr';

const filterButtons = document.querySelector('.filter-buttons')
const bookingsContainer = document.querySelector('.bookings');
const availableRoomsContainer = document.querySelector('.available-rooms');
const dropdownSection = document.querySelector('.dropdown-filter');
const dropDownSect = document.querySelector('.filter-buttons');
const suiteButton = document.querySelector('.suite');
const bookRoomButton = document.querySelectorAll('.book-room-button');

let roomsData;
let customersData;
let bookingsData;
let customerBookings;
let currentCustomerBookings;
let roomTypes;
let availableRoomsList;
let userSelectedDate;

// =====================================================================
// ============================  FUNCTIONS  ============================
// =====================================================================

window.addEventListener('load', function() {
  setData();
  getData('bookings').then(result => {
    customerBookings = result.bookings;
    // upon login, capture customer id to pass in as argument in getCustomerBookings below:
    console.log('bookings data', roomsData)
    currentCustomerBookings = getCustomerBookings(customerBookings, 9);
    // console.log('current customer bookings', currentCustomerBookings)
    showCustomerBookings();
    flatpickr('#date', {
      dateFormat: "Y/m/d",
      // minDate: "today",
      mode: 'single',
      onChange: function(selectedDate, dateString) {
        showAvailableRooms(dateString, bookingsData, roomsData)
        userSelectedDate = dateString
        // console.log(selectedDate)
        // console.log("Selected date:", dateString);
      }
    });
  });
});



const showCustomerBookings = () => {
  // console.log('rooms data', roomsData)
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

const showAvailableRooms = (dateString, bookingsData, roomsData) => {
  availableRoomsContainer.innerHTML = ''

  availableRoomsList = getAvailableRooms(dateString, bookingsData, roomsData);
  availableRoomsList.forEach((booking) => {
    availableRoomsContainer.innerHTML += `
      <div class="single-available-room">
        Cost Per Night: $${booking.costPerNight}<br>
        Room Type: ${booking.roomType}<br> 
        Beds: ${booking.numBeds}<br>
        Bed Size: ${booking.bedSize}<br>
        Bidet: ${booking.bidet}<br>
        Room Number: ${booking.number}<br>
        <button class="book-room-button" id="${booking.number}">Book This Room</button>
      </div>`
  });
  // console.log('avail roomz', availableRoomsList)
  
  // the code below is unhiding the filter button
  dropdownSection.classList.remove('hidden');
  populateFilterButton(roomsData, dropDownSect);
}

const populateFilterButton = (roomsData, dropDownSect) => {
  dropDownSect.innerHTML = '';
  roomTypes = []
  roomsData.forEach((room) => {
    if (!roomTypes.includes(room.roomType)) {
      roomTypes.push(room.roomType)
    }
  })
  // console.log('room typez', roomTypes)
  roomTypes.forEach(type => {
    dropDownSect.innerHTML += `<button class="${type}" aria-label="filter for ${type}">${type}</button><br>`;
  });
};

const setData = () => {
  getAllData().then(data => {
    roomsData = data[0].rooms;
    customersData = data[1].customers;
    bookingsData = data[2].bookings;
  });
};

export {
  setData,
  showCustomerBookings,
  filterButtons,
  roomsData,
  availableRoomsList,
  showAvailableRooms,
  suiteButton,
  userSelectedDate,
  bookingsData,
  bookRoomButton,
  availableRoomsContainer
};