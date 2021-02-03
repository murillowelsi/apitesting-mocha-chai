const chai = require('chai'), 
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

class AuthService {
  constructor() {
    let service = chai.request.agent(`https://dev-uk.tda.tui-api.com`);
    this.service = service;
  }

  getMwToken(query, headers) {
    return this.service
        .get('/api/auth/requestToken')
        .query(query)
        .set(headers)
        .end((err, res) => {
          done();
        })
  }
}

module.exports = AuthService