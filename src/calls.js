// import { getData, getAllData } from '../apiCalls';
// import { getCustomerBookings } from './customers';

// const bookingsContainer = document.querySelector('.bookings-container')

// let roomsData;
// let customersData;
// let bookingsData;
// let customerBookings;

// window.addEventListener('load', function() {
//   setData();
//   getData('bookings').then(result => {
//     customerBookings = result.bookings
//     getCustomerBookings(customerBookings, 9)
//     console.log(customerBookings)
//     console.log('hello')
//     // showCustomerBookings(customerBookings);
//   })
  
// });



// const showCustomerBookings = (bookings) => {
//   bookingsContainer.innerHTML = ""
  
//   bookingsContainer.innerHTML = `<div>bookingz</div>`
//   customerBookings.forEach((booking) => {
//     bookingsContainer.innerHTML += `
//       <div>Date: ${booking.date} <br> Room: ${booking.roomNumber}
//       </div>`
//   });

// };

// const setData = () => {
//   getAllData().then(data => {
//     roomsData = data[0].rooms;
//     customersData = data[1].customers;
//     bookingsData = data[2].bookings;
//   });
// };


// export {
//   setData,
// };