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

  let myBookings = bookingsData.filter((booking) => {
    return booking.userID === customerId
  })

  if(!myBookings.length) {
    return 'No bookings found for you'
  };

  return myBookings
}

const getAvailableRooms = (date, bookingsData, roomsData) => {
  let unavailableRooms = bookingsData.reduce((unavailRooms, booking) => { if (booking.date === date) {
    unavailRooms.push(booking.roomNumber)
  }
    return unavailRooms
  }, [])

  let availableRooms = roomsData.filter((room) => {
    return !unavailableRooms.includes(room.number) 
  })

  // if(!availableRooms.length) {
  //   return 'No rooms are available on the selected date, please pick another date.'
  // }

 return availableRooms
}

const filterRoomByType = (roomz, type) => {
  let filteredRooms = roomz.filter((room) => {
    return room.roomType === type
  })
  
  // console.log(roomz)

  if (!filteredRooms.length) {
    return `Sorry, there are no available rooms in the ${type} category :(`
  }

  return filteredRooms
}

export {
  getCustomer,
  getBookings,
  getCustomerBookings,
  getAvailableRooms,
  filterRoomByType
}
