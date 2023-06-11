// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getData, getAllData } from '../apiCalls';
import { getAvailableRooms, getCustomerBookings, filterRoomByType } from './customers';
import flatpickr from 'flatpickr';

const filterButtons = document.querySelector('.filter-buttons')
const bookingsContainer = document.querySelector('.bookings');
const totalSpentContainer = document.querySelector('.total-spent')
const availableRoomsContainer = document.querySelector('.available-rooms');
const dropdownSection = document.querySelector('.dropdown-filter');
const dropDownSect = document.querySelector('.filter-buttons');
const suiteButton = document.querySelector('.suite');
const bookRoomButton = document.querySelectorAll('.book-room-button');
const welcomeMessage = document.querySelector('.user-welcome-message');

let roomsData;
let customersData;
let bookingsData;

let currentCustomerBookings;
let roomTypes;
let availableRoomsList;
let userSelectedDate;
let currentCustomer;
let totalSpent;

// =====================================================================
// ============================  FUNCTIONS  ============================
// =====================================================================

window.addEventListener('load', function() {
  setData();
  getData('bookings').then(result => {
    // console.log('bookings data', roomsData)
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

const getRandomUser = () => {
  let randomUserIndex = Math.floor(Math.random() * customersData.length)
  // console.log('random user index', randomUserIndex)
  currentCustomer = customersData[1]
  console.log('current cust', currentCustomer.id)
}

const showWelcomeMessage = () => {
  // console.log('customer data', customersData)
  getRandomUser()
  welcomeMessage.innerText = `Welcome, ${currentCustomer.name}`
}

const showCustomerBookings = () => {
  console.log('hi')

  showWelcomeMessage()
  bookingsContainer.innerHTML = "";
   // upon login, capture customer id to pass in as argument in getCustomerBookings below:
  currentCustomerBookings = getCustomerBookings(bookingsData, currentCustomer.id);
  // console.log('rooms data', roomsData)
  
  currentCustomerBookings.forEach((booking) => {
    bookingsContainer.innerHTML += `
      <div class="single-booking">Date: ${booking.date} <br> Room: ${booking.roomNumber}
      </div>`
  });
  let totalSpent2 = getTotalSpent();
  totalSpentContainer.innerHTML = `Your total amount spent is: $${totalSpent2}`
  // console.log('curr cust bookings inshowCustomerBookings()', currentCustomerBookings)
};

const getTotalSpent = () => {
  let roomsBookedNumbers = [];
  totalSpent = 0;
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
  showAvailableRooms,
  filterButtons,
  roomsData,
  availableRoomsList,
  suiteButton,
  userSelectedDate,
  bookingsData,
  bookRoomButton,
  availableRoomsContainer,
  currentCustomer,
  currentCustomerBookings,
};