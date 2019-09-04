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
  client.onMethod('watering', async (req, res) => {
    await res.send(201);
    await water(req.payload);
  });

  setInterval(async () => {
    const data = await read();
    var msg = new Message(JSON.stringify(data));
    client.sendOutputEvent('output', msg, printResultFor('Sending sensor message'));
  }, 5000);
}

let min = 0.0; let max = 100.0;
let currentMoisture = 100.0;
let watering = false;
let waterlevel = 0.0;

async function read() {

  if (watering === false) {
    currentMoisture += -5.0 + (Math.random() * 1.5);
  }

  if (currentMoisture <= min) {
    currentMoisture = 0.0;
  }

  return {
    waterlevel: watering ? randomInt(20, 50) : 0.0,
    watering: watering,
    moisture: currentMoisture
  };
}

async function water(level) {

  watering = true;

  if (level >= max) level = max;

  while (currentMoisture <= level) {
    currentMoisture += 1.5;
    await delay(300);
  }

  if (currentMoisture >= max) currentMoisture = max;

  watering = false;

  return {
    moisture: currentMoisture
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomInt(min, max) {
  return parseFloat((Math.random() * (max - min + 1) + min).toFixed(2));
}