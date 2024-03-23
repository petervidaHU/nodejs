import { SUPPORTED_COUNTRIES } from "../config";
import { getNextPublicHolidays, getListOfPublicHolidays } from './public-holidays.service';

const goodCountry = SUPPORTED_COUNTRIES[0];
const goodYear = new Date().getFullYear();
const HOLIDAY_SHORTEN_INTERFACE_LENGTH = 3;

describe('public-holiday service tests:', () => {
    describe('getListOfPublicHolidays fn:', () => {
        it('give back an array of shorten holidays', async () => {
            const publicHolidayList = await getListOfPublicHolidays(goodYear, goodCountry);
            // TODO: if day of testing is 27th of December, the proper response is [],

            publicHolidayList.forEach(holiday => {
                const holidayKeys = Object.keys(holiday).length;

                expect(holidayKeys).toBe(HOLIDAY_SHORTEN_INTERFACE_LENGTH);
                expect(holiday).toHaveProperty('date');
                expect(holiday).toHaveProperty('localName');
                expect(holiday).toHaveProperty('name');
            })
        })
    })

    describe('getNextPublicHolidays fn:', () => {
        it('give back an array of shorten next holidays', async () => {
            const publicHolidayList = await getNextPublicHolidays(goodCountry);
            // TODO: if day of testing is 27th of December, the proper response is [],

            publicHolidayList.forEach(holiday => {
                const holidayKeys = Object.keys(holiday).length;

                expect(holidayKeys).toBe(HOLIDAY_SHORTEN_INTERFACE_LENGTH);
                expect(holiday).toHaveProperty('date');
                expect(holiday).toHaveProperty('localName');
                expect(holiday).toHaveProperty('name');
            })
        })
    })

    afterEach(() => {
        jest.clearAllMocks();
    });
})
