'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;


Client.fromEnvironment(Transport, function (err, client) {
  if (err) {
    throw err;
  } else {
    client.on('error', function (err) {
      throw err;
    });

    // connect to the Edge instance
    client.open(function (err) {
      if (err) {
        throw err;
      } else {
        console.log('IoT Hub module client initialized');
        startMonitoring(client);
      }
    });
  }
});


// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) {
      console.log(op + ' error: ' + err.toString());
    }
    if (res) {
      console.log(op + ' status: ' + res.constructor.name);
    }
  };
}

function startMonitoring(client) {
  setInterval(async () => {
    const data = await read();
    var msg = new Message(JSON.stringify(data));
    client.sendOutputEvent('temperatureSensorOutput', msg, printResultFor('Sending sensor message'));
  }, 5000);
}

const min = 20.0;
const max = 100.0;
let currentTemp = 30.0;

async function read() {
  if (currentTemp > max)
    currentTemp += Math.random() - 0.5;
  else
    currentTemp += -0.25 + (Math.random() * 1.5);

  return { temperature: parseFloat(currentTemp.toFixed(2)) };
}
