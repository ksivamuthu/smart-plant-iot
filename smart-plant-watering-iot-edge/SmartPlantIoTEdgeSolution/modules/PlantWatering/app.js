'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;
var ConnectionString = require('azure-iot-common').ConnectionString;

const connectionString = process.env.EdgeHubConnectionString || process.env.IotHubConnectionString;
const env = ConnectionString.parse(connectionString);

Client.fromEnvironment(Transport, function (err, client) {
  if (err) {
    throw err;
  } else {
    client.on('error', function (err) {
      throw err;
    });

    // connect to the Edge instance
    client.open((err) => {
      if (err) {
        throw err;
      } else {
        console.log('IoT Hub module client initialized');


        // Act on input messages to the module.
        client.on('inputMessage', function (inputName, msg) {
          pipeMessage(client, inputName, msg);
        });
      }
    });
  }
});

/**
 * @param {Client} client - Module Client
 */
async function pipeMessage(client, inputName, msg) {
  client.complete(msg, printResultFor('Receiving message'));

  if (inputName === 'sensorsInput') {
    var message = JSON.parse(msg.getBytes().toString('utf8'));
    if (message) {
      console.log(message);

      var twin = await client.getTwin();

      console.log(env.DeviceId);
      console.log(message.moisture <= parseFloat(twin.properties.desired["moistureThreshold"]));

      if (message.moisture <= parseFloat(twin.properties.desired["moistureThreshold"])) {
        await client.invokeMethod(env.DeviceId, 'SoilMoistureSensor', { methodName: 'watering', payload: 100 });
      }
    }
  }
}

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
