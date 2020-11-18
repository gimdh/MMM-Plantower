# MMM-Plantower
The **`MMM-Plantower`** is a module for [MagicMirror²](https://github.com/MichMich/MagicMirror). It can monitor air quality data from Plantower **PMS3003**, **PMS5003**, and **PMS7003** sensors. 

## Screenshot
![screenshot](https://user-images.githubusercontent.com/36066149/99570329-1df1d580-2a15-11eb-9612-86e87991d651.png)

* Measurements change color as air quality gets worse (Blue -> Green -> Orange -> Red).


## Install

```
cd ~/MagicMirror/modules
git clone https://github.com/gimdh/MMM-Plantower
cd MMM-Plantower
npm install
```

## Configuration

<table width="100%">
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
		<tr>
			<td><code>serialPort</code></td>
			<td>Directory of serial port<br>
				<br><b>Type:</b> <code>string</code>
				<br><b>Example:</b> <code>/dev/ttyS0</code>
				<br><b>No default value is set and must be provided by user</b> 
			</td>
		</tr>
		<tr>
			<td><code>updateInterval</code></td>
			<td>The update interval of air quailty in seconds.<br>
                <br><b>Type:</b> <code>int</code>
				<br><b>Example for 30 seconds:</b> <code>30</code>
				<br><b>Default value:</b> <code>5</code>
                <br><i> Note: Module waits for sensor to send data. Therefore it may not strictly follow the interval. Also, setting it too low is not recommended. </i></br>
			</td>
		</tr>		
		<tr>
			<td><code>titleText</code></td>
			<td>Widget title text<br>
                <br><b>Type:</b> <code>string</code>
				<br><b>Default value:</b> <code>Indoor Dust Measure</code>
			</td>
		</tr>
</table>

## Dependencies
- `python3`
- `plantower` python package (Install via `pip3 install plantower`)

## Test PMSX003 module
1. Navigate to the module folder `./MagicMirror/MMM-Plantower`.
2. Run `python3 pollData.py {connected_serial_port_device}`.
3. Script should print JSON with air quality readings.

## Credit
[MMM-BME280](https://github.com/awitwicki/MMM-BME280) for overall module architecture and design.
