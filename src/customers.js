// show user's bookings

// get user by id
const getCustomer = (data, id) => {
  if(!data) {
    return 'No customers found'
  };

  const customer = data.find((customer) => {
    if (customer.id === id) {
      return customer
    }
  });

  if(!customer) { 
    return 'Cannot find customer'
  };

  return customer;
};

// get booking by id
const getBookings = (data, bookingId) => {
  if(!data) {
    return 'No bookings found'
  };

  const bookings = data.find((booking) => {
    if (booking.id === bookingId)
      return booking
  })

  if(!bookings) {
    return 'Cannot find booking'
  };

  return bookings
}

// get all current & past bookings
const getCustomerBookings = (bookingsData, customerId) => {

  if(!bookingsData) {
    return 'No bookings found'
  };

  const myBookings = bookingsData.filter((booking) => {
    return booking.userID === customerId
  })

  if(!myBookings.length) {
    return 'No bookings found for you'
  };

  return myBookings
}

export {
  getCustomer,
  getBookings,
  getCustomerBookings,
}
