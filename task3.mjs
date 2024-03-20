
import csv from "csvtojson";
import {appendFile } from "node:fs";

const csvFilePath = "csv/books.csv";

const writeToTextFile = data => {
    appendFile("books.txt", data + "\n", (err) => {
        if (err) throw err;
      });
}

csv().fromFile(csvFilePath)
.then( jsonObj => {
    let formattedData = {};

    jsonObj.forEach(item => {
        formattedData = {
            "book": item.Book,
            "author": item.Author,
            "price": item.Price
        };
        return writeToTextFile(JSON.stringify(formattedData));
    })
})
.catch(err => console.log("Error: ", err))
