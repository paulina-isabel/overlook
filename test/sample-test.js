import chai from 'chai';
const expect = chai.expect;

import { getCustomer, getBookings, getCustomerBookings } from '../src/customers.js';
import { sampleCustomers, sampleBookings } from '../src/sampleData.js';

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});

describe ('find user by id', () => {
  let getCustomer1, getCustomer2, getCustomer3, getCustomer4;

beforeEach(() => {
  getCustomer1 = getCustomer(sampleCustomers, 3);
  getCustomer2 = getCustomer(sampleCustomers, 2);
  getCustomer3 = getCustomer(undefined, 3)
  getCustomer4 = getCustomer(sampleCustomers, 1919191919)
});
  
  it('should be a function', () => {
    expect(getCustomer).to.be.a('function')
  })

  it('should find a user by their id', () => {
    expect(getCustomer1.id).to.equal(3)
  });

  it('should find a different user by their id', () => {
    expect(getCustomer2.id).to.equal(2)
  });

  it('should return an error message if no data is found', () => {
    expect(getCustomer3).to.equal('No customers found')
  })

  it('should return an error message if no customer id is found', () => {
    expect(getCustomer4).to.equal('Cannot find customer')
  })

  it('should return the customer found by id', () => {
    expect(getCustomer1).to.deep.equal(sampleCustomers[2]);
  });
})


describe ('find booking by id', () => {
  let getBookings1, getBookings2, getBookings3, getBookings4;

beforeEach(() => {
  getBookings1 = getBookings(sampleBookings, '5fwrgu4i7k55hl6sz')
  getBookings2 = getBookings(sampleBookings, '5fwrgu4i7k55hl6t5')
  getBookings3 = getBookings(undefined, '5fwrgu4i7k55hl6t6')
  getBookings4 = getBookings(sampleBookings, 'lol')
  });
  
  it('should be a function', () => {
    expect(getBookings).to.be.a('function')
  });

  it('should find a booking by its id', () => {
    expect(getBookings1.id).to.equal('5fwrgu4i7k55hl6sz')
  });

  it('should find a different booking by its id', () => {
    expect(getBookings2.id).to.equal('5fwrgu4i7k55hl6t5')
  })

  it('should return an error message if no data is found', () => {
    expect(getBookings3).to.equal('No bookings found')
  })

  it('should return an error message if no booking is found', () => {
    expect(getBookings4).to.equal('Cannot find booking')
  })

  it('should return the booking found by id', () => {
    expect(getBookings1).to.deep.equal(sampleBookings[0]);
  });
})