import { Temperature } from "../models/Temperature.js";

// This is for testing purposes
export const createMeasure = async (req, res, next) => {
  const { measure } = req.body;

  try {
    const temperature = new Temperature({
      measure
    });

    await temperature.save();
    res.send(temperature);
    next();
  } catch (error) {
    return console.log(error);
  }
};