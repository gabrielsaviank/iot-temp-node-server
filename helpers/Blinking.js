import { alleSysIotClient } from "../controllers/connect-and-subscribe-to-iot.js";

export const blink = (arg) => {
    return alleSysIotClient.publish("device/led", `${arg}`);
};
