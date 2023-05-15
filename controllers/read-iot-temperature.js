import { blink } from "../helpers/Blinking.js";

import { alleSysIotClient } from "./connect-and-subscribe-to-iot.js";
import { Temperature } from "../models/Temperature.js";

// später wird daraus ein Array mit mehreren Objekten, jedes Objekt ist ein Sensor
// [{sensor1}, {sensor2}]
export const readIotTemperature = () => {
    try{
        setTimeout(() => {
            alleSysIotClient.on("message", async(topic, message, packet) => {
                const payload = String.fromCharCode.apply(null, packet.payload);
                // here we must find a way to get the day ID,
                // and then post the measure using the day
                console.log(payload);

                // CHANGE ME, This will be a job that will run daily;
                // try {
                //     const temperature = new Temperature({
                //         temperature: payload
                //     });
                //     await temperature.save();
                // } catch (error) {
                //     console.log(`Error ${error}`);
                // }
            });
        }, 5000);
    }catch (error) {
        console.log(`Thema kann nicht abonniert werden ${topic}` + error);
        blink(0);
    }
};
