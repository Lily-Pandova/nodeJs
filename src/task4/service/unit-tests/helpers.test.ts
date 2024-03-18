import {validateInput} from "../../helpers";

describe("validateInput", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("successful validation", () => {
        const validate = validateInput( { year: 2024, country: 'FR' });
        expect(validate).toEqual(true);
    })
    
    it("failed validation: country is not supported", async () => {
        await expect(() => validateInput( { year: 2024, country: "BG" })).toThrow(new Error("Country provided is not supported, received: BG"));
    })

    it("failed validation: it's not a current year", async () => {
        await expect(() => validateInput( { year: 1956 })).toThrow(new Error("Year provided not the current, received: 1956"));
    })
})
