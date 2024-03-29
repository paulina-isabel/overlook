// =====================================================================
// =========================  FETCH REQUESTS  ==========================
// =====================================================================
import { setData, bookingsData, showCustomerBookings, currentCustomerBookings } from './src/domUpdates.js';

const getData = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(response => response.json())
    .catch(error => console.log("ERROR", error));
};

const postData = (data) => {
 return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(
      json => {
      bookingsData.push(json.newBooking),
      setData(),
      showCustomerBookings()
      }
    )
    .then(resolve => setData())
    .catch(err => console.log("ERROR", err));
};

const getAllData = () => {
  return Promise.all([ getData('rooms'), getData('customers'), getData('bookings') ]);
};

export {
  getAllData,
  getData,
  postData,
  showCustomerBookings,
  bookingsData
};