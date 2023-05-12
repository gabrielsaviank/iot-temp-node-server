import { Day } from "../models/Day.js";

// This is for testing purposes
export const createDay = async(req, res, next) => {
    const { created } = req.body;

    try {
        const day = new Day({
            created
        });

        await day.save();
        res.send(day);
        next();
    } catch (error) {
        return console.log(error);
    }
};