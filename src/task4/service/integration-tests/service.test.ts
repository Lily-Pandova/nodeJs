import {getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays} from "../public-holidays.service";


describe("Integration tests: getListOfPublicHolidays", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should get list of public holidays", async() => {
        const listOfHolidays = await getListOfPublicHolidays(2024, "NL");
        await expect(listOfHolidays).not.toEqual(undefined);
    })

    it("should throw an error", async() => {
       await expect(() => getListOfPublicHolidays( 2024,"BG" )).rejects.toThrow(new Error("Country provided is not supported, received: BG"));
    })
})

describe("Integration tests: checkIfTodayIsPublicHoliday", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("call the endpoint after successfull validation", async() => {
        const isTodayHoliday = await checkIfTodayIsPublicHoliday("FR");
        await expect(isTodayHoliday).not.toEqual(undefined); 
    })

    it("should throw an error", async() => {
       await expect(() => checkIfTodayIsPublicHoliday("BG")).rejects.toThrow(new Error("Country provided is not supported, received: BG"));
    })
})

describe("Integration tests: getNextPublicHolidays", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("call the endpoint after successfull validation", async() => {
        const nextHoliday = await getNextPublicHolidays("FR");
        expect(nextHoliday).not.toEqual(undefined); 
    })

    it("should throw an error", async() => {
       await expect(() => checkIfTodayIsPublicHoliday("BG")).rejects.toThrow(new Error("Country provided is not supported, received: BG"));
    })
})