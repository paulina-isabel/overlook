// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './css/styles.css';
import './domUpdates'
import { filterRoomByType } from './customers';
import { filterButtons, availableRoomsContainer, roomsData, showAvailableRooms, userSelectedDate, bookingsData, currentCustomer, populateFilterButton, confirmBooking } from './domUpdates';
import { postData } from '../apiCalls';

let chosenRoomData;

filterButtons.addEventListener('click', (e) => {
  const desiredRoomType = e.target.classList.value;
  if (desiredRoomType === 'all-rooms') {
    showAvailableRooms(userSelectedDate, bookingsData, roomsData);
  } else {
    let rooms = filterRoomByType(roomsData, desiredRoomType);
    showAvailableRooms(userSelectedDate, bookingsData, rooms);
    
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

// An example of how you tell webpack to use a CSS (SCSS) file

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/hotel-room.png'