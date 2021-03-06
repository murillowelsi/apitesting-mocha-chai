const chai = require('chai'), chaiHttp = require('chai-http');
const yaml = require('js-yaml');
const fs = require('fs');

chai.use(chaiHttp);

const env = yaml.load(fs.readFileSync(`env/${process.env.NODE_ENV}.yml`, 'utf8'));
const baseUri = env.base_uri

class AuthService {
  constructor() {
    let service = chai.request.agent(`${baseUri}`);;
    this.service = service;
  }

  async getMwToken(query, headers) {
    const response = await this.service
      .get('/api/auth/requestToken')
      .query(query)
      .set(headers)

    return response
  }
}

module.exports = AuthService