import mongoose, { mongo } from "mongoose";
import dayjs from "dayjs";

import { Temperature } from "../models/Temperature.js";
import { Day } from "../models/Day.js";


export const createMeasure = async (measure) => {
    let lastDateRecord;

    const session = await mongoose.startSession();
    await session.startTransaction();

    try {
        lastDateRecord = await Day.findOne({}, {}, { sort: { "created" : -1 } });
        const actualDate = await dayjs();

        if(!lastDateRecord){
            let createNewDay = new Day({});

            let tempToRegister = new Temperature({
                measure: measure,
                day: createNewDay._id
            });

            await tempToRegister.save({ session });

            createNewDay.temperatures.push(tempToRegister);
            await createNewDay.save({ session });
            await session.commitTransaction();

        } else if(actualDate.isAfter(lastDateRecord, "day")) {
            let createNewDay = new Day({});

            let tempToRegister = new Temperature({
                measure: measure,
                day: createNewDay._id
            });

            await tempToRegister.save({ session });

            createNewDay.temperatures.push(tempToRegister);
            await createNewDay.save({ session });
            await session.commitTransaction();
        } else {
            let tempToRegister = new Temperature({
                measure: measure,
                day: lastDateRecord._id
            });

            await tempToRegister.save({ session });
            lastDateRecord.temperatures.push(tempToRegister);

            await lastDateRecord.save({ session });
            await session.commitTransaction();
        }

        // mostRecentDate = await Day.findOne({}, {}, { sort: { "created" : -1 } });
        //
        // const mostRecentDay = mostRecentDate && mostRecentDate.created ? dayjs(mostRecentDate.created) : dayjs();
        //
        // const currentDay = dayjs();


        //
        // if (!mostRecentDate) {
        //     mostRecentDate = new Day({});
        //     await mostRecentDate.save();
        // } else if (currentDay.isAfter(mostRecentDay, "day")) {
        //     mostRecentDate = new Day({});
        //     await mostRecentDate.save();
        // }
        //
        // const tempToRegister = new Temperature({
        //     measure: measure,
        //     day: mostRecentDate._id,
        // });
        //
        // await tempToRegister.save({ session });
        //
        // mostRecentDate.temperatures.push(tempToRegister);
        //
        // await mostRecentDate.save({ session });
        // await session.commitTransaction();
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

// THIS CONTROLLER IS FOR TESTING;
export const createManuallyMeasures = async(req, res) => {
    const { measure } = req.body;

    let lastDateRecord;

    const session = await mongoose.startSession();
    await session.startTransaction();

    try {
        lastDateRecord = await Day.findOne({}, {}, { sort: { "created" : -1 } });
        const actualDate = await dayjs();

        if(!lastDateRecord){
            let createNewDay = new Day({});

            let tempToRegister = new Temperature({
                measure: measure,
                day: createNewDay._id
            });

            await tempToRegister.save({ session });

            createNewDay.temperatures.push(tempToRegister);
            await createNewDay.save({ session });
            await session.commitTransaction();

        } else if(actualDate.isAfter(lastDateRecord, "day")) {
            let createNewDay = new Day({});

            let tempToRegister = new Temperature({
                measure: measure,
                day: createNewDay._id
            });

            await tempToRegister.save({ session });

            createNewDay.temperatures.push(tempToRegister);
            await createNewDay.save({ session });
            await session.commitTransaction();
        } else {
            let tempToRegister = new Temperature({
                measure: measure,
                day: lastDateRecord._id
            });

            await tempToRegister.save({ session });
            lastDateRecord.temperatures.push(tempToRegister);

            await lastDateRecord.save({ session });
            await session.commitTransaction();
        }
    } catch (exception) {
        await session.abortTransaction();
        return console.log(exception);
    } finally {
        res.send(measure);
        await session.endSession();
    }
};
