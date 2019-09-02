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
    client.sendOutputEvent('output', msg, printResultFor('Sending sensor message'));
  }, 5000);
}

const min = 0, max = 880;
let currentMoisture = 400;

async function read() {
  if (currentMoisture > max)
    currentMoisture += Math.random() - 50;
  else
    currentMoisture += -50 + (Math.random() * 50);

  return {
    moisture: currentMoisture
  };
}

function randomInt(min, max) {
  return Math.random() * (max - min + 1) + min;
}