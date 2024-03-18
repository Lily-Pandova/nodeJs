import {PUBLIC_HOLIDAYS_API_URL} from "../../config";
import request from 'supertest';


describe("Date Nager", () => {
    it("Get long weekend for a country, should return 200", async() => {

        const { status, body, headers } = await request(PUBLIC_HOLIDAYS_API_URL).get('/LongWeekend/2023/BG');
       
        expect(status).toEqual(200);
        expect(headers['content-type']).toEqual("application/json; charset=utf-8")
        expect(body).toBeDefined();
    })

    it("Get long weekend for a country, should return 404 when the country code is missing", async() => {

        const { status, error } = await request(PUBLIC_HOLIDAYS_API_URL).get('/PublicHolidays/2024');
     
        expect(status).toEqual(404);
        expect(error).toBeDefined();
    })

    it("List of public holidays for a country and a year, status 200", async() => {

        const { status, body, headers } = await request(PUBLIC_HOLIDAYS_API_URL).get('/PublicHolidays/2024/FR');
     
        expect(status).toEqual(200);
        expect(headers['content-type']).toEqual("application/json; charset=utf-8")
        expect(body).toBeDefined();
    })

    it("PublicHolidays, when the country code and the year changed places, status: 400", async() => {

        const {status, error} = await request(PUBLIC_HOLIDAYS_API_URL).get('/PublicHolidays/FR/2024');
     
        expect(status).toEqual(400);
        expect(error).toBeDefined();
    })

})