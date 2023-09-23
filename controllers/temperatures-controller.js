import mongoose, { mongo } from "mongoose";
import dayjs from "dayjs";

import { Temperature } from "../models/Temperature.js";
import { Day } from "../models/Day.js";

export const createMeasure = async (measure) => {
    let mostRecentDate;

    const session = await mongoose.startSession();
    await session.startTransaction();

    try {
        mostRecentDate = await Day.findOne({}, {}, { sort: { "created" : -1 } });
        const convertMostRecentDate = dayjs(mostRecentDate.created, "DD-MM-YYYY");
        const currentDay = dayjs().format("DD-MM-YYYY");

        if(!mostRecentDate || convertMostRecentDate.isAfter(currentDay, "day")){
            mostRecentDate = new Day({});
            await mostRecentDate.save();
        }

        const tempToRegister = new Temperature({
            measure: measure,
            day: mostRecentDate._id,
        });

        await tempToRegister.save({ session });

        mostRecentDate.temperatures.push(tempToRegister);

        await mostRecentDate.save({ session });
        await session.commitTransaction();
    } catch (exception) {
        await session.abortTransaction();
        return console.log(exception);
    } finally {
        await session.endSession();
    }
};

export const getMeasures = async(req, res) => {
    try{
        const measuresData = await Temperature.find();
        res.send(measuresData);
    }catch (error) {
        console.log(error);
    }
};

// ACHTUNG! This is for the machine learning. Don't touch
export const getLastDayTemps = async() => {
    try {
        const temperatures = await Temperature.find();
        // const temperatures = await Temperature.find().sort({ createdAt: -1 }).limit(10);
        return temperatures.map(temperature => parseFloat(temperature.measure));
    } catch (error) {
        console.log(error);
    }
};

export const fetchLastDayTemps = async(req, res) => {
    const dayId = req.params.id;

    try {
        const dailyMeasures = await Temperature.find({ day: dayId });

        res.send(dailyMeasures);
    } catch (error) {
        console.log(error);
    }
};
