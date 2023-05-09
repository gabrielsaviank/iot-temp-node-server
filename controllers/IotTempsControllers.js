import mqtt from 'mqtt';
import { blink } from "../helpers/Blinking.js";

import { alleSysIotClient } from "./IotConnectionController.js";

// später wird daraus ein Array mit mehreren Objekten, jedes Objekt ist ein Sensor
// [{sensor1}, {sensor2}]
export const subscribeToTemperature = (topic) => {
    try{
        alleSysIotClient.subscribe(topic);
        blink(1)
        alleSysIotClient.on('message', (topic, message, packet) => {
            const payload = String.fromCharCode.apply(null, packet.payload);
            console.log(payload)
        })
    }catch (error) {
        console.log(`Thema kann nicht abonniert werden ${topic}` + error);
        blink(0)
    }
};