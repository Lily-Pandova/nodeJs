import {getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays} from "../public-holidays.service";
import * as helpers from "../../helpers";
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const publicHoliday =  [
    {
      date: '2024-01-01',
      localName: "Jour de l'an",
      name: "New Year's Day",
      countryCode: 'FR',
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: [ 'Public' ]
    },
    {
      date: '2024-04-01',
      localName: 'Lundi de Pâques',
      name: 'Easter Monday',
      countryCode: 'FR',
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: [ 'Public' ]
    }
]
  
const shortenResponse =   [
    {
        name: "New Year's Day",
        localName: "Jour de l'an",
        date: '2024-01-01'
    },
    {
        name: 'Easter Monday',
        localName: 'Lundi de Pâques',
        date: '2024-04-01'
    }
]


describe("getListOfPublicHolidays", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("successful response of public holidays", async () => {
        const validateInputSpy = jest.spyOn(helpers, "validateInput");
        const shortenPublicHolidaySpy = jest.spyOn(helpers, "shortenPublicHoliday");
        mockedAxios.get.mockResolvedValue({ data: publicHoliday });
        
        const listOfHolidaysResponse = await getListOfPublicHolidays(2024, "FR");

        expect(validateInputSpy).toHaveBeenCalled();
        expect(shortenPublicHolidaySpy).toHaveBeenCalled();
        expect(listOfHolidaysResponse).toEqual(shortenResponse)
    })

    
    it("failed response", async () => {
        const validateInputSpy = jest.spyOn(helpers, "validateInput"); 
        const shortenPublicHolidaySpy = jest.spyOn(helpers, "shortenPublicHoliday");
        
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({ error: "Something went wrong!" }));
        const listOfHolidaysResponse = await getListOfPublicHolidays(2024, "FR");

        expect(validateInputSpy).toHaveBeenCalled();
        expect(shortenPublicHolidaySpy).not.toHaveBeenCalled();
        expect(listOfHolidaysResponse).toEqual([])
    })
})


describe("checkIfTodayIsPublicHoliday", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("successful response of public holidays", async () => {
        const validateInputSpy = jest.spyOn(helpers, "validateInput");
        mockedAxios.get.mockResolvedValue({ data: 204 });
        
        const checkForHolidayResponse = await checkIfTodayIsPublicHoliday("FR");

        expect(validateInputSpy).toHaveBeenCalled();
       
        expect(checkForHolidayResponse).toEqual(false);
    })

    
    it("failed response", async () => {
        const validateInputSpy = jest.spyOn(helpers, "validateInput");
        
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({ error: "Something went wrong!" }));
        const checkForHolidayResponse = await checkIfTodayIsPublicHoliday("FR");

        expect(validateInputSpy).toHaveBeenCalled();
        expect(checkForHolidayResponse).toEqual(false)
    })
})


describe("getNextPublicHolidays", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("successful response of next holidays", async () => {
        const validateInputSpy = jest.spyOn(helpers, "validateInput");
        const shortenPublicHolidaySpy = jest.spyOn(helpers, "shortenPublicHoliday");
        mockedAxios.get.mockResolvedValue({ data: publicHoliday });
        
        const nextHolidaysResponse = await getNextPublicHolidays("FR");

        expect(validateInputSpy).toHaveBeenCalled();
        expect(shortenPublicHolidaySpy).toHaveBeenCalled();
        expect(nextHolidaysResponse).toEqual(shortenResponse)
    })

    
    it("failed response", async () => {
        const validateInputSpy = jest.spyOn(helpers, "validateInput"); 
        const shortenPublicHolidaySpy = jest.spyOn(helpers, "shortenPublicHoliday");
        
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({ error: "Something went wrong!" }));
        const nextHolidaysResponse = await getNextPublicHolidays("FR");

        expect(validateInputSpy).toHaveBeenCalled();
        expect(shortenPublicHolidaySpy).not.toHaveBeenCalled();
        expect(nextHolidaysResponse).toEqual([])
    })
})

