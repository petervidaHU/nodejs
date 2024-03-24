import { SUPPORTED_COUNTRIES } from "./config";
import { validateInput, shortenPublicHoliday } from "./helpers";
import { PublicHoliday, PublicHolidayShort } from "./types";

const supportedCountry = SUPPORTED_COUNTRIES[0];

describe('helpers: ', () => {
    describe('validateInput fn: ', () => {
        it('should validate with proper input', () => {
            const goodParams = {
                country: supportedCountry,
                year: new Date().getFullYear(),
            }

            expect(validateInput(goodParams)).toBe(true);
        })

        it('should validate with proper input', () => {
            const badYearParam = {
                country: supportedCountry,
                year: 2020,
            }

            expect(() => validateInput(badYearParam)).toThrow(`Year provided not the current, received: 2020`);
        })

        it('should filter bad year', () => {
            const badCountry = 'xxx';
            const badCountryParam = {
                country: badCountry,
                year: 2020,
            }
            expect(() => validateInput(badCountryParam)).toThrow(new Error(`Country provided is not supported, received: ${badCountry}`));
        })

        it.each`
            param 
            ${{ country: supportedCountry }}
            ${{ year: new Date().getFullYear(), }}
            ${{}}
        `('returns true when called with only $param',
            ({ param }) => {
                expect(validateInput(param)).toBe(true);
            });
    })
    describe('shortenPublicHoliday fn: ', () => {
        const holidayTest: PublicHoliday = {
            date: 'datestring',
            localName: 'localstring',
            name: 'namestring',
            countryCode: 'GB',
            fixed: true,
            global: true,
            counties: ['GB', 'FR', 'DE', 'NL'],
            launchYear: 2020,
            types: ['t1', 't2', 't3']
        }

        const resp: PublicHolidayShort = {
            name: holidayTest.name,
            localName: holidayTest.localName,
            date: holidayTest.date,
        }

        it('shorten the parameter properly', () => {
            expect(shortenPublicHoliday(holidayTest)).toEqual(resp)
        })
    })
})