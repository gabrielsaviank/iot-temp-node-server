import { blink } from "../helpers/Blinking.js";

import { alleSysIotClient } from "./connect-and-subscribe-to-iot.js";
import { createMeasure } from "./temperatures-controller.js";

export const readWriteIotTemperature = () => {
    try {
        alleSysIotClient.on("message", async(
            topic,
            message,
            packet
        ) => {
            const payload = String.fromCharCode.apply(null, packet.payload);

            console.log(payload);

            await createMeasure(payload);
        });
    } catch (error) {
        console.log(`Thema kann nicht abonniert werden ${topic}` + error);
        blink(0);
    }
};
