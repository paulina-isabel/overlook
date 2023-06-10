// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

import { filterRoomByType } from './customers';
import { filterButtons, sar, availableRoomsContainer, roomsData, availableRoomsList, showAvailableRooms, suiteButton, userSelectedDate, bookingsData, bookRoomButton } from './domUpdates';

filterButtons.addEventListener('click', (e) => {
  const roomType = e.target.classList.value;
  let rooms = filterRoomByType(roomsData, roomType)
  console.log('available rooms by type', rooms)
  showAvailableRooms(userSelectedDate, bookingsData, rooms)
  // console.log('rooms data inside event list', roomsData)
})

availableRoomsContainer.addEventListener('click', (e) => {
  const chosenRoom = e.target.id;
  const chosenRoomDate = userSelectedDate;
  console.log('chosen room', chosenRoom, userSelectedDate)
})

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import './domUpdates'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/hotel-room.png'

