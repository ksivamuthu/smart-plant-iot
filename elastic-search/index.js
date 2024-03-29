const env = require('dotenv');
env.config();

const { EventHubClient, EventPosition } = require('@azure/event-hubs');
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    auth: { username: process.env.ELASTIC_USERNAME, password: process.env.ELASTIC_PASSWORD },
    node: process.env.ELASTIC_HOST_URI
});

const printError = (err) => {
    console.error(err.message);
};

const elasticOptions = {
    index: 'plant',
    type: "_doc",
    id: null,
    body: null,
};

// Display the message content - telemetry and properties.
// - Telemetry is sent in the message body
// - The device can add arbitrary application properties to the message
// - IoT Hub adds system properties, such as Device Id, to the message.
const processMessage = async (message) => {

    // creating the indexed document
    const body = {
        recordedAt: (new Date()).toISOString(),
        ...message.body
    }
    elasticOptions.body = body;
    elasticOptions.id = `${body.recordedAt}__${body.id}`;
    let result;
    // index received message to the elastic 
    try {
        result = await client.index(elasticOptions);
    } catch (err) {
        console.log(err);
    }
    console.log(`Status code:  ${result.statusCode}`);
};

// Connect to the partitions on the IoT Hub's Event Hubs-compatible endpoint.
// This example only reads messages sent after this application started.
const ehClient = EventHubClient.createFromConnectionString(process.env.EVENT_HUB_CONNECTION_STRING);
console.log("Successfully created the EventHub Client from iothub connection string.");
ehClient.getPartitionIds().then((ids) => {
    console.log("The partition ids are: ", ids);
    ids.map((id) => {
        ehClient.receive(
            id,
            processMessage,
            printError,
            { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) }
        );
    });
});

