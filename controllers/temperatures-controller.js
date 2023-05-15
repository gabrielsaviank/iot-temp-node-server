import mongoose from "mongoose";
import { Temperature } from "../models/Temperature.js";
import { Day } from "../models/Day.js";

// This is for testing purposes
export const createMeasure = async (req, res, next) => {
  const { measure, day } = req.body;

  const TempToRegister = new Temperature({
    measure,
    day
  });

  let currentDay;

  try {
    currentDay = await Day.findById(day);

    const session = await mongoose.startSession();
    await session.startTransaction();

    await TempToRegister.save({ session: session });
    currentDay.temperatures.push(TempToRegister);

    await currentDay.save({ session: session });
    await session.commitTransaction();

    res.send(TempToRegister);
    next();
  } catch (error) {
    return console.log(error);
  }
};