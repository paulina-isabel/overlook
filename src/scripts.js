// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './css/styles.css';
import './domUpdates'
import { filterRoomByType, getCustomerBookings } from './customers';
import { filterButtons, availableRoomsContainer, roomsData, availableRoomsList, showAvailableRooms, userSelectedDate, bookingsData, currentCustomer, showCustomerBookings, currentCustomerBookings, customerBookings, bookRoomButton } from './domUpdates';
import { postData } from '../apiCalls';

let chosenRoomData;

filterButtons.addEventListener('click', (e) => {
  const desiredRoomType = e.target.classList.value;
  let rooms = filterRoomByType(roomsData, desiredRoomType)
  // console.log('available rooms by type', rooms)
  showAvailableRooms(userSelectedDate, bookingsData, rooms)
  // console.log('rooms data inside event list', roomsData)
})

availableRoomsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('book-room-button')) {
    console.log('cust book before post', customerBookings)
    const chosenRoomNumber = e.target.id;
    const chosenRoomDate = userSelectedDate;
    console.log('chosen room #', chosenRoomNumber, 'chosen date', chosenRoomDate)
    chosenRoomData = {
      "userID": currentCustomer.id,
      "date": chosenRoomDate,
      "roomNumber": parseInt(chosenRoomNumber)
    }
    postData(chosenRoomData)

    // .then(() => 
    // console.log('cust book after post', customerBookings))

    // showCustomerBookings()
    console.log(typeof currentCustomer.id, 'typeof')
    let currentCustomerBookings = getCustomerBookings(customerBookings, currentCustomer.id);
    console.log('curr cust booknz', currentCustomerBookings)
  }
})

// An example of how you tell webpack to use a CSS (SCSS) file


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/hotel-room.png'

