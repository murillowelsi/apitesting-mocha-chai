const chai = require('chai'), 
    chaiHttp = require('chai-http');

const yaml = require('js-yaml');
const fs   = require('fs');
const AuthService = require('../services/auth-service');

const env = yaml.load(fs.readFileSync(`env/${process.env.NODE_ENV}.yml`, 'utf8'));
const baseUri = env.base_uri
const auth = new AuthService();

console.log(auth)

chai.use(chaiHttp);

const request = chai.request.agent(`${baseUri}`);
const expect = chai.expect;


let mwtoken;

describe('get', () => {
    context('get token', () => {
        before((done) => {
            const auth = new AuthService();

            let headers = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'app-name': 'tui-uk-th',
                'app-version': '12.5.0',
                'app-locale': 'en_GB',
                'x-api-key': '863c55cd15498f250b53013c182af3f95d6f49a9f6d802efa5ee791f505c9292',
                'x-access-token': '69a79ab88d7923ddc75c6e9439dfa5de30007f3864bea63d323e22aefc101bfc',
                'device-os': 'ios',
                'correlation-id': '21f75c3a-e570-47d8-81f1-765380f261cb-Contact Us'
            };

            let query = {
                id: 11257313,
                additionalInfo: 'Stratton',
                departureDate: '2021-01-12'
            }

            let res = auth.getMwToken(query, headers)
            // let mwtoken = res.headers['mw-token'];
            console.log('token', res.response)
        });

        it('should get contact us endpoint', () => {
            // let bookingRef = '11257313'
            // let headers = {
            //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            //     'app-name': 'tui-uk-th',
            //     'app-version': '12.5.0',
            //     'app-locale': 'en_GB',
            //     'mw-token': mwtoken,
            //     'tui-app-img-bucket-size': 'medium',
            //     'x-api-key': '863c55cd15498f250b53013c182af3f95d6f49a9f6d802efa5ee791f505c9292',
            //     'x-access-token': '69a79ab88d7923ddc75c6e9439dfa5de30007f3864bea63d323e22aefc101bfc',
            //     'ETag': 'W/"1056-vgPmuxHV0jh2senFlOhFMnuvMyc"',
            //     'device-os': 'ios',
            //     'tui-app-country': 'IE',
            //     'correlation-id': '21f75c3a-e570-47d8-81f1-765380f261cb-Refresh Token'
            // };

            // request
            //     .get(`/api/v2/bookings/${bookingRef}/contact`)
            //     .set(headers)
            //     .end((err, res) => {
            //         expect(res).to.has.status(200);
            //         expect(res.body.bookings.bookingRef).to.equal(bookingRef)
            //         done();
            //     });
   
            console.log(test)
        });
    });
});