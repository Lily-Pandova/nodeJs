import * as http from 'http';
import { getUsers, getUserHobbies, createUser, updateUser, deleteUser } from './controllers/userController.js';


const port = 8000;

const server = http.createServer((req, res) => {
    if(req.url === '/api/users' && req.method === 'GET') {
        getUsers(req, res);
    } else if(req.url.match(/\/api\/users\/([\w-]+)\/hobbies/) && req.method === 'GET') {
        const id = req.url.split('/')[3];       
        getUserHobbies(req, res, id);
    }  else if(req.url === '/api/users' && req.method === 'POST') {
        const id = req.url.split('/')[3];       
        createUser(req, res);
    } else if(req.url.match(/\/api\/users\/([\w-]+)\/hobbies/) && req.method === 'PATCH') { 
        const id = req.url.split('/')[3];       
        updateUser(req, res, id);
    } else if(req.url.match(/\/api\/users\/([\w-]+)/) && req.method === 'DELETE') { 
        const id = req.url.split('/')[3];       
        deleteUser(req, res, id);
    }
    else {
        res.writeHead(404, 'Content-Type', 'application/json');
        res.end(JSON.stringify({message: "Route not found!"}));
    }
});

server.listen(port, () => console.log(`Server runs on ${port}`));