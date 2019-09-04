import { HumiditySensor } from './humidity';
import { LuminositySensor } from './luminosity';
import { SoilMoistureSensor } from './soilmoisture';
import { TemperatureSensor } from './temperature';
import { WindSensor } from './wind';
import { EventEmitter } from 'events';
import { PressureSensor } from './pressure';

export class Sensors extends EventEmitter {
    private windSensor: WindSensor = new WindSensor();
    private temperatureSensor: TemperatureSensor = new TemperatureSensor();
    private soilMoistureSensor: SoilMoistureSensor = new SoilMoistureSensor();
    private luminositySensor: LuminositySensor = new LuminositySensor();
    private humiditySensor: HumiditySensor = new HumiditySensor();
    private pressureSensor: PressureSensor = new PressureSensor();

    constructor() {
        super();
        this.on('watering', (data) => {
            this.soilMoistureSensor.water(data);
        });
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
        const pressure = await this.pressureSensor.read();
        const deviceId = process.env.DEVICE_ID;
        const data = {
            deviceId, ...wind, ...temperature, ...soil, ...luminosity, ...humidity, ...pressure
        };

        this.emit('SensorsDataReceived', data);
    }
}