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


// get all current & past bookings
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

export {
  getCustomer,
  getBookings
}
