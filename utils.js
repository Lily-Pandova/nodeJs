import * as fs from "fs";

export function writeDataToFile(fileName, content) {
    fs.writeFileSync(fileName, "export let usersData =  " + JSON.stringify(content, null, "\t"), "utf8", (err) => {
        if(err) {
            console.log(err);
        }
    })
}

export function parseRequestBody (req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";

            req.on("data", chunk => {
                body += chunk.toString();
            })

            req.on("end", () => {
                resolve(body)
            })

        } catch (error) {
            reject(err);
        }
    })
}