import mqtt from "mqtt";
import { blink } from "../helpers/Blinking.js";

export const alleSysIotClient = mqtt.connect("mqtt://91.121.93.94", {});

export const connectAndSubscribeToIot = async (topic) => {
    alleSysIotClient.on("connect", () => {
        console.log("AlleSys Connected to the MQTT!");
        blink(1);
    });

    alleSysIotClient.on("error", (error) => {
        console.log("Es kann keine Verbindung zu AlleSys MQTT hergestellt werden" + error);
    });

    alleSysIotClient.on("offline", () => {
        console.log("AlleSys MQTT offline");
    });

    alleSysIotClient.on("reconnect", () => {
        console.log("AlleSys MQTT disconnected, reconnecting...");
    });

    alleSysIotClient.subscribe(topic, (err) => {
        if (err) {
            console.log(`AlleSys Couldn't subscribe to the topic:  ${topic}` + err);
            blink(0);
        } else {
            console.log(`AlleSys - Subscribed to the topic ${topic}...`);
            blink(1);
        }
    });
};
