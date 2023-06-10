// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

import { filterRoomByType } from './customers';
import { filterButtons, roomsData } from './domUpdates';

window.addEventListener('load', function() {
  setData();
  getData('bookings').then(result => {
    customerBookings = result.bookings;
    // upon login, capture customer id to pass in as argument in getCustomerBookings below:
    currentCustomerBookings = getCustomerBookings(customerBookings, 9);
    // console.log('current customer bookings', currentCustomerBookings)
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
  });
});

filterButtons.addEventListener('click', filterRoomByType(roomsData, 'suite'))
console.log('eoomz', roomsData)

const setData = () => {
  getAllData().then(data => {
    roomsData = data[0].rooms;
    customersData = data[1].customers;
    bookingsData = data[2].bookings;
  });
};

export 

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import './domUpdates'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/hotel-room.png'

