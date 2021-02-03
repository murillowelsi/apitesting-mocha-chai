const chai = require('chai'), chaiHttp = require('chai-http');
const yaml = require('js-yaml');
const fs = require('fs');

chai.use(chaiHttp);

const env = yaml.load(fs.readFileSync(`env/${process.env.NODE_ENV}.yml`, 'utf8'));
const baseUri = env.base_uri

class BookingsService {
  constructor() {
    let service = chai.request.agent(`${baseUri}`);;
    this.service = service;
  }

  async getBookingById(bookingRef, headers) {
    const response = await this.service
        .get(`/api/v2/bookings/${bookingRef}/contact`)
        .set(headers)

        return response
  }
}

module.exports = BookingsService