import './css/styles.css';
import './domUpdates'
import { filterRoomByType } from './customers';
import { filterButtons, availableRoomsContainer, roomsData, showAvailableRooms, userSelectedDate, bookingsData, currentCustomer, populateFilterButton, confirmBooking, renderCustomerPage, start } from './domUpdates';
import { postData } from '../apiCalls';

let chosenRoomData;
let customerId;

const loginForm = document.querySelector('.login');
const loginButton = document.querySelector('.submit-button');
const loginErrorMsg = document.querySelector('.login-error-msg-holder');

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    let password = loginForm.password.value;
    let username = loginForm.username.value;   
    let customerUsername = username.split('customer');
    customerId = parseInt(customerUsername[1]);

    if (password === "overlook2021" && customerId < 51 && username.charAt(0) === 'c' && customerId > 0) { 
      start();
      renderCustomerPage();
    } else {
      loginErrorMsg.classList.remove('hidden');
    }
})

filterButtons.addEventListener('click', (e) => {
  const desiredRoomType = e.target.classList.value;
  if (desiredRoomType === 'all-rooms') {
    showAvailableRooms(userSelectedDate, bookingsData, roomsData);
  } else {
    let roomsByType = filterRoomByType(roomsData, desiredRoomType);
    showAvailableRooms(userSelectedDate, bookingsData, roomsByType);
    populateFilterButton(roomsData);
  }
})

availableRoomsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('book-room-button')) {
    const chosenRoomNumber = e.target.id;
    const chosenRoomDate = userSelectedDate;
    chosenRoomData = {
      "userID": currentCustomer.id,
      "date": chosenRoomDate,
      "roomNumber": parseInt(chosenRoomNumber)
    }
    postData(chosenRoomData)
    .then(() => {
      confirmBooking(chosenRoomDate, chosenRoomNumber)
    })
    
  }
})

export {
  customerId,
  loginForm
}

// An example of how you tell webpack to use a CSS (SCSS) file

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/hotel-room.png'