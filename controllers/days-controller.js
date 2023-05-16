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

export const getDay = async(req, res, next) => {
    const dayId = req.params.id;

    try {
        const selectedDay= await Day.find({ _id: dayId });
        console.log(typeof selectedDay[0].temperatures[0]);
        res.send(selectedDay);
    } catch (error) {
        console.log(error);
    }
};