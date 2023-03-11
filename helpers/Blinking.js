import { alleSysIotClient } from "../controllers/IotConnectionController.js";

export const blink = (arg) => {
    return alleSysIotClient.publish('device/led', `${arg}`);
};
