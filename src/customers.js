// show user's bookings

// get user by id
const getCustomer = (data, id) => {
  if(!data) {
    return 'Cannot find customers'
  };

  let customer = data.find((customer) => {
    if (customer.id === id) {
      return customer
    }
  });

  if(!customer) { 
    return 'Cannot find customer'
  };

  return customer;
};

export {
  getCustomer,
}