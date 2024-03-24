import axios from 'axios';
import { SUPPORTED_COUNTRIES } from "../config";
import { getNextPublicHolidays, checkIfTodayIsPublicHoliday, getListOfPublicHolidays } from './public-holidays.service';
import { nextPublicHolidayMockresponse, nextPublicHolidayMockresponseShorten, publicHolidaysMockResp, publicHolidaysShortMockResp } from '../mocks/api-publicholidays-200';

const goodCountry = SUPPORTED_COUNTRIES[0];
const goodYear = new Date().getFullYear();

describe('public-holiday service tests:', () => {
    describe('getListOfPublicHolidays fn:', () => {
        it('give back an array of shorten holidays', async () => {
            const spiedGet = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(publicHolidaysMockResp));

            const publicHolidayList = await getListOfPublicHolidays(goodYear, goodCountry);

            expect(spiedGet).toHaveBeenCalledTimes(1);
            expect(publicHolidayList).toEqual(publicHolidaysShortMockResp);
        })

        it('give back an empty array if API response is 400', async () => {
            const spiedGet = jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());

            const publicHolidayList = await getListOfPublicHolidays(goodYear, goodCountry);

            expect(spiedGet).toHaveBeenCalledTimes(1);
            expect(publicHolidayList).toEqual([]);
        })
    })

    describe('checkIfTodayIsPublicHoliday fn:', () => {
        it.each([
            ['GB', 200, true],
            ['GB', 204, false],
            ['GB', 400, false],
        ])('check %s if today is a public holiday: %s', async (param, response, expected) => {
            const spiedGet = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: response }));

            const isPublicHoliday = await checkIfTodayIsPublicHoliday(param);

            expect(spiedGet).toHaveBeenCalledTimes(1);
            expect(isPublicHoliday).toEqual(expected);
        })
    })

    describe('getNextPublicHolidays fn:', () => {
        it('give back a list of next holidays', async () => {
            const spiedGet = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: nextPublicHolidayMockresponse }));

            const publicHolidayList = await getNextPublicHolidays('GB');

            expect(spiedGet).toHaveBeenCalledTimes(1);
            expect(publicHolidayList).toEqual(nextPublicHolidayMockresponseShorten);
        })

        it('give back an empty array if error happens', async () => {
            const spiedGet = jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());

            const publicHolidayList = await getNextPublicHolidays('GB');

            expect(spiedGet).toHaveBeenCalledTimes(1);
            expect(publicHolidayList).toEqual([]);
        })
    })

    afterEach(() => {
        jest.clearAllMocks();
    });
})

