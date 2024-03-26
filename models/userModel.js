
import {usersData} from "../data/usersData.js";
import { v4 as uuid } from 'uuid';
import {writeDataToFile} from "../utils.js";

export function findAllUsers() {
    return new Promise((resolve, reject) => {
        resolve(usersData);
    });
};

export function findUserById(id) {
    return new Promise((resolve, reject) => {
        const user = usersData.find(data => data.user.id === id);
        resolve(user);
    });
};

export function create(userData) {
    return new Promise((resolve, reject) => {
        const id =  uuid();

        const newUser = {
            user: {
                id,
                ...userData.user
            },
            links: {
                self: `/api/users/${id}`,
                hobbies: `/api/users/${id}/hobbies`
            }    
        };
     
        usersData.push(newUser);
        writeDataToFile("./data/usersData.js", usersData);
        resolve(newUser)
    })
}

export function update(id, userData) {
    return new Promise((resolve, reject) => {
        const index = usersData.findIndex(data => data.user.id === id);
        usersData[index] = {...userData};
        writeDataToFile("./data/usersData.js", usersData);
        resolve(usersData[index])
    })
}

export function removeUser(id) {
    return new Promise((resolve, reject) => {
        const filteredList = usersData.filter(data => data.user.id !== id);
        writeDataToFile("./data/usersData.js", filteredList);
        resolve();
    })
}