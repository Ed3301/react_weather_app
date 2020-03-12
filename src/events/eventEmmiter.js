export const EventEmitter = {
    events: {},
    dispatch: function(event, data) {
        if (!this.events[event]) {
            return;
        }
        this.events[event].forEach(callback => callback(data));
    },
    subscribe: function (event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    },
    unSubscribe: function (event, callback) {
        let index = this.events[event].indexOf(callback);
        this.events[event].splice(index, 1);
    }
};
