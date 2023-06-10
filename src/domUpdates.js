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
const dropDownSect = document.querySelector('.filter-dropdown-categories');


let roomsData;
let customersData;
let bookingsData;
let customerBookings;
let currentCustomerBookings;
let roomTypes;

// =====================================================================
// ============================  FUNCTIONS  ============================
// =====================================================================



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
  console.log(availableRoomsList)
  
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
    dropDownSect.innerHTML += `<button class="filter-buttons" aria-label="filter for ${type}">${type}</button><br>`;
  });
};



export {
  // setData,
  showCustomerBookings,
  filterButtons
};