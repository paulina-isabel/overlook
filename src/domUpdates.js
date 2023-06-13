// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getData, getAllData } from '../apiCalls';
import { getAvailableRooms, getCustomerBookings, getCustomer } from './customers';
import { customerId } from './scripts';
import flatpickr from 'flatpickr';

const filterButtons = document.querySelector('.filter-buttons')
const bookingsContainer = document.querySelector('.bookings');
const totalSpentContainer = document.querySelector('.total-spent')
const availableRoomsContainer = document.querySelector('.available-rooms');
const filterButtonsMessage = document.querySelector('.filter-message');
const suiteButton = document.querySelector('.suite');
const bookRoomButton = document.querySelectorAll('.book-room-button');
const welcomeMessage = document.querySelector('.user-welcome-message');
const showingAllMessage = document.querySelector('.showing-all')
const bookingConfirmedMessage = document.querySelector('.booking-confirmed')
const customerBookings = document.querySelector('.customer-bookings');
const datePickerAside = document.querySelector('.date-picker-aside');
const loginPage = document.querySelector('.login-page')


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

const renderCustomerPage = () => {
  welcomeMessage.classList.remove('hidden');
  customerBookings.classList.remove('hidden');
  totalSpentContainer.classList.remove('hidden');
  datePickerAside.classList.remove('hidden');
  loginPage.classList.add('hidden');
}

const start = () => {
  setData();
  getData('bookings').then(result => {
    showCustomerBookings();
    flatpickr('#date', {
      dateFormat: 'Y/m/d',
      minDate: 'today',
      maxDate: "2033/01/01",
      allowInput: true,
      mode: 'single',
      onChange: (selectedDate, dateString) => {
        userSelectedDate = dateString
        availableRoomsContainer.classList.remove('hidden');
        bookingConfirmedMessage.classList.add('hidden');
        showAvailableRooms(dateString, bookingsData, roomsData);
      }
    });
  });
}

const showWelcomeMessage = () => {  
  currentCustomer = getCustomer(customersData, customerId)
  welcomeMessage.innerText = `Welcome, ${currentCustomer.name}`
}

const showCustomerBookings = () => {
  showWelcomeMessage()
  bookingsContainer.innerHTML = '';
  currentCustomerBookings = getCustomerBookings(bookingsData, currentCustomer.id);
  currentCustomerBookings.forEach((booking) => {
    bookingsContainer.innerHTML += `
      <div class="single-booking" tabindex="0">Date: ${booking.date} <br> Room: ${booking.roomNumber}
      </div>`
  });
  totalSpent = getTotalSpent(currentCustomerBookings);
  totalSpentContainer.innerHTML = `Your total amount spent is: $${totalSpent.toFixed(2)}`;
};

const getTotalSpent = (currentCustomerBookings) => {
  return currentCustomerBookings.reduce((acc, booking) => {
    roomsData.forEach((room) => {
      if (room.number === booking.roomNumber) {
        acc += room.costPerNight
      }
    })
    console.log(acc)
    return acc
  }, 0)
}

const showAvailableRooms = (dateString, bookingsData, roomsData) => {
  availableRoomsContainer.innerHTML = '';
  availableRoomsList = getAvailableRooms(dateString, bookingsData, roomsData);

  if (!availableRoomsList.length) {
    filterButtonsMessage.classList.add('hidden');
    filterButtons.classList.add('hidden');
    showingAllMessage.classList.add('hidden');
    availableRoomsContainer.innerHTML = `No availability. Please modify your search!`
  } else {
    populateAvailableRooms(availableRoomsList);
    filterButtonsMessage.classList.remove('hidden');
    filterButtons.classList.remove('hidden');
    showingAllMessage.classList.remove('hidden');
    showingAllMessage.innerText = `Showing available rooms on ${userSelectedDate}`
    populateFilterButton(roomsData, filterButtons);
  };

};

const populateAvailableRooms = (availableRoomsList) => {
    availableRoomsList.forEach((booking) => {
    availableRoomsContainer.innerHTML += `
      <div class="single-available-room">
        Cost Per Night: $${booking.costPerNight}<br>
        Room Type: ${booking.roomType}<br> 
        Beds: ${booking.numBeds}<br>
        Bed Size: ${booking.bedSize}<br>
        Bidet: ${booking.bidet ? "yes" : "no"}<br>
        Room Number: ${booking.number}<br>
        <button class="book-room-button" id="${booking.number}">Book This Room</button>
      </div>`
  });
};

const populateFilterButton = (roomsData) => {
  filterButtons.classList.remove('hidden');
  filterButtonsMessage.innerHTML = '';
  filterButtons.innerHTML = '';
  roomTypes = [];
  roomsData.forEach((room) => {
    if (!roomTypes.includes(room.roomType)) {
      roomTypes.push(room.roomType)
    };
  });    
  filterButtonsMessage.innerHTML += 
    `Filter By Available Room Type: <br>` 
  roomTypes.forEach(type => {
    console.log(type)
    filterButtons.innerHTML += `<button class="${type}" aria-label="filter for ${type}">${type}</button>`;
  });  
  filterButtons.innerHTML += 
    `<button class="all-rooms" aria-label="filter for all rooms">all types</button>`;
};

const confirmBooking = (chosenRoomDate, chosenRoomNumber) => {
  filterButtonsMessage.classList.add('hidden');
  filterButtons.classList.add('hidden');
  showingAllMessage.classList.add('hidden');
  availableRoomsContainer.classList.add('hidden');
  bookingConfirmedMessage.classList.remove('hidden');
  bookingConfirmedMessage.innerHTML = `
    Your booking on ${chosenRoomDate} for room ${chosenRoomNumber} is confirmed!<br>
    This booking has been added to your bookings list, and your total amount spent has been updated.<br>
  `
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
  showCustomerBookings,
  showAvailableRooms,
  populateFilterButton,
  populateAvailableRooms,
  confirmBooking,
  renderCustomerPage,
  start,
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