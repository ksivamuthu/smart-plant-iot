import { HumiditySensor } from './humidity';
import { LuminositySensor } from './luminosity';
import { SoilMoistureSensor } from './soilmoisture';
import { TemperatureSensor } from './temperature';
import { WindSensor } from './wind';
import { Client, Message } from 'azure-iot-device';

export class Sensors {
    private windSensor: WindSensor = new WindSensor();
    private temperatureSensor: TemperatureSensor = new TemperatureSensor();
    private soilMoistureSensor: SoilMoistureSensor = new SoilMoistureSensor();
    private luminositySensor: LuminositySensor = new LuminositySensor();
    private humiditySensor: HumiditySensor = new HumiditySensor();

    constructor(private readonly client: Client) {

    }

    startMonitoring() {
        setInterval(async () => await this.readSensorsData(), 2000);
    }

    async readSensorsData() {
        const wind = await this.windSensor.read();
        const temperature = await this.temperatureSensor.read();
        const soil = await this.soilMoistureSensor.read();
        const luminosity = await this.luminositySensor.read();
        const humidity = await this.humiditySensor.read();
        const deviceId = process.env.DEVICE_ID;
        const data = {
            deviceId, ...wind, ...temperature, ...soil, ...luminosity, ...humidity
        };
        await this.client.sendEvent(new Message(JSON.stringify(data)));
    }
}