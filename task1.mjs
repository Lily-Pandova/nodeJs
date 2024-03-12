
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
        this.emit("start"); // or "begin"?

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
