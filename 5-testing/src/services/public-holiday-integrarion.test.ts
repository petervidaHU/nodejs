import axios from 'axios';
import { SUPPORTED_COUNTRIES } from "../config";
import { getNextPublicHolidays, checkIfTodayIsPublicHoliday, getListOfPublicHolidays } from './public-holidays.service';
import { nextPublicHolidayMockresponse, nextPublicHolidayMockresponseShorten, publicHolidaysMockResp, publicHolidaysShortMockResp } from '../mocks/api-publicholidays-200';

const goodCountry = SUPPORTED_COUNTRIES[0];
const goodYear = new Date().getFullYear();

describe('public-holiday service tests:', () => {
    describe('getListOfPublicHolidays fn:', () => {
        it('give back an array of shorten holidays', async () => {

            const publicHolidayList = await getListOfPublicHolidays(goodYear, goodCountry);

            expect(publicHolidayList).toEqual(publicHolidaysShortMockResp);
        })

        it('give back an empty array if API response is 400', async () => {

            const publicHolidayList = await getListOfPublicHolidays(goodYear, goodCountry);

            expect(publicHolidayList).toEqual([]);
        })
    })

    /*    describe('checkIfTodayIsPublicHoliday fn:', () => {
           it.each([
               ['GB', 200, true],
               ['GB', 204, false],
               ['GB', 400, false],
           ])('check %s if today is a public holiday: %s', async (param, response, expected) => {
               const isPublicHoliday = await checkIfTodayIsPublicHoliday(param);
   
               expect(isPublicHoliday).toEqual(expected);
           })
       })
   
       describe('getNextPublicHolidays fn:', () => {
           it('give back a list of next holidays', async () => {
   
               const publicHolidayList = await getNextPublicHolidays('GB');
   
               expect(publicHolidayList).toEqual(nextPublicHolidayMockresponseShorten);
           })
   
           it('give back an empty array if error happens', async () => {
   
               const publicHolidayList = await getNextPublicHolidays('GB');
   
               expect(publicHolidayList).toEqual([]);
           })
       }) */

    afterEach(() => {
        jest.clearAllMocks();
    });
})
