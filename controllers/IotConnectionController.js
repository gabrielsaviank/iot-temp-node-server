import mqtt from 'mqtt';
import { blink } from "../helpers/Blinking.js";

// later swap this to .dotenv
export const alleSysIotClient = mqtt.connect('mqtt://91.121.93.94', {});

export const connectToIot = () => {
    try {
        alleSysIotClient.on("connect",  () => {
            return console.log("AlleSys Connected to MQTT");
        });
        blink(1);
    }catch (error) {
        alleSysIotClient.on("error", () => {
            console.log("Cannot Connect to AlleSys MQTT" + error)
        });
    }
};
