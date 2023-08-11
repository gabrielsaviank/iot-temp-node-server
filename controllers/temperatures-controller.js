import mongoose from "mongoose";
import dayjs from "dayjs";

import { Temperature } from "../models/Temperature.js";
import { Day } from "../models/Day.js";


export const createMeasure = async (measure) => {
    const tempToRegister = new Temperature({
        measure,
    });

    let currentDay;

    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        currentDay = await Day.findOne({}, {}, { sort: { "created" : -1 } });

        const currentDate = dayjs();

        if (currentDay === null || currentDate.isAfter(currentDay.created, "day")) {
            currentDay = new Day({});
            await currentDay.save();
        }

        await tempToRegister.save({ session });

        currentDay.temperatures.push(tempToRegister);

        await currentDay.save({ session });
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        return console.log(error);
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

export const getLastDayTemps = async() => {
    try {
        const temperatures = await Temperature.find();
        // const temperatures = await Temperature.find().sort({ createdAt: -1 }).limit(10);
        return temperatures.map(temperature => parseFloat(temperature.measure));
    } catch (error) {
        console.log(error);
    }
};