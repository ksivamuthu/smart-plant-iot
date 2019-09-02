const dotenv = require('dotenv');
dotenv.config();

import { Sensors } from './sensors/sensors';
import { Mqtt as Protocol } from 'azure-iot-device-mqtt';
import { Client } from 'azure-iot-device';

const connectionString = process.env.DEVICE_CONNECTION_STRING;
const client = Client.fromConnectionString(connectionString, Protocol);

async function initialize(): Promise<void> {
    try {
        await client.open();
        const sensors = new Sensors(client);
        sensors.startMonitoring();
    } catch (err) {
        console.error(err);
        process.exit(-1);
    }
}

initialize();
