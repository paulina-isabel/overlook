import chai from 'chai';
const expect = chai.expect;

import { getCustomer } from '../src/customers.js';
import { sampleCustomers } from '../src/sampleData.js';

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});


describe ('find user by id', () => {
  let getCustomer1; 
  let getCustomer2;

beforeEach(() => {
  getCustomer1 = getCustomer(sampleCustomers, 3);
  getCustomer2 = getCustomer(sampleCustomers, 2);
});

  it('should find a user by their id', () => {
    expect(getCustomer1.id).to.equal(3)
  });

  it('should find a different user by their id', () => {
    expect(getCustomer2.id).to.equal(2)
  });
})
