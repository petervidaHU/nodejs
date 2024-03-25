import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

const endPoint = '/PublicHolidays';

describe('API test for public holidays api:', () => {
    test('Happy path: api gives an array of public holidays', async () => {
        const year = 2020;
        const countryCode = 'GB';

        const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`${endPoint}/${year}/${countryCode}`);

        expect(status).toEqual(200);
        expect(body.length).toEqual(15);
        expect(body[0]).toEqual({
            date: expect.any(String),
            localName: expect.any(String),
            name: expect.any(String),
            countryCode: expect.any(String),
            fixed: expect.any(Boolean),
            global: expect.any(Boolean),
            counties: expect.any(Array<string>),
            launchYear: null,
            types: expect.any(Array<string>),
        })
    })

    test.each([
        [2020121212, 'gb', 400, 'One or more validation errors occurred.'],
        [2020, 'Solaris', 404, 'Not Found']
    ])('FAIL: api gives an error for invalid inputs', async (year, countryCode, expectedStatus, message) => {
        const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`${endPoint}/${year}/${countryCode}`);
        
        expect(status).toEqual(expectedStatus);
        expect(body.title).toEqual(message)
    });
})