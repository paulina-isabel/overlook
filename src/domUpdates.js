// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getData, getAllData } from '../apiCalls';
import { getCustomerBookings } from './customers';

const bookingsContainer = document.querySelector('.bookings-container')

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
    customerBookings = result.bookings
    currentCustomerBookings = getCustomerBookings(customerBookings, 9)
    console.log('cust bookz', customerBookings)
    console.log('user 9 bookz', currentCustomerBookings)
    showCustomerBookings()
    // showCustomerBookings(customerBookings);
  })
  
});



const showCustomerBookings = () => {
  bookingsContainer.innerHTML = ""
  currentCustomerBookings.forEach((booking) => {
    bookingsContainer.innerHTML += `
      <div class="single-booking">Date: ${booking.date} <br> Room: ${booking.roomNumber}
      </div>`
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
  showCustomerBookings
};

// window.addEventListener('load', function() {
//   showCustomerBookings();
// });

// const showCustomerBookings = () => {
//   bookingsContainer.innerHTML = ""
//   let customerBookings = getCustomerBookings(sampleBookings, 9)
//   customerBookings.forEach((booking) => {
//     return bookingsContainer.innerHTML += `
//       <div>Date: ${booking.date} <br> Room: ${booking.roomNumber}
//       </div>`
//   });

// };