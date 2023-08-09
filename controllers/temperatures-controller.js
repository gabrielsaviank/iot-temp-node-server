import mongoose from "mongoose";
import dayjs from "dayjs";

import { Temperature } from "../models/Temperature.js";
import { Day } from "../models/Day.js";

// This is for testing purposes
export const createMeasure = async (measure) => {
  const tempToRegister = new Temperature({
    measure,
  });

  let currentDay;

  try {
    currentDay = await Day.findOne({}, {}, { sort: { "created" : -1 } });

   if(currentDay === null) {
     currentDay = new Day({});
     await currentDay.save();
   }

    if (dayjs(currentDay.created).startOf("day") < dayjs(tempToRegister.time).startOf("day")) {
      currentDay = new Day({});

      await currentDay.save();
    }

    const session = await mongoose.startSession();
    await session.startTransaction();

    await tempToRegister.save({ session: session });
    currentDay.temperatures.push(tempToRegister);

    await currentDay.save({ session: session });
    await session.commitTransaction();
  } catch (error) {
    return console.log(error);
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