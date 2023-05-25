import { blink } from "../helpers/Blinking.js";

import { alleSysIotClient } from "./connect-and-subscribe-to-iot.js";
import { createMeasure } from "./temperatures-controller.js";

export const readWriteIotTemperature = () => {
    try{
        setTimeout(() => {
            alleSysIotClient.on("message", async(
                topic,
                message,
                packet
            ) => {
                const payload = String.fromCharCode.apply(null, packet.payload);

                await createMeasure(payload);
            });
        }, 5000);
    } catch (error) {
        console.log(`Thema kann nicht abonniert werden ${topic}` + error);
        blink(0);
    }
};
