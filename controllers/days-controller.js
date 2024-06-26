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

export const getDays = async (req, res) => {
    try {
        const data = await Day.find();

        res.send(data);
    } catch (error){
        console.log(error);
    }
};

export const getDay = async(req, res) => {
    const dayId = req.params.id;

    try {
        const selectedDay= await Day.find({ _id: dayId });

        res.send(selectedDay);
    } catch (error) {
        console.log(error);
    }
};

export const getCurrentDay = async(req, res) => {
    try {
        const currentDay = await Day.findOne().sort({ _id: -1 });

        res.send(currentDay);
    } catch (error){
        console.log(error);
    }
};
