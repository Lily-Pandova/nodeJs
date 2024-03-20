
import * as https from 'https';

class MyEventEmitter {
    listeners = {}; 

    addListener(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn);

        return this;
    }
      
    on(eventName, fn) {
        return this.addListener(eventName, fn)
    }
   
    removeListener(eventName, fn) {
        const funcs =  this.listeners[eventName] || [];

        if(!funcs){
            return;
        }
       
        const filteredList = funcs.filter(listener =>  listener !== fn);
        return this.listeners[eventName] = filteredList;
    }
      
    off(eventName, fn) {
        return this.removeListener(eventName, fn);
    }
   
     once(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        const wrapper = () => {
            fn();
            this.off(eventName, wrapper);
        }

        this.listeners[eventName].push(wrapper);
        return this;
    }
   
    emit(eventName, ...args) {
        let funcs = this.listeners[eventName];

        if(!funcs){
            return;
        }
        return funcs.map(func => func(...args));
    }
   
    listenerCount(eventName) {
        const listeners = this.listeners[eventName];
        return listeners.length;
    }
   
    rawListeners(eventName) {
        return this.listeners[eventName];
    }
}

class WithTime extends MyEventEmitter {
    execute(asyncFunc, ...args) {
        const startTime = new Date();
        this.emit("begin"); // or "start"?

        const cbFunc = (response) => {
            let data = {};

            response.on("data", chunk => {
                data += chunk;
            })

            response.on("end", () => {
                const endTime = new Date();
                this.emit("end");

                console.log("response: ", JSON.parse(JSON.stringify(data)));

                this.emit("data");
            
                const timeToExecute = endTime - startTime;
                console.log("timeToExecute: ", timeToExecute);
            })

            response.on("error", error => console.log("Error: ", error))
        
        }
        
        asyncFunc(...args, cbFunc);
    }
 }
 
const fetchFromUrl = (url, cb) => {
    const options = {json: true};
   
    https.get(url, options, cb);
}


// Task 1

const myEmitter = new MyEventEmitter();

function c1() {
    console.log('an event occurred!');
}

function c2() {
    console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));

// Task 2
const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));