const dotenv = require('dotenv');
dotenv.config();

import { Sensors } from './sensors/sensors';
import { Mqtt as Protocol } from 'azure-iot-device-mqtt';
import { Client, Message } from 'azure-iot-device';
import { listen, send } from './server';

const connectionString = process.env.DEVICE_CONNECTION_STRING;
const client = Client.fromConnectionString(connectionString, Protocol);
const sensors = new Sensors();

async function initialize(): Promise<void> {
    try {
        await client.open();
        listen();

        client.onDeviceMethod('watering', async (req, res) => {
            sensors.emit('watering', req.payload);
            await res.send(201);
        });

        sensors.on('SensorsDataReceived', async (data) => {
            // await client.sendEvent(new Message(JSON.stringify(data)));
            send(data);
        });
        sensors.startMonitoring();
    } catch (err) {
        console.error(err);
        process.exit(-1);
    }
}

initialize();
