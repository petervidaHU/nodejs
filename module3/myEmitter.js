import { EventEmitter } from "events";

class mEventEmitter {
    constructor() {
        this.eventEmitter = new EventEmitter();
        this.listeners = {};  // key-value pair
    }

    eventNameCheck(eventName) {
        if (!eventName) {
            throw new Error('event name missing');
        }
    }

    addListener(eventName, fn) {
        this.eventNameCheck(eventName)
        this.eventEmitter.on(eventName, fn);
    }

    on(eventName, fn) {
        this.eventNameCheck(eventName)
        this.eventEmitter.on(eventName, fn);
    }

    removeListener(eventName, fn) {
        this.eventNameCheck(eventName)
        this.eventEmitter.removeListener(eventName, fn);
    }

    off(eventName, fn) {
        this.eventNameCheck(eventName)
        this.eventEmitter.removeListener(eventName, fn);
    }

    once(eventName, fn) {
        this.eventNameCheck(eventName)
        this.eventEmitter.once(eventName, fn);
    }

    emit(eventName, ...args) {
        this.eventNameCheck(eventName)
        this.eventEmitter.emit(eventName, args);
    }

    listenerCount(eventName) {
        this.eventNameCheck(eventName)
        return this.eventEmitter.listenerCount(eventName)
    }

    rawListeners(eventName) {
        this.eventNameCheck(eventName)
        return this.eventEmitter.rawListeners(eventName)
    }
}

export default mEventEmitter;
