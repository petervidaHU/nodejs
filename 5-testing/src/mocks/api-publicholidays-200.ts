import { PublicHoliday, PublicHolidayShort } from "../types";

export const publicHolidaysMockResp: { data: PublicHoliday[] } = {
    data: [
        {
            "date": "2024-01-01",
            "localName": "New Year's Day",
            "name": "New Year's Day",
            "countryCode": "GB",
            "fixed": false,
            "global": false,
            "counties": [
                "GB-NIR"
            ],
            "launchYear": null,
            "types": [
                "Public"
            ]
        },
        {
            "date": "2024-01-01",
            "localName": "New Year's Day",
            "name": "New Year's Day",
            "countryCode": "GB",
            "fixed": false,
            "global": false,
            "counties": [
                "GB-ENG",
                "GB-WLS"
            ],
            "launchYear": null,
            "types": [
                "Public"
            ]
        },
        {
            "date": "2024-01-01",
            "localName": "New Year's Day",
            "name": "New Year's Day",
            "countryCode": "GB",
            "fixed": false,
            "global": false,
            "counties": [
                "GB-SCT"
            ],
            "launchYear": null,
            "types": [
                "Public"
            ]
        },
        {
            "date": "2024-01-02",
            "localName": "2 January",
            "name": "2 January",
            "countryCode": "GB",
            "fixed": false,
            "global": false,
            "counties": [
                "GB-SCT"
            ],
            "launchYear": null,
            "types": [
                "Public"
            ]
        },
    ]
}

export const publicHolidaysShortMockResp: PublicHolidayShort[] = [
    {
        date: "2024-01-01",
        localName: "New Year's Day",
        name: "New Year's Day",
    },
    {
        date: "2024-01-01",
        localName: "New Year's Day",
        name: "New Year's Day",
    },
    {
        date: "2024-01-01",
        localName: "New Year's Day",
        name: "New Year's Day",
    },
    {
        date: "2024-01-02",
        localName: "2 January",
        name: "2 January",
    },
]

export const nextPublicHolidayMockresponse = [
    {
        date: "2024-03-29",
        localName: "Good Friday",
        name: "Good Friday",
        countryCode: "GB",
        fixed: false,
        global: true,
        counties: null,
        launchYear: null,
        types: [
            "Public"
        ]
    },
    {
        date: "2024-04-01",
        localName: "Easter Monday",
        name: "Easter Monday",
        countryCode: "GB",
        fixed: false,
        global: false,
        counties: [
            "GB-ENG",
            "GB-WLS",
            "GB-NIR"
        ],
        launchYear: null,
        types: [
            "Public"
        ]
    }
]

export const nextPublicHolidayMockresponseShorten: PublicHolidayShort[] = [
    {
        date: "2024-03-29",
        localName: "Good Friday",
        name: "Good Friday",
    },
    {
        date: "2024-04-01",
        localName: "Easter Monday",
        name: "Easter Monday",
    }
]