import chai from 'chai';
const expect = chai.expect;

import { getCustomer, getBookings, getCustomerBookings, getAvailableRooms, filterRoomByType } from '../src/customers.js';
import { sampleCustomers, sampleBookings, sampleRooms } from '../src/sampleData.js';

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
  getCustomer3 = getCustomer(undefined, 3);
  getCustomer4 = getCustomer(sampleCustomers, 1919191919);
});
  
  it('should be a function', () => {
    expect(getCustomer).to.be.a('function')
  });

  it('should find a user by their id', () => {
    expect(getCustomer1.id).to.equal(3)
  });

  it('should find a different user by their id', () => {
    expect(getCustomer2.id).to.equal(2)
  });

  it('should return an error message if no data is found', () => {
    expect(getCustomer3).to.equal('No customers found')
  });

  it('should return an error message if no customer id is found', () => {
    expect(getCustomer4).to.equal('Cannot find customer')
  });

  it('should return the customer found by id', () => {
    expect(getCustomer1).to.deep.equal(sampleCustomers[2]);
  });
});


describe ('find booking by id', () => {
  let getBookings1, getBookings2, getBookings3, getBookings4;

beforeEach(() => {
  getBookings1 = getBookings(sampleBookings, '5fwrgu4i7k55hl6sz');
  getBookings2 = getBookings(sampleBookings, '5fwrgu4i7k55hl6t5');
  getBookings3 = getBookings(undefined, '5fwrgu4i7k55hl6t6');
  getBookings4 = getBookings(sampleBookings, 'lol');
  });
  
  it('should be a function', () => {
    expect(getBookings).to.be.a('function')
  });

  it('should find a booking by its id', () => {
    expect(getBookings1.id).to.equal('5fwrgu4i7k55hl6sz')
  });

  it('should find a different booking by its id', () => {
    expect(getBookings2.id).to.equal('5fwrgu4i7k55hl6t5')
  });

  it('should return an error message if no data is found', () => {
    expect(getBookings3).to.equal('No bookings found')
  });

  it('should return an error message if no booking is found', () => {
    expect(getBookings4).to.equal('Cannot find booking')
  });

  it('should return the booking found by id', () => {
    expect(getBookings1).to.deep.equal(sampleBookings[0]);
  });
});

describe ('find a customers bookings', () => {
  let getMyBookings1, getMyBookings2, getMyBookings3, getMyBookings4;

beforeEach(() => {
  getMyBookings1 = getCustomerBookings(sampleBookings, 9)
  getMyBookings2 = getCustomerBookings(sampleBookings, 1)
  getMyBookings3 = getCustomerBookings(undefined, 9)
  getMyBookings4 = getCustomerBookings(sampleBookings, 6666666)
  });
  
  it('should be a function', () => {
    expect(getCustomerBookings).to.be.a('function')
  });

  it('should find a given customer\'s bookings', () => {
    expect(getMyBookings1).to.deep.equal(
    [
      {
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 9,
        "date": "2022/04/22",
        "roomNumber": 15
      },
      {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 9,
        "date": "2022/01/24",
        "roomNumber": 24
      },
    ])
  });

  it('should find a different customer\'s bookings', () => {
    expect(getMyBookings2).to.deep.equal(
    [
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 1,
        "date": "2022/02/05",
        "roomNumber": 12
      },
    ])
  })

  it('should return an error message if no data is found', () => {
    expect(getMyBookings3).to.equal('No bookings found')
  })

  it('should return an error message if no booking is found', () => {
    expect(getMyBookings4).to.equal('No bookings found for you')
  })
});

describe ('find rooms available for booking', () => {

  let availableRooms1, availableRooms2;

beforeEach(() => {
  availableRooms1 = getAvailableRooms('2022/02/16', sampleBookings, sampleRooms)
  });
  availableRooms2 = getAvailableRooms('2022/01/17', sampleBookings, sampleRooms)

  it('should be a function', () => {
    expect(getAvailableRooms).to.be.a('function')
  });
  
  it('should only show rooms which are not booked on the given date', () => {
    expect(availableRooms1).to.deep.equal(
      [
        {
          number: 2,
          roomType: 'suite',
          bidet: false,
          bedSize: 'full',
          numBeds: 2,
          costPerNight: 477.38
        },
        {
          number: 3,
          roomType: 'single room',
          bidet: false,
          bedSize: 'king',
          numBeds: 1,
          costPerNight: 491.14
        },
        {
          number: 4,
          roomType: 'single room',
          bidet: false,
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 429.44
        },
        {
          number: 5,
          roomType: 'single room',
          bidet: true,
          bedSize: 'queen',
          numBeds: 2,
          costPerNight: 340.17
        }
      ]
    );
  });
});

describe ('filter rooms by type', () => {
  let roomsByCategory1, roomsByCategory2, roomsByCategory3;

  beforeEach(() => {
    roomsByCategory1 = filterRoomByType(sampleRooms, 'suite')
    });
    roomsByCategory2 = filterRoomByType(sampleRooms, 'single room');
    roomsByCategory3 = filterRoomByType(sampleRooms, 'ugly')
  
  it('should be a function', () => {
    expect(filterRoomByType).to.be.a('function')
  });

  it('should get all rooms in a given category', () => {
    expect(roomsByCategory1).to.deep.equal(
      [
        {
          "number": 2,
          "roomType": "suite",
          "bidet": false,
          "bedSize": "full",
          "numBeds": 2,
          "costPerNight": 477.38
        }
      ]
    );
  });

  it('should get all rooms in a different given category', () => {
    expect(roomsByCategory2).to.deep.equal(
      [
        {
          "number": 3,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "king",
          "numBeds": 1,
          "costPerNight": 491.14
        },
        {
          "number": 4,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "queen",
          "numBeds": 1,
          "costPerNight": 429.44
        },
        {
          "number": 5,
          "roomType": "single room",
          "bidet": true,
          "bedSize": "queen",
          "numBeds": 2,
          "costPerNight": 340.17
        }
      ]
    );
  });

  it('should return an apology if there are no avaiable rooms', () => {
    expect(roomsByCategory3).to.equal('Sorry, there are no available rooms in the ugly category :(');
  });
});