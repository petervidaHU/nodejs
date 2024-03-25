import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

const endPoint = '/LongWeekend';

describe('API test for long weekends api:', () => {
    test('Happy path: api gives an array of weekends', async () => {
        const year = 2020;
        const countryCode = 'GB';

        const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`${endPoint}/${year}/${countryCode}`);

        expect(status).toEqual(200);
        expect(body.length).toEqual(4);
        expect(body[0]).toEqual({
            startDate: expect.any(String),
            endDate: expect.any(String),
            dayCount: expect.any(Number),
            needBridgeDay: expect.any(Boolean),
        })
    })

    test.each([
        [202011111, 'GB', 500],
        [2020, '', 404],
        [2020, 'Solaris', 404]
    ])('FAIL: api gives an error for invalid inputs', async (year, countryCode, expectedStatus) => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(`${endPoint}/${year}/${countryCode}`);
        expect(status).toEqual(expectedStatus);
    });
})