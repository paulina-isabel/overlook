// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getData, getAllData } from '../apiCalls';
import { getAvailableRooms, getCustomerBookings } from './customers';
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
const showingAllMessage = document.querySelector('.showing-all')
const bookingConfirmedMessage = document.querySelector('.booking-confirmed')

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

window.addEventListener('load', () => {
  setData();
  getData('bookings').then(result => {
    showCustomerBookings();
    flatpickr('#date', {
      dateFormat: 'Y/m/d',
      minDate: 'today',
      // maxDate: "2033/01/01",
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
});

const getRandomUser = () => {
  let randomUserIndex = Math.floor(Math.random() * customersData.length)
  currentCustomer = customersData[randomUserIndex]
  console.log('current cust', currentCustomer.id)
}

const showWelcomeMessage = () => {
  getRandomUser()
  welcomeMessage.innerText = `Welcome, ${currentCustomer.name}`
}

const showCustomerBookings = () => {
  showWelcomeMessage()
  bookingsContainer.innerHTML = '';
   // upon login, capture customer id to pass in as argument in getCustomerBookings below:
  currentCustomerBookings = getCustomerBookings(bookingsData, currentCustomer.id);
  currentCustomerBookings.forEach((booking) => {
    bookingsContainer.innerHTML += `
      <div class="single-booking">Date: ${booking.date} <br> Room: ${booking.roomNumber}
      </div>`
  });
  let totalSpent2 = getTotalSpent();
  totalSpentContainer.innerHTML = `Your total amount spent is: $${totalSpent2}`;
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
    };

  });
  return totalSpent.toFixed(2);
}

const showAvailableRooms = (dateString, bookingsData, roomsData) => {
  availableRoomsContainer.innerHTML = '';
  availableRoomsList = getAvailableRooms(dateString, bookingsData, roomsData);

  if (!availableRoomsList.length) {
    dropdownSection.classList.add('hidden');
    showingAllMessage.classList.add('hidden');
    availableRoomsContainer.innerHTML = `No available rooms for this search on ${userSelectedDate}, please modify your search.`
  } else {
    populateAvailableRooms(availableRoomsList);
    dropdownSection.classList.remove('hidden');
    showingAllMessage.classList.remove('hidden');
    showingAllMessage.innerText = `Showing available rooms on ${userSelectedDate}`
    populateFilterButton(roomsData, dropDownSect);
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
        Bidet: ${booking.bidet}<br>
        Room Number: ${booking.number}<br>
        <button class="book-room-button" id="${booking.number}">Book This Room</button>
      </div>`
  });
};

const populateFilterButton = (roomsData) => {
  dropDownSect.innerHTML = '';
  roomTypes = [];
  roomsData.forEach((room) => {
    if (!roomTypes.includes(room.roomType)) {
      roomTypes.push(room.roomType)
    };
  });    
  dropDownSect.innerHTML += 
    `Filter By Room Type: <br>` 
  roomTypes.forEach(type => {
    dropDownSect.innerHTML += `<button class="${type}" aria-label="filter for ${type}">${type}</button>`;
  });  
  dropDownSect.innerHTML += 
    `<button class="all-rooms" aria-label="filter for all rooms">all types</button>`;
};

const confirmBooking = (chosenRoomDate, chosenRoomNumber) => {
  dropdownSection.classList.add('hidden');
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