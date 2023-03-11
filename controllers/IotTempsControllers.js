import mqtt from 'mqtt';
import { blink } from "../helpers/Blinking.js";

import { alleSysIotClient } from "./IotConnectionController.js";

// später wird daraus ein Array mit mehreren Objekten, jedes Objekt ist ein Sensor
// [{sensor1}, {sensor2}]
export const subscribeToTemperature = (topic) => {
    try{
        alleSysIotClient.subscribe(topic);
        blink(1)
    }catch (error) {
        console.log(`Thema kann nicht abonniert werden ${topic}` + error);
        blink(0)
    }
};

export const readTemperatures = () => {
    alleSysIotClient.on('device/temp', (topic, message, packet) => {
        return console.log("here")
    });
}