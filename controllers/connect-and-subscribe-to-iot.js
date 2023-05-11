import mqtt from 'mqtt';
import { blink } from "../helpers/Blinking.js";

// spater tauschen sie diese gegen aus .dotenv
export const alleSysIotClient = mqtt.connect('mqtt://91.121.93.94', {});


export const connectAndSubscribeToIot = async (topic) => {
    alleSysIotClient.on('connect', () => {
        console.log('AlleSys Verbunden mit MQTT!');
        blink(1);
    });

    alleSysIotClient.on('error', (error) => {
        console.log('Es kann keine Verbindung zu AlleSys MQTT hergestellt werden' + error);
    });

    alleSysIotClient.on('offline', () => {
        console.log('AlleSys MQTT offline');
    });

    alleSysIotClient.on('reconnect', () => {
        console.log('AlleSys MQTT stellt die Verbindung wieder her');
    });

    alleSysIotClient.subscribe(topic, (err) => {
        if (err) {
            console.log(`Thema kann nicht abonniert werden ${topic}` + err);
            blink(0);
        } else {
            console.log(`AlleSys - Abonniert zu ${topic}, fange an themen zu lesen...`);
            blink(1);
        }
    });
};
// export const connectToIot = () => {
//     try {
//         alleSysIotClient.on("connect",  () => {
//             return console.log("AlleSys Connected to MQTT");
//         });
//         blink(1);
//     }catch (error) {
//         alleSysIotClient.on("error", () => {
//             console.log("Cannot Connect to AlleSys MQTT" + error)
//         });
//     }
// };
//
// export const subscribeToTemperature = (topic) => {
//     try{
//         alleSysIotClient.subscribe(topic);
//         blink(1);
//         console.log(`AlleSys - Abonniert zu ${topic}, fange an themen zu lesen...`);
//     }catch (error) {
//         console.log(`Thema kann nicht abonniert werden ${topic}` + error);
//         blink(0)
//     }
// };