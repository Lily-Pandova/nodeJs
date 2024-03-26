import { findAllUsers, findUserById, create, update, removeUser } from "../models/userModel.js";
import { parseRequestBody } from "../utils.js";


export async function getUsers(req, res) {
    try { 
        res.writeHead(200, {'Content-Type': 'application/json', 'Cache-Control': 'private, max-age=3600'});
        const users = await findAllUsers(); 
        res.end(JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
}

export async function getUserHobbies(req, res, id) {
    try {  
        const user = await findUserById(id);

        if(!user) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: "User not found!"}));
        }

        res.writeHead(200, {'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600'});
        let arr = [];
        const uniqueHobbie = new Set([...arr, user.links.hobbies]);
   
        const userHobbies = {
            hobbies: [...uniqueHobbie]
        };
        
        return res.end(JSON.stringify(userHobbies));
    } catch (error) {
        console.log(error);
    }
}

export async function createUser(req, res) {
    try { 
        const body = await parseRequestBody(req);
        const responseData = JSON.parse(body); 

        const createUser = {
            "user": {
                "name": responseData.name,
                "email": responseData.email
            }
        };

        res.writeHead(201, {'Content-Type': 'application/json'});
        const newUser = await create(createUser);
        return res.end(JSON.stringify(newUser));
      
    } catch (error) {
        console.log(error);
    }
}


export async function updateUser(req, res, id) {
    try { 
        const userFound = await findUserById(id);
        const arr = [];
        
        if(!userFound) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: "User not found!"}));
        }
    
        const body = await parseRequestBody(req);
        const responseData = JSON.parse(body);
        const hobieLinks = [...arr, userFound.links.hobbies]
        const uniqueArr = new Set([...hobieLinks, ...responseData.hobbies]);
      
        const userWithNewHobbies = {
            ...userFound, 
            links: {
                ...userFound.links,
                hobbies: [...uniqueArr]
            }
        };
        
        res.writeHead(200, {'Content-Type': 'application/json'});
        const updatedUser = await update(id, userWithNewHobbies);
        return res.end(JSON.stringify(updatedUser));
      
    } catch (error) {
        console.log(error);
    }
}


export async function deleteUser(req, res, id) {
    try {  
        const user = await findUserById(id);

        if(!user) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: "User not found!"}));
        } 

        res.writeHead(200, {'Content-Type': 'application/json'});
        await removeUser(id);
        return res.end(JSON.stringify({message: `User has been removed!`}));
       
    } catch (error) {
        console.log(error);
    }
}