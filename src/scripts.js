// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './css/styles.css';
import './domUpdates'
import { filterRoomByType } from './customers';
import { filterButtons, availableRoomsContainer, roomsData, availableRoomsList, showAvailableRooms, suiteButton, userSelectedDate, bookingsData, bookRoomButton, currentCustomer } from './domUpdates';

filterButtons.addEventListener('click', (e) => {
  const desiredRoomType = e.target.classList.value;
  let rooms = filterRoomByType(roomsData, desiredRoomType)
  // console.log('available rooms by type', rooms)
  showAvailableRooms(userSelectedDate, bookingsData, rooms)
  // console.log('rooms data inside event list', roomsData)
})

availableRoomsContainer.addEventListener('click', (e) => {
  const chosenRoomNumber = e.target.id;
  const chosenRoomDate = userSelectedDate;
  const chosenRoomData = {
    userID: currentCustomer.id,
    date: chosenRoomDate,
    roomNumber: chosenRoomNumber
  }
  console.log('room data for post', chosenRoomData)
  console.log('chosen room', chosenRoomNumber, 'chosen room date', chosenRoomDate)
})

// An example of how you tell webpack to use a CSS (SCSS) file


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/hotel-room.png'

