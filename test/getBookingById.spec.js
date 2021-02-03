const expect  = require('chai').expect
const yaml = require('js-yaml');
const fs   = require('fs');
const AuthService = require('../services/auth-service');
const BookingsService = require('../services/bookings-service');

const data = yaml.load(fs.readFileSync(`fixtures/bookingInfo.yml`, 'utf8'));

let mwtoken;
describe('get', () => {

    context('get token', () => {
        before(async () => {
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
                id: data.bookings[0].bookingRef,
                additionalInfo: 'Stratton',
                departureDate: '2021-01-12'
            }

            let res = await auth.getMwToken(query, headers)
            mwtoken = res.headers['mw-token'];
            expect(res).to.has.status(200);
        });

        it('should get contact us endpoint', async () => {
            const bookings = new BookingsService();

            let bookingRef = data.bookings[0].bookingRef

            let headers = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'app-name': 'tui-uk-th',
                'app-version': '12.5.0',
                'app-locale': 'en_GB',
                'mw-token': mwtoken,
                'tui-app-img-bucket-size': 'medium',
                'x-api-key': '863c55cd15498f250b53013c182af3f95d6f49a9f6d802efa5ee791f505c9292',
                'x-access-token': '69a79ab88d7923ddc75c6e9439dfa5de30007f3864bea63d323e22aefc101bfc',
                'ETag': 'W/"1056-vgPmuxHV0jh2senFlOhFMnuvMyc"',
                'device-os': 'ios',
                'tui-app-country': 'IE',
                'correlation-id': '21f75c3a-e570-47d8-81f1-765380f261cb-Refresh Token'
            };

            res = await bookings.getBookingById(bookingRef, headers)
            expect(res).to.has.status(200);
            expect(res.body.bookings.booking[0].reservationCode).to.equals('11257313')
        });
    });
});