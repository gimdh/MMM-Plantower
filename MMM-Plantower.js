Module.register("MMM-Plantower", {
    // Default module config.
    defaults: {
        updateInterval: 5, // Seconds
        serialPort: "",
        titleText: "Indoor Dust Measure"
    },

    // Define start sequence.
    start: function () {
        console.log("Starting module: " + this.name);

        if (this.config.serialPort === "") {
            throw "This module requires serial port binding. See README.md.";
        }

        this.sendSocketNotification('dependencyCheck');

        this.pm10 = 'Loading... ';
        this.pm25 = 'Loading... ';
        this.pm1 = 'Loading... ';

        this.update();
        setInterval(
            this.update.bind(this),
            this.config.updateInterval * 1000);
    },

    update: function () {
        Log.log('update');
        this.sendSocketNotification('retrieveData', this.config.serialPort);
    },

    getStyles: function () {
        return ['MMM-Plantower.css'];
    },

    // Override dom generator.
    getDom: function () {
        function getDustLevel(measureIndex, measureValue) {
            var result = 0;
    
            switch (measureIndex) {
                case 'PM10':
                    result = getFineDustLevel(measureValue);
                    break;
                case 'PM2.5':
                case 'PM1.0':
                    result = getMicroDustLevel(measureValue);
                    break;
            }
    
            return result;
        };
    
        function getFineDustLevel (measureValue) {
            var level = 0;
    
            if (measureValue > 150)
                level++;
            if (measureValue > 80)
                level++;
            if (measureValue > 30)
                level++;
    
            return level;
        };
    
        function getMicroDustLevel(measureValue) {
            var level = 0;
            
            if (measureValue > 75)
                level++;
            if (measureValue > 35)
                level++;
            if (measureValue > 15)
                level++;
    
            return level;
        };
    
        function getDustLevelColor(dustLevel) {
            var color = '#00BFFF';
    
            switch (dustLevel) {
                case 0:
                    color = '#00BFFF';
                    break;
                case 1:
                    color = '#32CD32';
                    break;
                case 2:
                    color = '#FF4500';
                    break;
                case 3:
                    color = '#FF0000';
                    break;
            }
    
            return color;
        };

        var wrapper = document.createElement("div");

        var header = document.createElement("div");
        var label = document.createTextNode(this.config.titleText);
        header.className = 'plantower-header';
        header.appendChild(label)
        wrapper.appendChild(header);

        var table = document.createElement("table");
        var tbdy = document.createElement('tbody');

        for (var i = 0; i < 3; i++) {
            var measureValue = "";
            var measureIndex = "";

            switch (i) {
                case 0:
                    measureValue = this.pm10;
                    measureIndex = "PM10";
                    break;
                case 1:
                    measureValue = this.pm25;
                    measureIndex = "PM2.5";
                    break;
                case 2:
                    measureValue = this.pm1;
                    measureIndex = "PM1.0";
                    break;
            }

            var tr = document.createElement('tr');

            

            var text_div = document.createElement("div");
            var text = document.createTextNode(measureIndex + ": ");
            text_div.className = 'plantower-text';
            text_div.appendChild(text);

            var reading_a = document.createElement("a");
            var reading = document.createTextNode(measureValue + "μg/m³");
            reading_a.className = 'plantower-reading';
            reading_a.appendChild(reading);

            let dustLevel = getDustLevel(measureIndex, measureValue);
            reading_a.style.color = getDustLevelColor(dustLevel);

            text_div.appendChild(reading_a);

            var td = document.createElement('td');
            td.appendChild(text_div);
            tr.appendChild(td);

            tbdy.appendChild(tr);
        }
        table.appendChild(tbdy);
        wrapper.appendChild(table);

        return wrapper;
    },

    socketNotificationReceived: function (notification, payload) {
        switch (notification) {
            case 'retrieveDataReturn':
                let recievedData = payload;

                this.pm10 = recievedData['pm100_std'];
                this.pm25 = recievedData['pm25_std'];
                this.pm1 = recievedData['pm10_std']; 

                this.updateDom();

                break;
        }
    }
});
