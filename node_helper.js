const exec = require('child_process').exec;
var NodeHelper = require('node_helper')

module.exports = NodeHelper.create({
    start: function() {
        this.config = {}
    },

    stop: function() {
    },

    socketNotificationReceived: function (notification, payload) {
        const self = this;

        switch (notification) {
            case 'dependencyCheck':
                exec('python3 ./modules/MMM-Plantower/dependencyCheck.py', (error, stdout) => {
                    if (error) {
                        throw "Please install plantower with pip";
                    }
                });
                break;

            case 'retrieveData':
                exec('python3 ./modules/MMM-Plantower/pollData.py ' + payload, (error, stdout) => {
                    if (error) {
                        throw error + "Something went wrong while reading data.";
                    }
            
                    let recievedData = JSON.parse(stdout);
                    self.sendSocketNotification('retrieveDataReturn', recievedData);
                });
                break;
        }
    }
})

